import { useNavigate } from "react-router-dom";
import { Form, Input } from "antd";
import useAuthStore from "@/stores/auth/authStore";
import { logos } from "@/assets/logos";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { ILogin } from "@/stores/auth/user.types";
import { useMutation } from "@tanstack/react-query";
import { axiosPrivateInstance } from "@/lib/axios-config";
import { Span1 } from "../ui/typography";
import TextLink from "../ui/typography/LinkText";

interface Values {
  password: string;
  email: string;
}

const Login = () => {
  const { setToken, setIsAuthenticated, setUser, setIntegration } =
    useAuthStore((state) => state);
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { toast } = useToast();

  const { isPending, mutate } = useMutation({
    mutationFn: async (data: IFormData) => {
      const endpoint = "/v1/auth/login";
      const res = await axiosPrivateInstance.post(endpoint, data);
      return res.data;
    },
    onSuccess: (data: ILogin) => {
      if (!data?.data?.integration?.isActive) {
        toast({
          variant: "default",
          title:
            "Your account is currently being reviewed. Please check back later",
        });
        return;
      }
      navigate("/");
      setIsAuthenticated(true);
      setToken(data.data.token);
      setUser(data.data.user);
      setIntegration(data.data.integration);
    },

    onError: (error: any, { email }) => {
      if (error.response.data.message === "Email not verified") {
        resendVerifyEmail(email);
        return;
      }

      toast({
        variant: "destructive",
        title:
          error.response.data.message === "Incorrect password"
            ? "Incorrect email or password"
            : error.response.data.message,
      });
    },
  });

  const { isPending: isResendingVerifyEmail, mutate: resendVerifyEmail } =
    useMutation({
      mutationFn: async (email: string) => {
        const endpoint = `/v1/auth/resend-verification-email?email=${email}`;
        const res = await axiosPrivateInstance.get(endpoint);
        return res.data;
      },
      onSuccess: () => {
        toast({
          variant: "default",
          title:
            "A verification link has been sent to your email. Please check your email to continue.",
        });
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
    <div className="grow px-4 ">
      <div className="flex flex-col items-center gap-3">
        <img src={logos.PadeLogo} alt="Pade Logo" className="" width={120} />
        <p className="font-circular font-medium text-lg text-padeBlack mb-10">
          Vuzo App
        </p>
      </div>

      <div>
        <Form
          name="login"
          layout="vertical"
          form={form}
          onFinish={onFinish}
          autoComplete="off"
          initialValues={{email:"kebbikolanut@yopmail.com", password: "1234%Test"}}
        >
          <div>
            <div className="flex flex-col ">
              <Form.Item
                name="email"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <Input placeholder="Email Address" className="h-10" />
              </Form.Item>

              <Form.Item
                name="password"
                hasFeedback
                rules={[
                  {
                    required: true,
                    message: "Please input your password!",
                  },
                ]}
                className="!mb-2"
              >
                <Input.Password className="h-10" placeholder="Password" />
              </Form.Item>
            </div>
            <div className="flex justify-between my-2">
              <span>{/* Remember me */}</span>
              <TextLink className="text-base" to={"/auth/forgot-password"}>
                Forgot password?
              </TextLink>
            </div>
            <div className="pt-4">
              <Button
                type="submit"
                variant="primary"
                className="w-full "
                disabled={isPending || isResendingVerifyEmail}
                submitting={isPending || isResendingVerifyEmail}
              >
                Log in
              </Button>
            </div>
          </div>
        </Form>
      </div>

      <div className="mt-4 flex gap-2 justify-end">
        <Span1 className="text-neutral400 font-circular flex gap-2 text-base">
          Don't have an account?
          <TextLink className="text-base" to={"/auth/register"}>
            Sign up
          </TextLink>
        </Span1>
      </div>
    </div>
  );
};

export default Login;

interface IFormData {
  email: string;
  password: string;
}
