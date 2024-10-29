function PageHeader({ children, className, title }: PageHeaderProps) {
  return (
    <header className={`${className} mb-6`}>
      <div>
        <h1 className="text-2xl text-[#fff] font-heading font-['Poppins'] font-medium">
          {title}
        </h1>
        <p className="text-[#C4C4C4A8] text-sm font-normal">Review Your Deployed Services</p>
      </div>
      {children && children}
    </header>
  );
}

export default PageHeader;

interface PageHeaderProps {
  title: string;
  className?: string;
  children?: React.ReactNode;
}
