import { useState } from "react";
import "./App.css";
import draftToHtml from "draftjs-to-html";
import { EditorState, convertToRaw } from "draft-js";
import { Editor } from "react-draft-wysiwyg";

function App() {
  const [template, setTemplate] = useState();
  const [editorState, setEditorState] = useState(() =>
    EditorState.createEmpty()
  );

  const onEditorStateChange = (editorState) => {
    setEditorState(editorState);
    setTemplate(draftToHtml(convertToRaw(editorState.getCurrentContent())));
  };

  const writeToConsole = () => {
    console.log("editorState", editorState);
    console.log(
      "editorState to html",
      draftToHtml(convertToRaw(editorState.getCurrentContent()))
    );
  };

  return (
    <div style={{ margin: 10 }}>
      <Editor
        placeholder="Write a template..."
        editorState={editorState}
        onEditorStateChange={onEditorStateChange}
      />
      <button onClick={writeToConsole}>Write to Console</button>

      {template && (
        <div>
          <h2>Raw HTML</h2>
          {template}
        </div>
      )}

      {template && (
        <div>
          <h2>HTML</h2>
          <div dangerouslySetInnerHTML={{ __html: template }}></div>
        </div>
      )}
    </div>
  );
}

export default App;
