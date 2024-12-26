<script lang="ts">
  import { onMount, tick } from 'svelte';
  import throttle from 'lodash.throttle';
  import debounce from 'lodash.debounce';
  import StatusBar from '@/components/StatusBar.svelte';
  import Quill from 'quill';
  import { position as getCaretPosition } from 'caret-pos';
  import { Notpad } from '@/helpers/notpad';
  import { settings } from '@/store/store';
  import 'quill/dist/quill.core.css';
  import type { EditorType } from '@/types/EditorTypes';
  import { RichTextEditor } from '@/helpers/rich-text-editor';
  import './Editor.css';

  interface Props {
    editor: EditorType;
  }

  let { editor }: Props = $props();
  let editorContainer: HTMLDivElement = $state(null!);
  let quill: Quill | undefined = $state();
  let fakeCaret: HTMLSpanElement | null = $state(null);
  let caretPosition = $state({ top: 10, left: 8, height: 24 });
  let lineNo = $state(0);
  let caretLineNo = $state(1);
  let caretColumnNo = $state(1);
  let characterCount = $state(0);
  let wordCount = $state(0);

  async function setupQuill() {
    const richTextEditor = new RichTextEditor({
      editorContainer
    });
    quill = richTextEditor.quill;

    await Notpad.editors.setQuill(editor.id, quill);
    quill.setContents(Notpad.editors.getContent(editor.id)!);
  }

  /**
   * Update line and column numbers.
   */
  const updateEditorData = throttle(() => {
    if (!quill) return;
    // console.count('Update editor data');

    const selection = quill?.getSelection();
    if (!selection) return;

    const fullPlainText = quill.getText();
    lineNo = fullPlainText.split('\n').length - 1; // quill.getLength() includes a trailing newline character
    const text = quill.getText(0, selection.index + selection.length);
    const lines = text.split('\n');
    caretLineNo = lines.length;
    caretColumnNo = lines[lines.length - 1].length + 1;
    characterCount = quill.getLength() - 1; // quill.getLength() includes a trailing newline character
    wordCount = fullPlainText
      .trim()
      .split(/\s+/)
      .filter((word) => word).length; // \s+ is RegEx for whitespace characters.
  }, 300);

  const resumeFakeCaretBlink = debounce(function () {
    if (fakeCaret) fakeCaret.classList.add('animate-caret-blink');
  }, 1000);

  // Using requestAnimationFrame for smooth updates
  const updateCaretPosition = throttle(() => {
    if (!quill) return;
    // console.count('Update caret position');

    requestAnimationFrame(async () => {
      if (fakeCaret) fakeCaret.classList.remove('animate-caret-blink');

      if (!quill) return;
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

  $effect(() => {
    if ($settings) {
      updateCaretPosAndEditorData();

      // Some settings are animated as default duration 300ms. So waiting them
      // to complete that the element are moved to its correct position for
      // calculating the caret's correct position.
      const timeoutId = setTimeout(updateCaretPosAndEditorData, 300);

      return () => clearTimeout(timeoutId);
    }
  });

  const updateCaretPosAndEditorData = async () => {
    updateEditorData();
    await tick();
    updateCaretPosition();
  };

  onMount(async () => {
    await setupQuill();
    if (!quill) return;

    for (let e of ['input', 'scroll', 'click', 'keydown', 'focus', 'resize', 'load'])
      quill.root.addEventListener(e, updateCaretPosAndEditorData);
    for (let e of ['scroll', 'resize', 'load'])
      window.addEventListener(e, updateCaretPosAndEditorData);
    updateCaretPosAndEditorData();

    quill.on('editor-change', updateCaretPosAndEditorData);
    // Marks editor as not saved when text content changes.
    quill.on('text-change', () => Notpad.editors.setIsSaved(editor.id, false));
  });
</script>

<div class="relative h-full overflow-hidden">
  <div
    class="editor-container relative flex overflow-hidden
    rounded-none bg-transparent text-sm caret-transparent
    duration-300"
    style="--editor-font-family: '{$settings.fontFamily}';
    --editor-font-size: {$settings.fontSize}px;
    --editor-zoom: {$settings.zoom};
    --line-no-digits-count: {lineNo.toString().length}"
    data-line-numbers={$settings.lineNumbers}
    data-wrap-lines={$settings.wrapLines}
    bind:this={editorContainer}
  ></div>

  <span
    class="fake-caret absolute z-0 w-0.5 animate-caret-blink
    rounded-[.06em] bg-primary"
    bind:this={fakeCaret}
    style="top: {caretPosition.top}px;
    left: {caretPosition.left}px;
    height: {caretPosition.height}px;
    width: {$settings.zoom * 2}px"
    spellcheck="false"
  ></span>
</div>

<StatusBar {caretLineNo} {caretColumnNo} {characterCount} {wordCount} />
