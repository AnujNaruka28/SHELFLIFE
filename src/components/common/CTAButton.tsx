import { cn } from '../../lib/utils';
import type { CTAButtonProps } from '../../types/CTAButtonProps';

const CTAButton = ({
  text,
  className,
  width = 'auto',
  height = 'auto',
  onClick,
  reactNode,
  ...props
}: CTAButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        // Base styles
        'bg-primary',
        'text-primary-foreground',
        'ring-primary',

        // Focus states
        'focus-visible:border-ring',
        'focus-visible:ring-ring/50',

        // Invalid states
        'aria-invalid:border-destructive',
        'aria-invalid:ring-destructive/20',
        'dark:aria-invalid:ring-destructive/40',

        // Hover state
        'hover:bg-primary/90',

        // Dynamic dimensions
        width,
        height,

        // Additional custom classes
        className
      )}
      {...props}
    >
      {
        reactNode || text
      }
    </button>
  );
};

export default CTAButton;
