import { Form, FormProps } from "antd";
import { ReactNode } from "react";
import { ChevronDown } from "lucide-react";
import { H2 } from "../typography";
import { cn } from "@/utils/utils";

interface FormSectionWrapperProps extends FormProps {
  title?: string;
  subtitle?: string | ReactNode;
  formHeading?: ReactNode;
  isActive: boolean;
  showDropdown?: boolean;
  footerBtns?: ReactNode;
  children?: ReactNode;
  onDropDown?: () => void;
  rootClassName?: string;
}

const FormSectionWrapper = ({
  title,
  subtitle,
  formHeading,
  isActive,
  footerBtns,
  showDropdown = false,
  onDropDown,
  children,
  rootClassName,
  ...formProps
}: FormSectionWrapperProps) => {
  return (
    <div
      className={cn(
        "flex flex-col w-full gap-7 bg-white pt-6 lg:pt-[30px] border rounded-lg shadow-sm",
        rootClassName
      )}
    >
      {/* Introduction */}
      <div className="w-full flex justify-between gap-4 px-4 md:px-6 lg:px-8 xl:px-[60px]">
        <div className="grow">
          <H2 className="font-bold text-neutral500">{title}</H2>
          {subtitle && (
            <div className="mt-2 text-neutral700 text-sm font-circular max-w-[900px]">
              {subtitle}
            </div>
          )}
        </div>
        {showDropdown ? (
          <div
            className="shrink-0 border border-neutral50 rounded-full h-7 w-7 flex justify-center items-center"
            role="button"
            onClick={() => onDropDown?.()}
          >
            <ChevronDown
              className={`ease-in-out transition-all w-4 text-neutral700 ${
                isActive && "rotate-180"
              }`}
            />
          </div>
        ) : null}
      </div>
      <div
        className={`w-full ${
          isActive ? " h-full py-6 pb-2" : "h-0 overflow-y-hidden"
        }  border-t transition-all ease-in-out duration-100`}
      >
        {formHeading && (
          <div className="w-full px-4 md:px-6 xl:px-[60px]">
            <div className=" text-[16px] leading-[24px] font-circular text-neutral500 font-medium mb-4 ">
              {formHeading}
            </div>
          </div>
        )}
        <div className=" w-full ">
          <Form {...formProps}>
            {children}
            <div className="w-full py-2 mt-2 border-t px-4 md:px-6 xl:px-[60px]">
              {footerBtns}
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default FormSectionWrapper;
