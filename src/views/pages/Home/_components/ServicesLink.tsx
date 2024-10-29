import { Link } from "react-router-dom";

function ServicesLink(props: ServicesLinkProps) {
  const { text, className, arrow } = props;

  return (
    <Link to="/services" className={`z-[80] ${className} flex gap-3 max-w-max`}>
      {text && text}
      {arrow && (
        <svg
          width="22"
          height="22"
          viewBox="0 0 22 22"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M14.9615 18L20.5 12.5199M20.5 12.5199L14.9615 7M20.5 12.5199H2.5"
            stroke="white"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      )}
    </Link>
  );
}

export default ServicesLink;

interface ServicesLinkProps {
  text?: string;
  className?: string;
  arrow?: boolean;
}
