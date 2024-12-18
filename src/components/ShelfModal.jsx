import { useOutletContext } from "react-router-dom";
import ModalWrapper from "./ModalWrapper";

const ShelfModal = () => {
  const {close} = useOutletContext();
  return (
    <ModalWrapper onClose={close}>a</ModalWrapper>
  );
}
export default ShelfModal;