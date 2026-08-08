import type { ReactNode } from "react";

export interface CTAButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text?: string;
  className?: string;
  width?: string;
  height?: string;
  onClick?: () => void;
  reactNode?: ReactNode;
}
