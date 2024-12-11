const ExploreBookModal = ({id, close}) => {
  return (
    <div className="absolute z-10 bg-black bg-opacity-50 top-0 left-0 w-full h-full">
      <div className="bg-white">
        {id}
        <div onClick={close}>x</div>
      </div>
    </div> 
  );
}
export default ExploreBookModal;