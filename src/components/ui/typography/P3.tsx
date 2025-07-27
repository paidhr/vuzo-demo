import { cn } from "@/utils/utils";

/**
 * An optimized P1 component.
 */
const P3: React.FC<JSX.IntrinsicElements["p"]> = (props) => {
  return (
    <p {...props} className={cn(`font-avenir text-xs`, props.className)}>
      {props.children}
    </p>
  );
};

export default P3;
