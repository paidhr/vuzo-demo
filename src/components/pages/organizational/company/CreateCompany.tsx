import { Button } from "@/components/ui/button";
import DashboardWrapper from "@/components/ui/DashboardWrapper";
import DynamicForm from "@/components/ui/form/form-builder";
import SegmentWrapper from "@/components/ui/SegmentWrapper";
import { axiosPrivateInstance } from "@/lib/axios-config";
import { useMutation } from "@tanstack/react-query";
import { Form } from "antd";
import { ICompanyPayload } from "./interface";
import { create_employee_field } from "@/data/data";

const CreateCompany = () => {
  const [form] = Form.useForm();
  const url = `/v1/companies`;

  const { mutate, isPending } = useMutation({
    mutationFn: async (body: ICompanyPayload) => {
      const res = await axiosPrivateInstance.post(url, body);
      return res.data;
    },
    onSuccess: (data: any) => {
      //   toast({
      //     variant:""
      //     title:
      //       error.response.data.message === "Incorrect password"
      //         ? "Incorrect email or password"
      //         : error.response.data.message,
      //   });
    },

    onError: (error: any) => {
      //   toast({
      //     variant: "destructive",
      //     title:
      //       error.response.data.message === "Incorrect password"
      //         ? "Incorrect email or password"
      //         : error.response.data.message,
      //   });
    },
  });
  return (
    <div>
      <DashboardWrapper>
        <SegmentWrapper
          title="Create Company"
          subtitle="Add a new company to your organization to manage its employees and payroll structure."
          footerBtns={
            <div className="flex justify-end w-full gap-3">
              <Button variant="secondary">Cancel</Button>
              <Button
                submitting={isPending}
                variant="primary"
                onClick={() => {
                  form.submit();
                }}
              >
                Save
              </Button>
            </div>
          }
        >
          <div className="px-4 md:px-6 xl:px-[60px]">
            <DynamicForm
              url={url}
              fields={create_employee_field}
              onFinish={(values) => {
                console.log("Form Submitted:", values);
                const formattedValues = {
                  ...values,
                  rc_date: values.rc_date?.format("YYYY-MM-DD"),
                };

                console.log("Formatted Payload:", formattedValues);
                mutate(formattedValues);
              }}
              form={form}
              showDebugPanel
              initialValues={{
                taxable: "yes",
                type: "regular",
              }}
            />
          </div>
        </SegmentWrapper>
      </DashboardWrapper>
    </div>
  );
};

export default CreateCompany;
