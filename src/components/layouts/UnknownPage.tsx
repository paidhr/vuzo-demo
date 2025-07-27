import React from "react";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { H4, P1 } from "../ui/typography";

export const UnknownPage: React.FC = () => {
  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="w-[466px] flex flex-col items-center gap-3">
        <div className="w-full bg-white py-[42px] px-[42px] flex flex-col justify-center items-center gap-9">
          <div className="text-center">
            <H4 className="font-semibold text-danger500">
              <code>404 error</code>
            </H4>
            <P1 className="text-center text-neutral600">
              You've reached a page that doesn't exist!.
            </P1>
          </div>

          <div className="w-full flex justify-center">
            <Button variant={"primary"} asChild>
              <Link to="/">Go back home</Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
