import { Form, Input } from "antd";

import { logos } from "@/assets/logos";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { axiosPrivateInstance } from "@/lib/axios-config";
import { CheckCircle } from "lucide-react";
import { useState } from "react";

interface Values {
  email: string;
}

const ForgotPassword = () => {
  const [isResetLinkSent, setIsResetLinkSent] = useState(false);

  // const navigate = useNavigate();
  const [form] = Form.useForm();
  const { toast } = useToast();

  const { isPending, mutate, data } = useMutation({
    mutationFn: async (data: IFormData) => {
      const endpoint = "/v1/auth/forgot-password";
      const res = await axiosPrivateInstance.post(endpoint, data);
      return res.data;
    },
    onSuccess: () => {
      setIsResetLinkSent(true);
    },

    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: error.response.data.message,
      });
    },
  });

  const onFinish = async (values: Values) => {
    mutate(values);
  };

  return (
    <>
      {isResetLinkSent ? (
        <div className=" flex flex-col  items-center justify-center min-h-full">
          <CheckCircle className="text-[#38CB89] aspect-square" size={70} />
          <h2 className="font-circular font-semibold text-padeBlack text-xl mt-4 mb-2 text-center">
            Password reset link sent
          </h2>
          <p className="font-avenir font-medium text-base  text-padeSubtext mb-4 text-center">
            {data?.message ||
              "A password reset link has been sent to your email"}
            . Please check your email to continue. The link will expire shortly.
          </p>
        </div>
      ) : (
        <div className="grow px-4 ">
          <div className="flex flex-col items-center gap-3">
            <img
              src={logos.PadeLogo}
              alt="Pade Logo"
              className=""
              width={120}
            />
            <p className="font-circular font-medium text-lg text-padeBlack mb-10">
              Vuzo Mockup
            </p>
          </div>
          {/* form */}
          <div>
            <Form
              name="forgot-password"
              layout="vertical"
              form={form}
              onFinish={onFinish}
              autoComplete="off"
            >
              <div>
                <div className="flex flex-col ">
                  <p className="font-avenir font-medium text-base  text-padeSubtext mb-4">
                    Please enter the email address associated with your account
                    and we’ll send you a reset link.
                  </p>
                  <Form.Item
                    name="email"
                    rules={[
                      { required: true, message: "Please input your email!" },
                    ]}
                  >
                    <Input
                      placeholder="Email Address"
                      className="h-10"
                      type="email"
                    />
                  </Form.Item>
                </div>
                <div className="pt-4">
                  <Button
                    type="submit"
                    variant="primary"
                    className="w-full "
                    disabled={isPending}
                    submitting={isPending}
                  >
                    Send Reset Link
                  </Button>
                </div>
              </div>
            </Form>
          </div>
        </div>
      )}
    </>
  );
};

export default ForgotPassword;

interface IFormData {
  email: string;
}
