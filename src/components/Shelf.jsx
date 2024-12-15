import ShelfBooks from "./ShelfBooks";
import ShelfStats from "./ShelfStats";

const Shelf = () => {
  return (
    <>
    <h1 className="primary-header">Your Shelf</h1>
    <h2 className="secondary-header mt-4">Your Statistics</h2>
      <ShelfStats/>
    <h2 className="secondary-header mt-4">Your Books</h2>
      <ShelfBooks/>
    </>
  );
} 
export default Shelf;