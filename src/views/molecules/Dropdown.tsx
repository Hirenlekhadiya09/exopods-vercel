import * as DropdownMenu from "@radix-ui/react-dropdown-menu";

export function DropdownRoot({ children }: any) {
  return <DropdownMenu.Root>{children}</DropdownMenu.Root>;
}

export function DropdownTrigger({ children }: any) {
  return (
    <DropdownMenu.Trigger className="outline-none">
      {children}
    </DropdownMenu.Trigger>
  );
}

export function DropdownMenuWrap({ children, className, align = "end" }: any) {
  return (
    <DropdownMenu.Content
      align={align}
      className={`${
        className ? className : ""
      } rounded-xl shadow-[0_4px_14px_rgba(0,0,0,0.1)] bg-[#24292F] text-[#fff] outline-none`}
    >
      {children}
    </DropdownMenu.Content>
  );
}

export function DropdownItem({ children }: any) {
  return (
    <DropdownMenu.Item className="flex text-xs outline-none">
      {children}
    </DropdownMenu.Item>
  );
}
