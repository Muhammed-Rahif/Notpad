<script lang="ts">
  import { onMount } from 'svelte';
  import throttle from 'lodash.throttle';
  import StatusBar from '@/components/StatusBar.svelte';
  import Quill from 'quill';
  import { position } from 'caret-pos';
  import { Notpad } from '@/helpers/notpad';
  import { type EditorType } from '@/store';
  import 'quill/dist/quill.core.css';

  export let editor: EditorType;

  let editorContainer: HTMLDivElement;
  let quill: Quill;
  let fakeCaret: HTMLDivElement | null = null;
  let caretPosition = { top: 10, left: 8, height: 24 };
  let lineNo = 1;
  let columnNo = 1;
  let characterCount = 0;
  /**
   * Flag to track if update is already scheduled
   */
  let updateScheduled = false;

  onMount(async () => {
    setupQuill();
  });

  function setupQuill() {
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

    quill.focus();
    for (let e of ['input', 'scroll', 'click', 'keydown', 'focus', 'resize'])
      quill.root.addEventListener(e, updates);
    Notpad.editors.setQuill(editor.id, quill);
    quill.setContents(Notpad.editors.getContent(editor.id)!);
    quill.on('editor-change', () => {
      Notpad.editors.updateContent(editor.id, quill.getContents());
    });
    setTimeout(updates, 80);
  }

  function updates() {
    updateCaretPosition();
    setTimeout(updateTextAreaInfo, 50);
  }

  /**
   * Update line and column numbers.
   */
  function updateTextAreaInfo() {
    const selection = quill.getSelection();
    if (selection) {
      const text = quill.getText(0, selection.index);
      const lines = text.split('\n');
      lineNo = lines.length;
      columnNo = lines[lines.length - 1].length + 1;
      characterCount = quill.getLength() - 1; // quill.getLength() includes a trailing newline character
    }
  }

  // Using requestAnimationFrame for smooth updates
  const updateCaretPosition = throttle(() => {
    if (!updateScheduled) {
      updateScheduled = true;
      requestAnimationFrame(() => {
        if (editorContainer) {
          const caret = position(quill.root);

          // Adjust for the scroll position
          caretPosition = {
            top: caret.top - editorContainer.scrollTop,
            left: caret.left - editorContainer.scrollLeft,
            height: caret.height
          };
        }
        updateScheduled = false;
      });
    }
  }, 50);
</script>

<div class="relative h-full overflow-hidden">
  <div
    class="editor-container rounded-nonebg-transparent h-full
    w-full overflow-hidden text-sm caret-transparent"
    bind:this={editorContainer}
  />
  <div
    class="fake-caret absolute z-0 w-0.5 rounded-[2px] bg-primary"
    bind:this={fakeCaret}
    style="top: calc({caretPosition.top}px); left: {caretPosition.left}px; height: {caretPosition.height}px;"
    spellcheck="false"
  />
</div>

<StatusBar {lineNo} {columnNo} {characterCount} />

<style>
  :global(.ql-editor) {
    @apply h-full w-full overflow-y-scroll border-none !px-3 !py-2.5 text-base outline-none;
  }

  :global(.ql-editor a) {
    @apply text-blue-500;
  }

  @keyframes blink {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }

  .fake-caret {
    animation: blink 1s infinite;
    transition:
      top 0s,
      left 200ms;
  }
</style>
