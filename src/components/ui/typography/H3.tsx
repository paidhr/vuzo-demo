import { cn } from "@/utils/utils";

/**
 * An optimized H3 component.
 *
 * @param props
 * @returns h3
 */
const H3: React.FC<JSX.IntrinsicElements["h3"]> = (props) => {
  return (
    <h3
      {...props}
      className={cn(`font-circular font-medium text-lg`, props.className)}
    >
      {props.children}
    </h3>
  );
};
export default H3;
