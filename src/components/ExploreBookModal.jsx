import CloseIcon from "@mui/icons-material/Close";
import BookmarkAddOutlinedIcon from "@mui/icons-material/BookmarkAddOutlined";
import StarBorderOutlinedIcon from "@mui/icons-material/StarBorderOutlined";
import StarIcon from "@mui/icons-material/Star";
import { fetchAuthorBio } from "../utils/api";
import useFetch from "../hooks/useFetch";

const ExploreBookModal = ({ book, close }) => {
  const { loading, error, bio } = useFetch(fetchAuthorBio, [book.authorId]);
  const coverUrl = book.cover
    ? `https://covers.openlibrary.org/b/id/${book.cover}-L.jpg`
    : null;
  return (
    <div
      onClick={close}
      className="absolute z-10 bg-black bg-opacity-50 top-0 left-0 w-full h-full flex items-center justify-center"
    >
      <div className="bg-white rounded-md p-6 w-[80%] h-[80%] max-w-[1000px] flex flex-col">
        {/* Header */}
        <div className="flex items-center">
          <h2 className="text-main text-2xl font-header font-semibold whitespace-nowrap overflow-hidden text-ellipsis">
            {book.title}
          </h2>
          <div className="flex ml-auto gap-5">
            <button className="btn text-green-500 flex items-center gap-2 text-sm">
              <BookmarkAddOutlinedIcon fontSize="small" /> Add To Shelf
            </button>
            <button className="btn text-[#DBC332] flex items-center gap-2 text-sm">
              <StarBorderOutlinedIcon fontSize="small" /> Add To Wishlist
            </button>
            <button className="text-main">
              <CloseIcon onClick={close} fontSize="large" />
            </button>
          </div>
        </div>
        <div className="text-text-secondary">
          {book.author}, {book.publishDate}
        </div>
        {/* Main */}
        {/* min-h-0 is necessary because flex children expand to fit content by default! */}
        <div className="pt-2 flex gap-9 flex-1 min-h-0">
          <img
            className="w-80 object-cover h-full  border-[2px] border-silver rounded-md"
            src={coverUrl}
            alt=""
          />
          <div>
            <p className="flex items-center gap-3">
              <StarIcon fontSize="large" className="text-main" />
              <span>
                4.24 <span className="font-semibold text-lg">/ 5</span>{" "}
              </span>
              Average Rating on OpenLibrary
            </p>
            <h3 className="text-2xl mt-3">Synopsis</h3>
            <p>
              Ged was the greatest sorcerer in Earthsea, but in his youth he was
              the reckless Sparrowhawk. In his hunger for power and knowledge,
              he tampered with long-held secrets and loosed a terrible shadow
              upon the world. This is the tumultuous tale of his testing, how he
              mastered the mighty words of power, tamed an ancient dragon, and
              crossed death's threshold to restore the balance. With stories as
              perennial and universally beloved as The Chronicles of Narnia{" "}
            </p>
            <h3 className="text-2xl mt-3">About Author</h3>
            <p>
              As of 2010, Ursula K. Le Guin has published twenty-one novels,
              eleven volumes of short stories, three collections of essays,
              twelve books for children, six volumes of poetry and four of
              translation, and has received many awards: Hugo, Nebula, National
              Book Award, PEN-Malamud, etc. Her recent publications include a
              volume of poetry, Incredible Good Fortune, the novel Lavinia, and
              an essay collection, Cheek by Jowl. She lives in Portland, Oregon.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ExploreBookModal;
