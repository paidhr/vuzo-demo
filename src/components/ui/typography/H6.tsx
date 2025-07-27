import { cn } from "@/utils/utils";

/**
 * An optimized H6 component.
 *
 * @param props
 * @returns h6
 */
const H6: React.FC<JSX.IntrinsicElements["h6"]> = (props) => {
  return (
    <h6 {...props} className={cn(`font-circular text-base`, props.className)}>
      {props.children}
    </h6>
  );
};

export default H6;
