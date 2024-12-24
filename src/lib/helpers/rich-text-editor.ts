import Quill from 'quill';

export class RichTextEditor {
  editorContainer: HTMLElement;
  quill: Quill;

  constructor({ editorContainer }: { editorContainer: HTMLElement }) {
    this.editorContainer = editorContainer;
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

    this.quill = new Quill(this.editorContainer!, options);
    return this;
  }
}
