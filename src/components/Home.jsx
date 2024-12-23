import { Link } from "react-router-dom";
import getGreeting from "../utils/getGreeting";
import CurrentlyReading from "./CurrentlyReading";
import RecommendedForYou from "./RecommendedForYou";

const Home = () => {
  return (
    <>
      <h1 className="primary-header capitalize mb-5">{getGreeting() + "!"}</h1>
      <h2 className="secondary-header mb-5 flex max-sm:flex-col items-center">Jump Back In <Link to={'/shelf'} className="ml-auto max-sm:ml-0 text-base hover:text-text-main">Your Library &gt;</Link></h2>
      <CurrentlyReading/>
      <h2 className="secondary-header my-5 flex max-sm:flex-col items-center">Recommended For You<Link to={'/shelf'} className="ml-auto max-sm:ml-0 text-base hover:text-text-main">See More &gt;</Link></h2>
      <RecommendedForYou/>
      <div className="h-4"></div>
    </>
  );
};

export default Home;
