import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import LocalLibraryOutlinedIcon from '@mui/icons-material/LocalLibraryOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import StarIcon from '@mui/icons-material/Star';
import NavLink from "./NavLink";

const routes = [
  { name: "home", path: "/", icon: { outlined: HomeOutlinedIcon, filled: HomeIcon } },
  { name: "explore", path: "/explore", icon: { outlined: ExploreOutlinedIcon, filled: ExploreIcon } },
  { name: "my shelf", path: "/shelf", icon: { outlined: LocalLibraryOutlinedIcon, filled: LocalLibraryIcon } },
  { name: "wishlist", path: "/wishlist", icon: { outlined: StarBorderOutlinedIcon, filled: StarIcon } },
];

const Navbar = () => (
  <div className={`bg-white w-1/5 pt-12 gap-12 flex flex-col items-center shadow-nav-shadow z-10 max-lg:absolute max-lg:bottom-0 max-lg:left-0 max-lg:w-full max-lg:py-2`}>
    <h1 className="font-logo font-bold text-text-main text-4xl max-lg:hidden">
      Reader<span className="text-main">ly</span>
    </h1>
    <div className="flex flex-col gap-6 max-lg:flex-row max-lg:w-full max-lg:justify-evenly">
      {routes.map((route) => (
        <NavLink key={route.name} route={route} />
      ))}
    </div>
  </div>
);

export default Navbar;
