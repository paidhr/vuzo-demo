import { ReactNode } from "react";
import { H2, H5 } from "./typography";
import { cn } from "@/utils/utils";

interface SegmentWrapperProps {
  title?: string | ReactNode;
  rootClassName?: string;
  subtitle?: string | ReactNode;
  contentHeading?: ReactNode;
  footerBtns?: ReactNode;
  actionBtn?: ReactNode;
  children?: ReactNode;
  onHeadingClick?: VoidFunction;
}

const SegmentWrapper = ({
  title,
  subtitle,
  contentHeading,
  rootClassName,
  footerBtns,
  actionBtn,
  onHeadingClick,
  children,
}: SegmentWrapperProps) => {
  return (
    <div
      className={cn(
        "flex flex-col w-full h-full gap-7 bg-white pt-6 lg:pt-[30px] rounded font-avenir ",
        rootClassName
      )}
    >
      {/* ---- Heading ---- */}
      <div
        className="w-full px-4 md:px-6 lg:px-8 xl:px-[60px]"
        onClick={() => onHeadingClick?.()}
      >
        <div className="flex justify-between gap-4 lg:gap-8">
          <div className="max-w-[780px]">
            <H2 className="font-bold text-neutral700">{title}</H2>
            {subtitle && (
              <div className="mt-2 text-neutral500 text-sm font-avenir">
                {subtitle}
              </div>
            )}
          </div>
          <div className="shrink-0">{actionBtn}</div>
        </div>
      </div>

      {/* ---- Body ---- */}
      <div
        className={`w-full h-full pt-6 pb-6 rounded-lg border-t border-neutral40 transition-all ease-in-out duration-100`}
      >
        {contentHeading && (
          <div className="px-4 md:px-6 lg:px-8 xl:px-[60px]">
            <div className=" font-avenir font-semibold text-neutral500 mb-4 ">
              {contentHeading}
            </div>
          </div>
        )}

        <div className=" w-full ">
          {children}
          {footerBtns && (
            <div className="w-full pt-4 mt-2 border-t px-4 md:px-6 xl:px-[60px]">
              {footerBtns}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
export const ResponsiveSegmentWrapper = ({
  title,
  subtitle,
  contentHeading,
  rootClassName,
  actionBtn,
  children,
}: SegmentWrapperProps) => {
  return (
    <div
      className={
        "flex flex-col w-full h-full gap-7 bg-white pt-6 lg:pt-[30px] rounded-lg border font-avenir " +
        rootClassName
      }
    >
      {/* ---- Heading ---- */}

      <div className="flex flex-col justify-between gap-2 w-full">
        <div className="w-full grid grid-cols-[auto,.6fr] justify-between gap-2 px-4">
          <H5 className="font-bold text-neutral500 font-avenir px-2">
            {title}
          </H5>
          <div className="w-full flex justify-end">
            {actionBtn && actionBtn}
          </div>
        </div>
        {subtitle && (
          <div className="mt-2 text-neutral500 text-sm font-avenir px-4 lg:w-[85%] sm:w-full">
            {subtitle}
          </div>
        )}
      </div>

      {/* ---- Body ---- */}
      <div
        className={`w-full h-full pt-6 pb-12 container rounded-lg border-t transition-all ease-in-out duration-100`}
      >
        {contentHeading && (
          <div className="px-4 md:px-6 lg:px-8 xl:px-[60px]">
            <div className="text-[16px] leading-[24px] font-avenir font-semibold text-neutral500 mb-4 ">
              {contentHeading}
            </div>
          </div>
        )}

        <div className=" w-full ">{children}</div>
      </div>
    </div>
  );
};

export default SegmentWrapper;
