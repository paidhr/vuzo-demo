import { cn } from "@/utils/utils";

/**
 * An optimized H2 component.
 *
 * @param props
 * @returns h2
 */
const H2: React.FC<JSX.IntrinsicElements["h2"]> = (props) => {
  return (
    <h2
      {...props}
      className={cn(`font-circular font-semibold text-xl`, props.className)}
    >
      {props.children}
    </h2>
  );
};

export default H2;
