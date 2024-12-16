<script lang="ts">
  import { onMount, tick, untrack } from 'svelte';
  import throttle from 'lodash.throttle';
  import debounce from 'lodash.debounce';
  import StatusBar from '@/components/StatusBar.svelte';
  import Quill from 'quill';
  import { position as getCaretPosition } from 'caret-pos';
  import { Notpad } from '@/helpers/notpad';
  import { settings } from '@/store/store';
  import 'quill/dist/quill.core.css';
  import './Editor.css';
  import type { EditorType } from '@/types/EditorTypes';

  interface Props {
    editor: EditorType;
  }

  let { editor }: Props = $props();
  let editorContainer: HTMLDivElement = $state(null!);
  let quill: Quill = $state(null!);
  let fakeCaret: HTMLSpanElement | null = $state(null);
  let caretPosition = $state({ top: 10, left: 8, height: 24 });
  let lineNo = $state(0);
  let caretLineNo = $state(1);
  let caretColumnNo = $state(1);
  let characterCount = $state(0);
  let wordCount = $state(0);

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
      wordCount = quill
        .getText()
        .trim()
        .split(/\s+/)
        .filter((word) => word).length; // \s+ is RegEx for whitespace characters.
    }
  }

  const resumeFakeCaretBlink = debounce(function () {
    if (fakeCaret) fakeCaret.style.animationDuration = '1s';
  }, 700);

  // Using requestAnimationFrame for smooth updates
  const updateCaretPosition = throttle(() => {
    console.count('Update caret');
    requestAnimationFrame(async () => {
      if (fakeCaret) fakeCaret.style.animationDuration = '0s';

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

      resumeFakeCaretBlink();
    });
  });

  /**
   * https://github.com/sveltejs/svelte/issues/9248#issuecomment-1732246774
   */
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const explicitEffect = (fn: any, depsFn: () => void) => {
    $effect(() => {
      depsFn();
      untrack(fn);
    });
  };

  explicitEffect(updateCaretPosition, () => [
    editorContainer,
    quill,
    lineNo,
    caretLineNo,
    caretColumnNo,
    wordCount,
    characterCount,
    $settings
  ]);

  explicitEffect(
    async () => {
      await tick();
      // If line numbers are enabled or disabled, update the caret position after a delay
      // of 300ms to complete the line numbers animated entry or exit.
      await new Promise((resolve) => setTimeout(resolve, 100));
      updateCaretPosition();
    },
    () => [$settings.lineNumbers, lineNo]
  );

  const updateCaretPosAndEditorData = throttle(async () => {
    updateEditorData();
    await tick();
    updateCaretPosition();
  });

  onMount(async () => {
    await setupQuill();

    for (let e of ['input', 'scroll', 'click', 'keydown', 'focus', 'resize', 'load'])
      quill.root.addEventListener(e, updateCaretPosAndEditorData);
    for (let e of ['scroll', 'resize', 'load'])
      window.addEventListener(e, updateCaretPosAndEditorData);

    updateEditorData();
    settings.subscribe(updateEditorData);
    quill.on('editor-change', updateEditorData);

    // Marks editor as not saved when text content changes.
    quill.on('text-change', () => Notpad.editors.setIsSaved(editor.id, false));
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
  ></div>
  <span
    class="fake-caret absolute z-0 w-0.5 rounded-[.06em] bg-primary"
    bind:this={fakeCaret}
    style="top: calc({caretPosition.top}px);
    left: {caretPosition.left}px;
    height: {caretPosition.height}px;
    width: {$settings.zoom * 2}px"
    spellcheck="false"
  ></span>
</div>

<StatusBar {caretLineNo} {caretColumnNo} {characterCount} {wordCount} />

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
      font-size: calc(var(--editor-font-size) * 0.7);
      counter-increment: line;
      content: counter(line);
      transform: translateX(-100%);
      width: clamp(20px, calc(2ch * var(--line-no-digits-count)), 10vw) !important;
      padding-right: clamp(10px, calc(0.6ch * var(--line-no-digits-count)), 10vw) !important;
      @apply absolute left-0 text-right text-primary duration-100;
    }
  </style>
{/if}
