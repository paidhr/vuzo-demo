import { cn } from "@/utils/utils";
/**
 * An optimized H5 component.
 *
 * @param props
 * @returns h5
 */
const H5: React.FC<JSX.IntrinsicElements["h5"]> = (props) => {
  return (
    <h5 {...props} className={cn(`font-circular text-base`, props.className)}>
      {props.children}
    </h5>
  );
};

export default H5;
