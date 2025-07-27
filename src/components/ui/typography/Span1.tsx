import { cn } from "@/utils/utils";

/**
 * An optimized P1 component.
 */
const Span1: React.FC<JSX.IntrinsicElements["span"]> = (props) => {
  return (
    <span {...props} className={cn(`font-avenir text-sm`, props.className)}>
      {props.children}
    </span>
  );
};

export default Span1;
