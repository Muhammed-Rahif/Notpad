import { useEffect } from 'react';
import './TextBox.scss';
import { setupEditor } from 'renderer/helpers/editor';

function TextBox() {
  useEffect(() => {
    const editor = setupEditor(
      document.querySelector('.text-box-wrapper') || undefined
    );
    editor.focus();
  }, []);

  return <div className="text-box-wrapper" />;
}

export default TextBox;
