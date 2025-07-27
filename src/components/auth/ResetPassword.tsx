import { Form, Input } from "antd";

import { logos } from "@/assets/logos";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { useMutation } from "@tanstack/react-query";
import { axiosPrivateInstance } from "@/lib/axios-config";
import { CheckCircle } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

interface Values {
  password: string;
  cpassword: string;
}

const ResetPassword = () => {
  const [isPasswordSet, setIsPasswordSet] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [form] = Form.useForm();
  const { toast } = useToast();

  const token = searchParams.get("token");

  const { isPending, mutate } = useMutation({
    mutationFn: async (data: IFormData) => {
      const endpoint = "/v1/auth/reset-password";
      const res = await axiosPrivateInstance.post(endpoint, data);
      return res.data;
    },
    onSuccess: () => {
      setIsPasswordSet(true);
    },

    onError: (error: any) => {
      toast({
        variant: "destructive",
        title: error.response.data.message,
      });
    },
  });

  useEffect(() => {
    if (!token) {
      navigate("/auth/login");
    }
  }, [token, navigate]);

  const onFinish = async (values: Values) => {
    mutate({
      token: token,
      password: values.password,
      confirmPassword: values.cpassword,
    } as IFormData);
    form.resetFields();
  };

  return (
    <>
      {isPasswordSet ? (
        <div className=" flex flex-col  items-center justify-center min-h-full">
          <CheckCircle className="text-[#38CB89] aspect-square" size={70} />
          <h2 className="font-circular font-semibold text-padeBlack text-xl mt-4 mb-2 text-center">
            Your password has been reset.
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
              Vuzo App
            </p>
          </div>
          {/* form */}
          <div>
            <Form name="set password" layout="vertical" onFinish={onFinish}>
              <p className="font-avenir font-medium text-base  text-padeSubtext mb-4">
                Set a new password for your account
              </p>
              <Form.Item
                name="password"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                  {
                    pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                    message:
                      "Password must contain at least 8 characters, one uppercase, one lowercase and one number",
                  },
                ]}
              >
                <Input.Password className="h-10" placeholder="Password" />
              </Form.Item>

              <Form.Item
                name="cpassword"
                dependencies={["password"]}
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please confirm your password!",
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue("password") === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(
                        new Error(
                          "The two passwords that you entered do not match!"
                        )
                      );
                    },
                  }),
                ]}
              >
                <Input.Password
                  className="h-10"
                  placeholder="Confirm Password"
                />
              </Form.Item>
              <div className="pt-8">
                <Button
                  type="submit"
                  variant="primary"
                  className="w-full "
                  disabled={isPending}
                  submitting={isPending}
                >
                  Reset Password
                </Button>
              </div>
            </Form>
          </div>
        </div>
      )}
    </>
  );
};

export default ResetPassword;

interface IFormData {
  token: string;
  password: string;
  confirmPassword: string;
}
