<script lang="ts">
  import { onMount, tick } from 'svelte';
  import throttle from 'lodash.throttle';
  import StatusBar from '@/components/StatusBar.svelte';
  import Quill from 'quill';
  import { position as getCaretPosition } from 'caret-pos';
  import { Notpad } from '@/helpers/notpad';
  import { settings } from '@/store/store';
  import 'quill/dist/quill.core.css';
  import './Editor.css';
  import type { EditorType } from '@/types/EditorTypes';

  export let editor: EditorType;

  let editorContainer: HTMLDivElement;
  let quill: Quill;
  let fakeCaret: HTMLDivElement | null = null;
  let caretPosition = { top: 10, left: 8, height: 24 };
  let lineNo = 0;
  let caretLineNo = 1;
  let caretColumnNo = 1;
  let characterCount = 0;
  /**
   * Flag to track if update is already scheduled
   */
  let updateScheduled = false;

  async function setupQuill() {
    quill = new Quill(editorContainer!, {
      formats: [
        'bold',
        'code',
        'italic',
        'link',
        'size',
        'strike',
        'script',
        'underline',
        'blockquote',
        'header',
        'indent',
        'list',
        'align',
        'direction',
        'code-block',
        'formula'
        // 'background',
        // 'font',
        // 'image',
        // 'video'
      ]
    });

    await Notpad.editors.setQuill(editor.id, quill);
    quill.setContents(Notpad.editors.getContent(editor.id)!);
  }

  /**
   * Update line and column numbers.
   */
  function updateEditorData() {
    const selection = quill.getSelection();
    if (selection) {
      lineNo = quill.getText().split('\n').length - 1; // quill.getLength() includes a trailing newline character
      const text = quill.getText(0, selection.index + selection.length);
      const lines = text.split('\n');
      caretLineNo = lines.length;
      caretColumnNo = lines[lines.length - 1].length + 1;
      characterCount = quill.getLength() - 1; // quill.getLength() includes a trailing newline character
    }
  }

  // Using requestAnimationFrame for smooth updates
  const updateCaretPosition = throttle(() => {
    console.count('Update caret');
    if (!updateScheduled) {
      updateScheduled = true;
      requestAnimationFrame(async () => {
        if (editorContainer) {
          try {
            const caret = getCaretPosition(quill.root);

            // Adjust for the scroll position
            caretPosition = {
              top: caret.top - editorContainer.scrollTop,
              left: caret.left - editorContainer.scrollLeft,
              height: caret.height
            };
          } catch (error) {
            console.error(error);
          }
        }
        updateScheduled = false;
      });
    }
  });

  $: {
    if (
      editorContainer ||
      quill ||
      fakeCaret ||
      lineNo ||
      caretLineNo ||
      caretColumnNo ||
      characterCount ||
      $settings
    ) {
      updateCaretPosition();
    }
  }

  $: {
    // If line numbers are enabled or disabled, update the caret position after a delay
    // of 300ms to complete the line numbers animated entry or exit.
    if ($settings.lineNumbers || lineNo) {
      (async function () {
        await tick();
        await new Promise((resolve) => setTimeout(resolve, 100));
        updateCaretPosition();
      })();
    }
  }

  const updateCaretPosAndEditorData = throttle(async () => {
    updateEditorData();
    await tick();
    updateCaretPosition();
  }, 100);

  onMount(async () => {
    await setupQuill();

    for (let e of ['input', 'scroll', 'click', 'keydown', 'focus', 'resize', 'load'])
      quill.root.addEventListener(e, updateCaretPosAndEditorData);
    for (let e of ['scroll', 'resize', 'load'])
      window.addEventListener(e, updateCaretPosAndEditorData);

    updateEditorData();
    settings.subscribe(updateEditorData);
    quill.on('editor-change', updateEditorData);
  });
</script>

<div class="relative h-full overflow-hidden">
  <div
    class="editor-container h-full w-full overflow-hidden
    rounded-none bg-transparent text-sm caret-transparent"
    bind:this={editorContainer}
    style="--editor-font-family: '{$settings.fontFamily}';
    --editor-font-size: {$settings.fontSize}px;
    --editor-zoom: {$settings.zoom};
    --line-no-digits-count: {lineNo.toString().length}"
  />
  <div
    class="fake-caret absolute z-0 w-0.5 rounded-[2px] bg-primary"
    bind:this={fakeCaret}
    style="top: calc({caretPosition.top}px); left: {caretPosition.left}px; height: {caretPosition.height}px;"
    spellcheck="false"
  />
</div>

<StatusBar {caretLineNo} {caretColumnNo} {characterCount} />

<!-- {#if updateScheduled}
  <style>
    .fake-caret {
      animation: none !important;
    }
  </style>
{/if} -->

{#if $settings.lineNumbers}
  <style>
    .ql-editor {
      counter-reset: line;
      @apply !pl-0;
    }

    .ql-editor > * {
      margin-left: clamp(22px, calc(1.6ch * var(--line-no-digits-count)), 10vw) !important;
      @apply relative border-l-2 border-muted !pl-2 duration-100;
    }

    .ql-editor > *::before {
      counter-increment: line;
      content: counter(line);
      transform: translateX(-100%);
      width: clamp(20px, calc(2ch * var(--line-no-digits-count)), 10vw) !important;
      padding-right: clamp(10px, calc(0.6ch * var(--line-no-digits-count)), 10vw) !important;
      @apply absolute left-0 mt-[3px] text-right text-xs text-primary duration-100;
    }
  </style>
{/if}
