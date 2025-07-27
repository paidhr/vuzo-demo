import { cn } from "@/utils/utils";

/**
 * An optimized H1 component.
 *
 * @param props
 * @returns h1
 */
const H1: React.FC<JSX.IntrinsicElements["h1"]> = (props) => {
  return (
    <h1
      {...props}
      className={cn(`font-circular font-semibold text-2xl`, props.className)}
    >
      {props.children}
    </h1>
  );
};

export default H1;
