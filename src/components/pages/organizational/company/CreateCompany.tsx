import { Button } from "@/components/ui/button";
import DashboardWrapper from "@/components/ui/DashboardWrapper";
import DynamicForm, { FieldConfig } from "@/components/ui/form/form-builder";
import SegmentWrapper from "@/components/ui/SegmentWrapper";
import { axiosPrivateInstance } from "@/lib/axios-config";
import { useMutation } from "@tanstack/react-query";
import { Form } from "antd";
import { ICompanyPayload } from "./interface";
import { businessType } from "./sampleData/businessType";
import { countries } from "./sampleData/countries";
import { industries } from "./sampleData/industries";

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

  // CREATE COMPANY FIELDS DATA
  const create_company_fields: FieldConfig[] = [
    {
      name: "business_name",
      label: "Business Name",
      type: "input",
      placeholder: "Enter your business name",
      rules: [{ required: true, message: "Name is required" }],
    },
    {
      name: "legal_name",
      label: "Legal Name",
      type: "input",
      placeholder: "Enter your legal name",
      rules: [{ required: true, message: " Legal name is required" }],
    },
    {
      name: "website",
      label: "Website",
      type: "input",
      placeholder: "Enter your website URL",
      rules: [{ required: true, message: "Website is required" }],
    },
    {
      name: "email",
      label: "Email",
      type: "input",
      inputType: "email",
      placeholder: "Enter your email address",
      rules: [{ required: true, message: "Email is required" }],
    },
    {
      name: "phone",
      label: "Phone Number",
      type: "input",
      inputType: "tel",
      placeholder: "Enter your phone number",
      rules: [{ required: true, message: "Phone is required" }],
    },
    {
      name: "business_type",
      label: "Business Type",
      type: "select",
      options: businessType.map((i) => ({
        label: i.label,
        value: i.value,
      })),
      rules: [{ required: true, message: "Business type  is required" }],
      placeholder: "Select your business type",
    },
    {
      name: "industry",
      label: "Industry",
      type: "select",
      options: industries.map((i) => ({
        label: i.label,
        value: i.value,
      })),
      rules: [{ required: true, message: "industry  is required" }],
      placeholder: "Select your industry",
    },
    {
      name: "rc_number",
      label: "RC Number ",
      type: "input",
      inputType: "number",
      placeholder: "Enter your RC number",
      rules: [{ required: true, message: "RC number is required" }],
    },
    {
      name: "rc_date",
      label: "RC Date ",
      type: "date",
      placeholder: "Select RC date",
      rules: [{ required: true, message: "RC date is required" }],
    },
    {
      name: ["address", "country"],
      label: "Country",
      type: "select",
      options: countries.map((i) => ({
        label: i.description,
        value: i.alpha2Code,
      })),
      rules: [{ required: true, message: "Country is required" }],
      placeholder: "Select your country",
    },
    {
      name: ["address", "state"],
      label: "State",
      type: "input",
      placeholder: "Enter your state",
      rules: [{ required: true, message: "State is required" }],
    },
    {
      name: ["address", "city"],
      label: "City",
      type: "input",
      placeholder: "Enter your city",
      rules: [{ required: true, message: "City is required" }],
    },
    {
      name: ["address", "line1"],
      label: "Address Line 1",
      type: "input",
      placeholder: "Enter your address line 1",
      rules: [{ required: true, message: "Address Line 1 is required" }],
    },
    {
      name: ["address", "line2"],
      label: "Address Line 2",
      type: "input",
      placeholder: "Enter your address line 2 (optional)",
    },
    {
      name: ["address", "postal_code"],
      label: "Postal Code",
      type: "input",
      placeholder: "Enter your postal code",
      rules: [{ required: true, message: "Postal code  is required" }],
    },
  ];
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
          <div className="px-4 md:px-8">
            <DynamicForm
              url={url}
              fields={create_company_fields}
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
              
              // initialValues={{
              //   taxable: "yes",
              //   type: "regular",
              // }}
            />
          </div>
        </SegmentWrapper>
      </DashboardWrapper>
    </div>
  );
};

export default CreateCompany;
