<script lang="ts">
  import { onMount, tick } from 'svelte';
  import throttle from 'lodash.throttle';
  import StatusBar from '@/components/StatusBar.svelte';
  import Quill from 'quill';
  import { Notpad } from '@/helpers/notpad';
  import { settings } from '@/store/store';
  import FakeCaret from './FakeCaret.svelte';
  import type { EditorType } from '@/src/lib/types/EditorType';
  import 'quill/dist/quill.core.css';
  import './Editor.css';

  interface Props {
    editor: EditorType;
  }

  let { editor }: Props = $props();
  let editorContainer: HTMLDivElement = $state(null!);
  let lineNo = $state(0);
  let caretLineNo = $state(1);
  let caretColumnNo = $state(1);
  let characterCount = $state(0);
  let wordCount = $state(0);
  let quill = $derived(editor.quill!);
  let fakeCaret: FakeCaret = $state(null!);

  async function setupQuill() {
    const options = {
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
    };

    editor.quill = new Quill(editorContainer, options);
    await Notpad.editors.setQuill(editor.id, editor.quill);
    editor.quill.setContents(Notpad.editors.getContent(editor.id)!);
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
  }, 150);

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
    fakeCaret.updateCaretPosition();
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

<div
  class="relative h-full overflow-hidden"
  style:--editor-zoom={$settings.zoom}
  style:--editor-font-size="{$settings.fontSize}px"
  style:--editor-font-family={$settings.fontFamily}
  style:--line-no-digits-count={lineNo.toString().length}
>
  <div
    class="editor-container relative flex overflow-hidden
    rounded-none bg-transparent text-sm duration-300"
    class:caret-transparent={$settings.caret.enable}
    data-line-numbers={$settings.lineNumbers}
    data-wrap-lines={$settings.wrapLines}
    bind:this={editorContainer}
  ></div>

  <FakeCaret {quill} {editorContainer} bind:this={fakeCaret} />
</div>

<StatusBar {caretLineNo} {caretColumnNo} {characterCount} {wordCount} />
