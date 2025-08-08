import { Button } from "@/components/ui/button";
import DashboardWrapper from "@/components/ui/DashboardWrapper";
import DynamicForm, { FieldConfig } from "@/components/ui/form/form-builder";
import SegmentWrapper from "@/components/ui/SegmentWrapper";
import { axiosPrivateInstance } from "@/lib/axios-config";
import { useMutation } from "@tanstack/react-query";
import { Form } from "antd";

const CreatePayband = () => {
  const [form] = Form.useForm();
  const url = `/v1/companies`;

  const { mutate, isPending } = useMutation({
    mutationFn: async (body: any) => {
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
 const payband_fields: FieldConfig[] = [
  {
    name: "name",
    label: "Payband Name",
    type: "input",
    placeholder: "Enter payband name",
    rules: [{ required: true, message: "Payband name is required" }],
  },
  {
    name: "alias",
    label: "Alias",
    type: "input",
    placeholder: "Enter alias",
  },
  {
    name: "annual_gross",
    label: "Annual Gross",
    type: "input",
    inputType: "number",
    placeholder: "Enter annual gross amount",
    rules: [{ required: true, message: "Annual gross is required" }],
  },
  {
    name: "currency",
    label: "Currency",
    type: "select",
    options: [
      { label: "Naira (NGN)", value: "NGN" },
      { label: "Dollar (USD)", value: "USD" },
      { label: "Pound (GBP)", value: "GBP" },
      { label: "Cedi (GHS)", value: "GHS" },
      { label: "Shilling (KES)", value: "KES" },
    ],
    rules: [{ required: true, message: "Currency is required" }],
    placeholder: "Select currency",
  },
  // {
  //   name: "taxable",
  //   label: "Taxable?",
  //   type: "radio",
  //   options: [
  //     { label: "Yes", value: true },
  //     { label: "No", value: false },
  //   ],
  //   rules: [{ required: true, message: "Please select if taxable" }],
  // },
  // ========== Allowances (Array Field) ==========
  // {
  //   name: "allowances",
  //   label: "Allowances",
  //   type: "array",
  //   itemField: [
  //     {
  //       name: "basis",
  //       label: "Basis",
  //       type: "select",
  //       options: [
  //         { label: "Fixed Amount", value: "fixed_amount" },
  //         { label: "Percentage of Gross Earning", value: "percentage_of_gross_earning" },
  //       ],
  //       rules: [{ required: true, message: "Basis is required" }],
  //     },
  //     {
  //       name: "pay_schedule",
  //       label: "Pay Schedule",
  //       type: "select",
  //       options: [
  //         "weekly", "bi_weekly", "monthly", "bi_monthly",
  //         "quarterly", "tri_annual", "bi_annual", "annual", "anytime",
  //       ].map((val) => ({ label: val.replaceAll("_", " "), value: val })),
  //       rules: [{ required: true, message: "Pay schedule is required" }],
  //     },
  //     {
  //       name: "value",
  //       label: "Value",
  //       type: "input",
  //       inputType: "number",
  //       rules: [{ required: true, message: "Value is required" }],
  //     },
  //     {
  //       name: "pay_period",
  //       label: "Pay Period",
  //       type: "select",
  //       options: [
  //         "first_month", "second_month", "third_month", "fourth_month", "fifth_month", "last_month",
  //         "january", "february", "march", "april", "may", "june",
  //         "july", "august", "september", "october", "november", "december",
  //       ].map((val) => ({ label: val.replaceAll("_", " "), value: val })),
  //       rules: [{ required: true, message: "Pay period is required" }],
  //     },
  //   ],
  // },
  // ========== Tax Configuration ==========
  // {
  //   name: ["tax_config", "is_automated"],
  //   label: "Is Tax Automated?",
  //   type: "radio",
  //   options: [
  //     { label: "Yes", value: true },
  //     { label: "No", value: false },
  //   ],
  //   rules: [{ required: true, message: "Tax automation flag is required" }],
  // },
  {
    name: ["tax_config", "basis"],
    label: "Tax Basis",
    type: "select",
    options: [
      { label: "Fixed Amount", value: "fixed_amount" },
      { label: "Percentage of Gross Earning", value: "percentage_of_gross_earning" },
    ],
    rules: [{ required: true, message: "Tax basis is required" }],
  },
  {
    name: ["tax_config", "value"],
    label: "Tax Value",
    type: "input",
    inputType: "number",
    placeholder: "Enter tax value",
    rules: [{ required: true, message: "Tax value is required" }],
  },
  // ========== Statutory Benefits (Array Field) ==========
  // {
  //   name: "statutory_benefits",
  //   label: "Statutory Benefits",
  //   type: "array",
  //   itemField: [
  //     {
  //       name: "contribution",
  //       label: "Contribution (%)",
  //       type: "input",
  //       inputType: "number",
  //       placeholder: "Enter employer contribution percentage",
  //       rules: [{ required: true, message: "Contribution is required" }],
  //     },
  //     {
  //       name: "deduction",
  //       label: "Deduction (%)",
  //       type: "input",
  //       inputType: "number",
  //       placeholder: "Enter employee deduction percentage",
  //       rules: [{ required: true, message: "Deduction is required" }],
  //     },
  //     {
  //       name: "allowances",
  //       label: "Linked Allowances",
  //       type: "multi-select",
  //       placeholder: "Select applicable allowances",
  //       options: [], // dynamically populate with allowance options if needed
  //     },
  //   ],
  // },
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
              fields={payband_fields}
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

export default CreatePayband;
