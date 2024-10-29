import Tooltip from "molecules/Tooltip";
import { NavLink } from "react-router-dom";

function NavItem({ item, isActive }: NavItemProps) {
  return (
    <li className="cursor-default fill-gray-500 text-gray-500 hover:fill-gray-300 hover:text-gray-400 transition justify-center flex relative">
      <Tooltip name={item.name} position="left" dely={200}>
        <NavLink
          to={`${item.url}`}
          className="flex relative items-center group p-2 w-full cursor-pointer"
        >
          <div className="flex space-x-2 mx-auto">
            <div
              className={`${
                isActive ? "opacity-100" : "opacity-60"
              } h-6 w-6 text-center relative`}
            >
              {item.icon}
            </div>
            <span className="sr-only">{item.name}</span>
          </div>
        </NavLink>
      </Tooltip>
    </li>
  );
}

export default NavItem;

interface NavItemProps {
  item: any;
  isActive: boolean;
  menuExpanded?: boolean;
  menuOpen?: boolean;
}
