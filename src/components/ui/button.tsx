import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/utils/utils";
import { Spin } from "antd";

const buttonVariants = cva(
  "rounded-[5px] disabled:opacity-50 focus:outline-none focus:shadow-none disabled:cursor-not-allowed py-2 px-4 text-sm min-w-[106px] font-avenir focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 font-semibold transition-all duration-100 ease-linear",
  {
    variants: {
      variant: {
        default:
          "bg-slate-900 text-slate-50 hover:bg-slate-900/90 dark:bg-slate-50 dark:text-slate-900 dark:hover:bg-slate-50/90",
        outline:
          "bg-transparent border border-neutral300 hover:border-[#9babc720] hover:bg-[#9babc720] active:bg-[#9babc720] focus:bg-[#9babc720]",
        link: "text-primary500 hover:text-primary600 dark:text-primary300 dark:hover:text-primary400",
        primary:
          "bg-primary500 hover:bg-primary700 text-white focus:ring-primary500 active:bg-primary700 focus:bg-primary700",
        secondary:
          "bg-neutral20 border border-neutral30 hover:bg-neutral30 active:bg-neutral30 focus:bg-neutral30 text-neutral300 focus:ring-neutral100",
        danger:
          "bg-danger500 hover:bg-danger700 active:bg-danger800 focus:bg-danger800 text-white",
        "danger-outline":
          "box-border border-2 border-danger500 bg-white hover:bg-danger100 active:bg-danger100 focus:bg-danger100 active:border-danger800 focus:border-danger800 text-danger500",
        neutral:
          "bg-white border border-neutral50 hover:bg-white/70 active:bg-white/70 focus:bg-white/70 text-neutral400 focus:ring-neutral100",
        "neutral-outline":
          "box-border border-2 border-neutral30 bg-transparent hover:bg-neutral30 hover:text-neutral300 text-neutral10",
        destructive:
          "bg-[#fee7ec] border border-[#ffdde4] hover:bg-[#ffdde4] active:bg-[#ffdde4] focus:bg-[#ffdde4] text-[#EB3949] focus:ring-[#EB3949]",
        success:
          "bg-success500 hover:bg-success700 active:bg-success800 focus:bg-success800 text-white",
        white:
          "bg-white  hover:bg-white/90 active:bg--white/90 focus:bg--white/90 text-primary500 focus:ring-white",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  submitting?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      className,
      variant,
      size,
      asChild = false,
      submitting,
      children,
      ...props
    },
    ref
  ) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      >
        {submitting ? (
          <Spin
            size="small"
            className={`
          ${
            variant === "primary"
              ? "[&_i]:!bg-white"
              : variant === "success" || variant === "danger"
              ? "[&_i]:!bg-white"
              : variant === "secondary" ||
                variant === "neutral" ||
                variant === "destructive"
              ? "[&_i]:!bg-neutral400"
              : "[&_i]:!bg-primary500"
          }
          `}
          />
        ) : (
          children
        )}
      </Comp>
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };
