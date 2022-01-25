/* eslint-disable no-console */
import { EditorState } from '@codemirror/basic-setup';
import { dialog, BrowserWindow } from '@electron/remote';
import { OpenDialogReturnValue } from 'electron';
import fs from 'fs';
import { useContext } from 'react';
import { acceptableFileExtentions } from '../../constants/files';
import { EditorViewContext } from '../../contexts/EditorView';
import { defaultEditorViewExtensions } from '../../helpers/editor';
import './MenuBar.scss';

function MenuBar() {
  const { editorView } = useContext(EditorViewContext);

  const handleOpenBtnClick = async () => {
    try {
      // configure options for openFile dialog
      const openFileDialogOptions: Electron.OpenDialogOptions = {
        properties: ['openFile'],
        message: 'Open a file from your Computer',
        filters: [
          { name: 'All types', extensions: acceptableFileExtentions },
          ...acceptableFileExtentions.map((fileExt) => ({
            name: fileExt,
            extensions: [fileExt],
          })),
        ],
      };

      // opening select file dialog
      const filesList: OpenDialogReturnValue = await dialog.showOpenDialog(
        BrowserWindow.getFocusedWindow() || new BrowserWindow(),
        openFileDialogOptions
      );

      // reading file content if any file is selected
      if (filesList.filePaths[0])
        fs.readFile(filesList.filePaths[0], 'utf-8', (err, fileContent) => {
          if (err)
            dialog.showErrorBox(
              "Can't open file!",
              `An error ocurred reading the file :${err.message}`
            );
          else
            editorView.setState(
              EditorState.create({
                doc: fileContent,
                extensions: defaultEditorViewExtensions,
              })
            );
        });
    } catch (err) {
      dialog.showErrorBox(
        "Can't open file!",
        `An error ocurred reading the file :${err}`
      );
    }
  };

  return (
    <ul role="menubar" className="menubar">
      <li role="menuitem" tabIndex={0} aria-haspopup="true">
        File
        <ul role="menu">
          <li
            role="menuitem"
            onClick={handleOpenBtnClick}
            onKeyPress={handleOpenBtnClick}
          >
            <a href="#menu">Open</a>
          </li>
          <li role="menuitem">
            <a href="#menu">Save</a>
          </li>
          <li role="menuitem">
            <a href="#menu">Save As...</a>
          </li>
          <li role="menuitem">
            <a href="#menu">Exit</a>
          </li>
        </ul>
      </li>
      <li role="menuitem" tabIndex={0} aria-haspopup="true">
        Edit
        <ul role="menu">
          <li role="menuitem">
            <a href="#menu">Undo</a>
          </li>
          <li role="menuitem">
            <a href="#menu">Copy</a>
          </li>
          <li role="menuitem">
            <a href="#menu">Cut</a>
          </li>
          <li role="menuitem">
            <a href="#menu">Paste</a>
          </li>
          <li role="menuitem">
            <a href="#menu">Delete</a>
          </li>
          <li role="menuitem">
            <a href="#menu">Find...</a>
          </li>
          <li role="menuitem">
            <a href="#menu">Replace...</a>
          </li>
          <li role="menuitem">
            <a href="#menu">Go to...</a>
          </li>
        </ul>
      </li>
      <li role="menuitem" tabIndex={0} aria-haspopup="true">
        View
        <ul role="menu">
          <li role="menuitem" tabIndex={0} aria-haspopup="true">
            Zoom
            <ul role="menu">
              <li role="menuitem">
                <button type="button">Zoom In</button>
              </li>
              <li role="menuitem">
                <button type="button">Zoom Out</button>
              </li>
            </ul>
          </li>
          <li role="menuitem">
            <a href="#menu">Status Bar</a>
          </li>
        </ul>
      </li>
      <li role="menuitem" tabIndex={0} aria-haspopup="true">
        Help
        <ul role="menu">
          <li role="menuitem">
            <a href="#menu">View Help</a>
          </li>
          <li role="menuitem">
            <a href="#menu">About</a>
          </li>
        </ul>
      </li>
    </ul>
  );
}

export default MenuBar;
