const ModalWrapper = ({ onClose, children }) => {
  return (
    <div
      onClick={onClose}
      className="absolute z-10 bg-black bg-opacity-50 top-0 left-0 w-full h-full flex items-center justify-center"
    >
      <div
        className="bg-white rounded-md p-6 w-[80%] h-[80%] max-w-[1000px] flex flex-col"
        onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside
      >
        {children}
      </div>
    </div>
  );
};

export default ModalWrapper;
