import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { axiosPrivateInstance } from "@/lib/axios-config";
import { CheckCircle, Info } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const VerifyAccount = () => {
  const [isAccountVerified, setIsAccountVerified] = useState(false);

  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const { toast } = useToast();

  const token = searchParams.get("token");

  const { isPending, data, error } = useQuery<IData>({
    queryKey: ["verify-account"],
    queryFn: async () => {
      const endpoint = `/v1/auth/verify-email/${token}`;
      const res = await axiosPrivateInstance.get(endpoint);
      return res.data;
    },
    enabled: !!token,
  });

  // @ts-expect-error expected
  const errorMsg = error?.response?.data?.message || "";

  useEffect(() => {
    if (!token) {
      navigate("/auth/login");
    }
  }, [token, navigate]);

  useEffect(() => {
    if (data?.success) {
      setIsAccountVerified(true);
    } else if (error) {
      setIsAccountVerified(false);
      toast({
        variant: "destructive",
        // @ts-expect-error expected
        title: error.response.data.message,
      });
    }
  }, [data, error]);

  if (isPending) {
    return (
      <div className=" flex flex-col  items-center justify-center min-h-full">
        <Info
          className="text-yellow-500 aspect-square animate-pulse"
          size={70}
        />
        <h2 className="font-circular font-semibold text-padeBlack text-xl mt-4 mb-2 text-center">
          Verifying your account...
        </h2>
      </div>
    );
  }

  return (
    <>
      {isAccountVerified ? (
        <div className=" flex flex-col  items-center justify-center min-h-full">
          <CheckCircle className="text-[#38CB89] aspect-square" size={70} />
          <h2 className="font-circular font-semibold text-padeBlack text-xl mt-4 mb-2 text-center">
            Your account has been verified
          </h2>

          <div className="mt-8 w-full">
            <Button
              variant="primary"
              className="w-full"
              onClick={() => {
                navigate("/auth/login");
              }}
            >
              Sign in
            </Button>
          </div>
        </div>
      ) : errorMsg ? (
        <div className=" flex flex-col  items-center justify-center min-h-full">
          <Info className="text-[#FF4D4F] aspect-square" size={70} />
          <h2 className="font-circular font-semibold text-padeBlack text-xl mt-4 mb-2 text-center">
            Your account could not be verified
          </h2>
          <p className="font-avenir font-medium text-base  text-padeSubtext mb-4 text-center">
            {errorMsg}
          </p>
        </div>
      ) : (
        <></>
      )}
    </>
  );
};

export default VerifyAccount;

interface IData {
  success: boolean;
  code: number;
  message: string;
  data: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;
    emailVerified: boolean;
    status: string;
    createdAt: string;
    updatedAt: string;
    __v: number;
    emailVerificationToken: string;
    emailVerificationTokenExpiresAt: string;
    integration: string;
  };
}
