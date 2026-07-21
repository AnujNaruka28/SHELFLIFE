export interface CTAButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  className?: string;
  width?: string;
  height?: string;
  onClick?: () => void;
}
