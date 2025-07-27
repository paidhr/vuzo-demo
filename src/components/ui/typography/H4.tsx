import { cn } from "@/utils/utils";

/**
 * An optimized H4 component.
 *
 * @param props
 * @returns h4
 */
const H4: React.FC<JSX.IntrinsicElements["h4"]> = (props) => {
  return (
    <h4
      {...props}
      className={cn(`font-circular font-medium text-base`, props.className)}
    >
      {props.children}
    </h4>
  );
};

export default H4;
