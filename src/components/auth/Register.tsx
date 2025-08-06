import { useNavigate } from "react-router-dom";
import { Form, Input, Select } from "antd";
import { logos } from "@/assets/logos";
import { Button } from "../ui/button";
import { useToast } from "../ui/use-toast";
import { useMutation, useQuery } from "@tanstack/react-query";
import { axiosPrivateInstance } from "@/lib/axios-config";
import axios from "axios";
import { Span1 } from "../ui/typography";
import TextLink from "../ui/typography/LinkText";

// v1/misc/countries
const Register = () => {
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { toast } = useToast();

  const { isLoading: isCountriesLoading, data: countries } = useQuery<
    {
      description: string;
      alpha2Code: string;
    }[]
  >({
    queryKey: [`countries`],
    queryFn: async () => {
      const res = await axios.post(
        "https://pademware.azurewebsites.net/commonutils/getcountries",
        {
          q: "",
          page: "",
        }
      );
      return res.data;
    },
  });

  const { isPending, mutate } = useMutation({
    mutationFn: async (data: IFormData) => {
      const endpoint = "/v1/auth/register";
      const res = await axiosPrivateInstance.post(endpoint, data);
      return res.data;
    },
    onSuccess: () => {
      toast({
        variant: "success",
        title:
          "A verification link has been sent to your email. Please check your email to continue.",
      });
      navigate("/auth/login");
    },

    onError: (error: any) => {
      toast({
        variant: "destructive",
        title:
          error.response.data.message === "Incorrect password"
            ? "Incorrect email or password"
            : error.response.data.message,
      });
    },
  });

  const onFinish = async (values: any) => {
    mutate({
      email: values.email,
      password: values.password,
      firstName: values.firstName,
      lastName: values.lastName,
      companyName: values.companyName,
      phoneNumber: values.phoneNumber,
      country: values.country,
      addressLine1: values?.address,
    });
  };

  return (
    <div className="grow px-4 ">
      <div className="flex flex-col items-center gap-4">
        <img src={logos.PadeLogo} alt="Pade Logo" className="" width={120} />
        <p className="font-circular font-medium text-[16px] leading-[20.8px] text-[#5D6B82] mb-[43px]">
          Vuzo Mockup
        </p>
      </div>

      <div>
        <Form
          name="login"
          layout="vertical"
          form={form}
          onFinish={onFinish}
          autoComplete="off"
        >
          <Form.Item
            label={
              <span className="font-circular text-neutral400 text-sm  ">
                Company Name
              </span>
            }
            name={"companyName"}
            rules={[{ required: true, message: "Please enter this field" }]}
          >
            <Input className={" font-circular text-neutral400 h-10"} />
          </Form.Item>

          <div className="flex flex-col lg:flex-row lg:gap-4 ">
            <div className="w-full lg:w-1/2">
              <Form.Item
                label={
                  <span className="font-circular text-neutral400 text-sm  ">
                    First Name
                  </span>
                }
                name={"firstName"}
                rules={[{ required: true, message: "Please enter this field" }]}
              >
                <Input className={" font-circular text-neutral400 h-10"} />
              </Form.Item>
            </div>

            <div className="w-full lg:w-1/2">
              <Form.Item
                label={
                  <span className="font-circular text-neutral400 text-sm  ">
                    Last Name
                  </span>
                }
                name={"lastName"}
                rules={[{ required: true, message: "Please enter this field" }]}
              >
                <Input className={" font-circular text-neutral400 h-10"} />
              </Form.Item>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:gap-4 ">
            <div className="w-full lg:w-1/2">
              <Form.Item
                label={
                  <span className="font-circular text-neutral400 text-sm  ">
                    Email
                  </span>
                }
                name={"email"}
                rules={[{ required: true, message: "Please enter this field" }]}
              >
                <Input
                  className={" font-circular text-neutral400 h-10"}
                  type="email"
                />
              </Form.Item>
            </div>

            <div className="w-full lg:w-1/2">
              <Form.Item
                label={
                  <span className="font-circular text-neutral400 text-sm  ">
                    Phone Number
                  </span>
                }
                name={"phoneNumber"}
                rules={[{ required: true, message: "Please enter this field" }]}
              >
                <Input
                  type="number"
                  className={" font-circular text-neutral400 h-10"}
                />
              </Form.Item>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row lg:gap-4 ">
            <div className="w-full lg:w-1/2">
              <Form.Item
                label={
                  <span className="font-circular text-neutral400 text-sm  ">
                    Country
                  </span>
                }
                name={"country"}
                rules={[{ required: true, message: "Please enter this field" }]}
              >
                <Select
                  rootClassName="min-h-[40px]"
                  showSearch
                  filterOption={(
                    input: string,
                    option?: { label: string; value: string }
                  ) =>
                    (option?.label ?? "")
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                  options={countries?.map((item) => ({
                    label: item.description,
                    value: item.alpha2Code,
                  }))}
                  loading={isCountriesLoading}
                />
              </Form.Item>
            </div>

            <div className="w-full lg:w-1/2">
              <Form.Item
                label={
                  <span className="font-circular text-neutral400 text-sm  ">
                    Address
                  </span>
                }
                name={"address"}
                rules={[{ required: true, message: "Please enter this field" }]}
              >
                <Input className={" font-circular text-neutral400 h-10"} />
              </Form.Item>
            </div>
          </div>

          <Form.Item
            name="password"
            label={
              <span className="font-circular text-neutral400 text-sm  ">
                Password
              </span>
            }
            hasFeedback
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
            className="!mb-2"
          >
            <Input.Password className="h-10" />
          </Form.Item>

          <div className="pt-4">
            <Button
              type="submit"
              variant="primary"
              className="w-full "
              disabled={isPending}
              submitting={isPending}
            >
              Register
            </Button>
          </div>
        </Form>
      </div>

      <div className="mt-4 flex gap-2 justify-end">
        <Span1 className="text-neutral400 font-circular flex gap-2 text-base ">
          Already have an account?
          <TextLink className="text-base" to={"/auth/login"}>
            Log in
          </TextLink>
        </Span1>
      </div>
    </div>
  );
};
export default Register;

interface IFormData {
  email: string;
  firstName: string;
  lastName: string;
  companyName: string;
  phoneNumber: string;
  password: string;
  country: string;
  addressLine1: string;
  addressLine2?: string;
  city?: string;
  state?: string;
  postalCode?: string; //must not exceed 6 characters
  legalName?: string;
  website?: string;
}
