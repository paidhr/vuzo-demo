import React from "react";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { H4, P1 } from "../ui/typography";

const UnauthourizedPage: React.FC = () => {
  const navigate = useNavigate();
  return (
    <div className="h-full w-full flex justify-center items-center">
      <div className="w-[466px] flex flex-col items-center gap-3">
        <div className="w-full bg-white py-[42px] px-[42px] flex flex-col justify-center items-center gap-9">
          <div className="text-center">
            <H4 className="font-semibold text-danger500">
              <code>Unauthorized</code>
            </H4>
            <P1 className="text-center text-neutral600">
              You're not authorized to view this page.
            </P1>
          </div>

          <div className="w-full flex justify-center">
            <Button
              onClick={() => navigate("/employee/dashboard")}
              color="primary"
            >
              Return to dashboard
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UnauthourizedPage;
