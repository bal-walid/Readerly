import ModalWrapper from "./ModalWrapper";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import "../assets/styles/easymde-override.css";
import { useState } from "react";

const options = { 
  
}

const NoteEditor = () => {
  const [value, setValue] = useState("# Hello")
  return (
    <ModalWrapper z={20}>
      <div className="bg-white h-full w-full">
      <SimpleMDE options={options} value={value} onChange={(value) => setValue(value)}/>
      </div>
    </ModalWrapper>
  );
}
export default NoteEditor;