import { Link } from "react-router-dom";
import getGreeting from "../utils/getGreeting";
import CurrentlyReading from "./CurrentlyReading";

const Home = () => {
  return (
    <>
      <h1 className="primary-header capitalize mb-5">{getGreeting() + "!"}</h1>
      <h2 className="secondary-header mb-5 flex items-center">Jump Back In To <Link to={'/shelf'} className="ml-auto text-base">Your Library &gt;</Link></h2>
      <CurrentlyReading/>
    </>
  );
};

export default Home;
