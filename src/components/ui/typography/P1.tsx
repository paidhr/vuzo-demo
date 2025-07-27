import { cn } from "@/utils/utils";

/**
 * An optimized P1 component.
 *
 * @param props
 * @returns p
 */
const P1: React.FC<JSX.IntrinsicElements["p"]> = (props) => {
  return (
    <p {...props} className={cn(`font-avenir text-base`, props.className)}>
      {props.children}
    </p>
  );
};

export default P1;
