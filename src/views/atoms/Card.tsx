function Card({ title, children, className }: CardProps) {
  return (
    <div
      className={`${className} rounded-2xl border border-stroke border-[#ffffff14] bg-[#24292f9e] px-[13px] py-6 fsm:p-6 mb-6 text-[#fff]`}
    >
      {children ? children : title}
    </div>
  );
}

export default Card;

interface CardProps {
  title?: string;
  children?: React.ReactNode;
  className?: string;
}
