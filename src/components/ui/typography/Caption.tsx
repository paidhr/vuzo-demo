import { cn } from "@/utils/utils";

/**
 * An optimized caption component.
 *
 * @param props
 * @returns p
 */
const Caption: React.FC<JSX.IntrinsicElements["p"]> = (props) => {
  return (
    <p {...props} className={cn("font-avenir", props.className)}>
      {props.children}
    </p>
  );
};

export default Caption;
