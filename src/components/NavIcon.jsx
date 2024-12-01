import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import ExploreOutlinedIcon from '@mui/icons-material/ExploreOutlined';
import LocalLibraryOutlinedIcon from '@mui/icons-material/LocalLibraryOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import HomeIcon from '@mui/icons-material/Home';
import ExploreIcon from '@mui/icons-material/Explore';
import LocalLibraryIcon from '@mui/icons-material/LocalLibrary';
import StarIcon from '@mui/icons-material/Star';


const icons = {
  home: {
    outlined: HomeOutlinedIcon,
    filled: HomeIcon,
  },
  shelf: {
    outlined: LocalLibraryOutlinedIcon,
    filled: LocalLibraryIcon,
  },
  explore: {
    outlined: ExploreOutlinedIcon,
    filled: ExploreIcon,
  },
  wishlist: {
    outlined: StarBorderOutlinedIcon,
    filled: StarIcon,
  },
};

const NavIcon = ({name, active}) => {
  const Icon = icons[name]?.[active ? 'filled' : 'outlined'];
  return <Icon/>
}
export default NavIcon