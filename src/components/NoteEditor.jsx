import ModalWrapper from "./ModalWrapper";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import "../assets/styles/easymde-override.css";
import { useState } from "react";

const options = {
  toolbar: [
    "bold",
    "italic",
    "heading",
    "|",
    "quote",
    "unordered-list",
    "ordered-list",
    "|",
    "link",
    "guide",
    "|",
    {
      name: "save", // Custom button name
      action: () => {console.log('a')}, // Function to be called when clicked
      className: "fa fa-save", // Icon (using Font Awesome class here)
      title: "Custom Button", // Tooltip text
    },
  ]
};

const NoteEditor = () => {
  const [value, setValue] = useState("# Hello");
  const [title, setTitle] = useState("");
  return (
    <ModalWrapper z={20}>
      <div className="bg-white h-full w-full">
        <div className="h-[10%]">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title"
            className="text-3xl font-header font-semibold px-2 h-full w-full focus:outline-none"
          />
        </div>
        <div className="h-[90%]">
          <SimpleMDE
            options={options}
            value={value}
            onChange={(value) => setValue(value)}
          />
        </div>
      </div>
    </ModalWrapper>
  );
};
export default NoteEditor;
