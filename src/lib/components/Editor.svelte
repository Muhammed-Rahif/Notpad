<script lang="ts">
  import { onMount, tick } from 'svelte';
  import throttle from 'lodash.throttle';
  import StatusBar from '@/components/StatusBar.svelte';
  import Quill from 'quill';
  import { position as getCaretPosition } from 'caret-pos';
  import { Notpad } from '@/helpers/notpad';
  import { settings, type EditorType } from '@/store/store';
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
    await setupQuill();

    // Updates the caret position when the settings (font size or family) changes.
    settings.subscribe(async () => {
      Notpad.editors.focus();
    });
  });

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

    for (let e of ['input', 'scroll', 'click', 'keydown', 'focus', 'resize', 'load'])
      quill.root.addEventListener(e, updates);
    for (let e of ['scroll', 'resize', 'load']) window.addEventListener(e, updates);

    quill.setContents(Notpad.editors.getContent(editor.id)!);

    // Adding a small delay, I don't know why, but it won't work without this
    await new Promise((resolve) => setTimeout(resolve, 200));
    updates();
  }

  async function updates() {
    await tick();
    updateTextAreaInfo();
    await tick();
    updateCaretPosition();
  }

  /**
   * Update line and column numbers.
   */
  function updateTextAreaInfo() {
    const selection = quill.getSelection();
    if (selection) {
      const text = quill.getText(0, selection.index + selection.length);
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
      requestAnimationFrame(async () => {
        if (editorContainer) {
          const caret = getCaretPosition(quill.root);

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
    class="editor-container h-full w-full overflow-hidden
    rounded-none bg-transparent text-sm caret-transparent"
    bind:this={editorContainer}
    style="--editor-font-family: '{$settings.fontFamily}';
    --editor-font-size: {$settings.fontSize}px;"
  />
  <div
    class="fake-caret absolute z-0 w-0.5 rounded-[2px] bg-primary"
    bind:this={fakeCaret}
    style="top: calc({caretPosition.top}px); left: {caretPosition.left}px; height: {caretPosition.height}px;"
    spellcheck="false"
  />
</div>

<StatusBar {lineNo} {columnNo} {characterCount} />

<style lang="postcss">
  :global(.ql-editor) {
    @apply h-full w-full overflow-y-auto border-none !px-3 !py-2.5 text-base leading-[136%] outline-none;
  }

  :global(.ql-editor, .ql-editor *) {
    font-family: var(--editor-font-family);
    font-size: var(--editor-font-size);
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
