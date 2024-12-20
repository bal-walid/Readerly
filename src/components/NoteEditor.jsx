import ModalWrapper from "./ModalWrapper";
import SimpleMDE from "react-simplemde-editor";
import "easymde/dist/easymde.min.css";
import "../assets/styles/easymde-override.css";
import { useMemo, useCallback, useRef } from "react";
import { useParams } from "react-router-dom";
import { addNote, editNote, getNoteById } from "../utils/db";
import router from "../main";
import useFetch from "../hooks/useFetch";

const NoteEditor = () => {
  const mdeInstance = useRef(null);
  const titleRef = useRef(null);
  const {id, noteId} = useParams();
  const [noteContent, loading, error] = useFetch(getNoteById, [id, noteId], (note) => console.log(note), noteId);
  const getMdeInstanceCallback = useCallback((simpleMde) => {
    mdeInstance.current = simpleMde;
    if (noteContent) {
      simpleMde.value(noteContent.markdown);
    }
  }, [noteContent]);
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
            if (mdeInstance && titleRef && titleRef.current.value) {
              const markdown = mdeInstance.current.value();
              const title = titleRef.current.value;
              const newNote = {title, markdown};
              if (noteId) {
                await editNote(id, noteId, newNote);
                router.navigate(`/shelf/${id}/notes/${noteId}`);
              } else {
                await addNote(id, newNote);
                router.navigate(`/shelf/${id}`);
              }
              
            }
          },
          className: "fa fa-save",
          title: "Custom Button",
        },
      ],
    };
  }, [mdeInstance, titleRef]);
  if (loading) {
    return "Loading...";
  }
  return (
    <ModalWrapper z={20}>
      <div className="bg-white h-full w-full">
        <div className="h-[10%]">
          <input
            placeholder="Title"
            className="text-3xl font-header font-semibold px-2 h-full w-full focus:outline-none"
            ref={titleRef}
            defaultValue={noteContent ? noteContent.title : ''}
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
