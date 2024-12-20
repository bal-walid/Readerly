const ModalWrapper = ({ onClose, children, z = 10}) => {
  return (
    <div
      onClick={onClose}
      style={{zIndex:z}}
      className="absolute z-10 bg-black bg-opacity-50 top-0 left-0 w-full h-full flex items-center justify-center"
    >
        {children}
    </div>
  );
};

export default ModalWrapper;
