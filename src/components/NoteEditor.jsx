import ModalWrapper from "./ModalWrapper";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import "../assets/styles/easymde-override.css";
import { useMemo, useCallback, useRef } from "react";
import { useParams } from "react-router-dom";
import { addNote } from "../utils/db";


const NoteEditor = () => {
  const mdeInstance = useRef(null);
  const titleRef = useRef(null);
  const getMdeInstanceCallback = useCallback((simpleMde) => {
    mdeInstance.current = simpleMde;
  }, []);
  const {id} = useParams();
  const options = useMemo(() => {
    return {
      spellChecker: false,
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
          name: "save",
          action: async () => {
            console.log('run');
            if (mdeInstance && titleRef) {
              const markdown = mdeInstance.current.value();
              const title = titleRef.current.value;
              const newNote = {title, markdown};
              await addNote(id, newNote);
            }
          },
          className: "fa fa-save",
          title: "Custom Button",
        },
      ],
    };
  }, [mdeInstance, titleRef]);
  return (
    <ModalWrapper z={20}>
      <div className="bg-white h-full w-full">
        <div className="h-[10%]">
          <input
            placeholder="Title"
            className="text-3xl font-header font-semibold px-2 h-full w-full focus:outline-none"
            ref={titleRef}
          />
        </div>
        <div className="h-[90%]">
          <SimpleMDE
          id="simplemde-editor"
            options={options}
            getMdeInstance={getMdeInstanceCallback}
          />
        </div>
      </div>
    </ModalWrapper>
  );
};
export default NoteEditor;
