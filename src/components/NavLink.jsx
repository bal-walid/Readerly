import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

const NavLink = ({ route }) => {
  const path = useLocation().pathname;
  const active = route.path === path;
  const Icon = route.icon[active ? "filled" : "outlined"];
  const className =
  "font-body inline-flex  gap-4 capitalize items-start " +
  (active ? "text-main font-semibold" : "text-[#8A8A8A]");
  return (
    <Link className={className} to={route.path}>
      <Icon fontSize="medium" />
      <span>{route.name}</span>
    </Link>
  );
};
export default NavLink;
