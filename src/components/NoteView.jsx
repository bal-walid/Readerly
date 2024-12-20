import { useParams } from "react-router-dom";
import ModalWrapper from "./ModalWrapper";
import { getNoteById } from "../utils/db";
import useFetch from "../hooks/useFetch";
import {marked} from "marked";
import "../assets/styles/note.css"

const getParsedNoteMarkdown = async (bookId, noteId) => {
  try {
    const note = await getNoteById(bookId, noteId);

    if (!note.markdown) {
      throw new Error(`Note with ID ${noteId} does not contain markdown content.`);
    }

    const html = await marked(note.markdown);

    return {...note, html};
  } catch (error) {
    console.error("Error parsing note markdown:", error);
    throw error;
  }
};

const NoteView = () => {
  const {id, noteId} = useParams();
  const [noteContent, loading, error] = useFetch(getParsedNoteMarkdown, [id, noteId]);
  console.log(noteContent);
  if (loading) {
    return "Loading...";
  }
  return (
    <ModalWrapper>
      <div className="bg-white h-screen w-screen">
        <h1 className="border-b-[1px] border-b-[#cde4da] text-3xl px-2 h-[10%] flex items-center">{noteContent.title}</h1>
        <div className="note-content" dangerouslySetInnerHTML={{__html: noteContent.html}}></div>
      </div>
    </ModalWrapper>
  );
}
export default NoteView;