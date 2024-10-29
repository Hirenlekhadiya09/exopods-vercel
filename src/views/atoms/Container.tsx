import React from "react";

function Container({ children, className }: ContainerProps) {
  return (
    <div className={`${className} px-[25px] sm:p-8 bg-[#0C1015]`}>
      {children}
    </div>
  );
}

export default Container;

interface ContainerProps {
  children: React.ReactNode;
  className?: string;
}
