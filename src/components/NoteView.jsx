import { useParams } from "react-router-dom";
import ModalWrapper from "./ModalWrapper";
import { getNoteById } from "../utils/db";
import useFetch from "../hooks/useFetch";
import { marked } from "marked";
import "../assets/styles/note.css";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import router from "../main";

const getParsedNoteMarkdown = async (bookId, noteId) => {
  try {
    const note = await getNoteById(bookId, noteId);

    if (!note.markdown) {
      throw new Error(
        `Note with ID ${noteId} does not contain markdown content.`
      );
    }

    const html = await marked(note.markdown);

    return { ...note, html };
  } catch (error) {
    console.error("Error parsing note markdown:", error);
    throw error;
  }
};

const NoteView = () => {
  const { id, noteId } = useParams();
  const [noteContent, loading, error] = useFetch(getParsedNoteMarkdown, [
    id,
    noteId,
  ]);
  console.log(noteContent);
  if (loading) {
    return "Loading...";
  }
  return (
    <ModalWrapper>
      <div className="bg-white h-full w-full">
        <p
          onClick={() => router.navigate(`/shelf/${id}`)}
          className="flex justify-between items-center pt-2 px-2 italic text-text-secondary cursor-pointer hover:text-text-main"
        >
          <span className="inline-flex items-center gap-2">
            <ArrowBackIcon fontSize="small" /> {noteContent.bookTitle}
          </span>
          <button onClick={(e) => {e.stopPropagation(); router.navigate(`/shelf/${id}/notes/edit/${noteId}`)} } className="bg-[#2d2d6f] text-white px-4 py-1 mr-4 rounded-md">Edit</button>
        </p>
        <h1 className="border-b-[1px] border-b-[#cde4da] text-3xl px-2 h-[10%] flex items-center">
          {noteContent.title}
        </h1>
        <div
          className="note-content"
          dangerouslySetInnerHTML={{ __html: noteContent.html }}
        ></div>
      </div>
    </ModalWrapper>
  );
};
export default NoteView;
