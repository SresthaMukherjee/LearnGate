import { cn } from "@/lib/utils" //The cn function is typically used to conditionally combine and manage class names for React components.

function Skeleton({
  className,
  ...props
}) {
  return (
    (<div
      className={cn("animate-pulse rounded-md bg-primary/10", className)}
      {...props} />)
  );
}

export { Skeleton }
 
//The Skeleton component is a functional component that accepts className and other props (spread with ...props).
//className is a prop that allows additional css classes to be passed to the div element for further styling.