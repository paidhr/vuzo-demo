import { cn } from "@/utils/utils";
import React from "react";

type props = {
  children?: React.ReactNode;
  maxW?: string;
  centered?: boolean;
  className?: string;
};

const DashboardWrapper: React.FC<props> = ({
  children,
  maxW,
  centered = true,
  className,
}) => {
  return (
    <div
      className={cn(
        "w-full h-full  px-4 md:px-6 lg:px-8 py-5",
        centered && "mx-auto",
        className
      )}
      style={{
        maxWidth: maxW,
      }}
    >
      {children}
    </div>
  );
};

export default DashboardWrapper;
