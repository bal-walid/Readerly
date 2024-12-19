import ShelfBooks from "./ShelfBooks";
import ShelfStats from "./ShelfStats";

const Shelf = () => {
  return (
    <>
    <h1 className="primary-header">Your Shelf</h1>
    <h2 className="secondary-header my-4">Your Statistics</h2>
      <ShelfStats/>
    
      <ShelfBooks/>
    </>
  );
} 
export default Shelf;