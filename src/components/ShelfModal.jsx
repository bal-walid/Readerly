import { useLocation, useOutletContext, useParams } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import { findShelfBookById } from "../utils/db";
import ModalWrapper from "./ModalWrapper";

const ShelfModal = () => {
  const location = useLocation();
  const { id } = useParams(); 
  const { book: stateBook } = location.state || {}; // Extract state book if available
  // Conditionally fetch the book only if stateBook is not available
  const [book, loading, error] = useFetch(() => findShelfBookById(id), [id], !stateBook);
  console.log(book);
  const {close} = useOutletContext();
  return (
    <ModalWrapper onClose={close}>a</ModalWrapper>
  );
}
export default ShelfModal;