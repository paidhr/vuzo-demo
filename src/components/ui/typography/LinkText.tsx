import { cn } from "@/utils/utils";
import { forwardRef } from "react";
import { Link, type LinkProps } from "react-router-dom";

export interface TextLinkProps extends LinkProps {}

const TextLink = forwardRef<HTMLAnchorElement, TextLinkProps>(
  ({ className, ...props }, ref) => {
    return (
      <Link
        {...props}
        ref={ref}
        className={cn(
          "!text-primary500 font-circular no-underline font-medium",
          className
        )}
      />
    );
  }
);

TextLink.displayName = "TextLink";

export default TextLink;
