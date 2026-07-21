import type { NavButtonProps } from "../../types/NavButtonProps";

const NavButton = ({ children, ...props }: NavButtonProps) => {
  return (
    <>
      <button className='group h-8 select-none border-none bg-background px-3 text-sm leading-8
    text-foreground cursor-pointer active:rounded-full active:shadow-[-1px_0px_1px_0px_#e4e4e7_inset,1px_0px_1px_0px_#e4e4e7_inset,0px_0.125rem_1px_0px_#d4d4d8_inset]' {...props}>
        <div className='block group-active:transform-[translate3d(0,1px,0)]'>
            {children}
        </div>
      </button>
    </>
  );
};

export default NavButton;