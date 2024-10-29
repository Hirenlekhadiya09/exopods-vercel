import { useLocation } from "react-router-dom";
import NavItem from "./NavItem";

function NavList({ data, className, bottom = false }: NavListProps) {
  const location = useLocation();
  const pathname = location.pathname;

  return (
    <nav className={`flex flex-1 flex-col ${className}`}>
      <ul
        role="list"
        className={`flex flex-1 flex-col space-y-6 ${
          bottom ? "justify-end" : ""
        }`}
      >
        {data &&
          data.map((item: any) => {
            const firstPartOfUrl = item.url.split("/")[1];
            const isActive = pathname.startsWith(`/${firstPartOfUrl}`);
            return <NavItem key={item.url} item={item} isActive={isActive} />;
          })}
      </ul>
    </nav>
  );
}

export default NavList;

interface NavListProps {
  data: any;
  className?: string;
  bottom?: boolean;
}
