import { Button } from "@/components/ui/button";
import DashboardWrapper from "@/components/ui/DashboardWrapper";
import DynamicForm, { FieldConfig } from "@/components/ui/form/form-builder";
import SegmentWrapper from "@/components/ui/SegmentWrapper";
import { axiosPrivateInstance } from "@/lib/axios-config";
import { currencies } from "@/utils/currencies";
import { useMutation } from "@tanstack/react-query";
import { Collapse, Form } from "antd";
import type { CollapseProps } from "antd";
import { FC } from "react";
import { IPayGradePayload } from "./interface";


const PaygradeFieldConfig: FieldConfig[] = [
  {
    name: "name",
    label: "Name",
    type: "input",
    placeholder: "",
    rules: [{ required: true, message: "Name is required" }],
  },
  {
    name: "alias",
    label: "Description",
    type: "input",
    placeholder: "",
  },
  {
    name: "annual_gross",
    label: "Annual Gross",
    type: "input",
    inputType: "number",
    placeholder: "",
    rules: [{ required: true, message: "Annual Gross is required" }],
  },
  {
    name: "currency",
    label: "Currency",
    type: "select",
    options: currencies.map((i) => ({
      label: i.description,
      value: i.code,
    })),
    rules: [{ required: true, message: "Currency is required" }],
    placeholder: "Select a currency",
  },
  {
    name: "taxable",
    label: "Is this allowance taxable?",
    type: "radio",
    options: [
      { label: "Yes", value: "true" },
      { label: "No", value: "false" },
    ],
    rules: [{ required: true, message: "Taxable preference is required" }],
  },

  // Tax config fields (nested: tax_config)
  {
    name: ["tax_config", "is_automated"],
    label: "Automate Tax?",
    type: "radio",
    options: [
      { label: "Yes", value: "true" },
      { label: "No", value: "false" },
    ],
    rules: [{ required: true, message: "Tax automation preference is required" }],
  },
  {
    name: ["tax_config", "basis"],
    label: "Tax Basis",
    type: "select",
    options: [
      { label: "Fixed Amount", value: "fixed_amount" },
      { label: "Percentage of Gross Earning", value: "percentage_of_gross_earning" },
    ],
    rules: [{ required: true, message: "Tax basis is required" }],
    placeholder: "Select basis",
  },
  {
    name: ["tax_config", "value"],
    label: "Tax Value",
    type: "input",
    inputType: "number",
    placeholder: "Enter tax amount or percentage",
    rules: [{ required: true, message: "Tax value is required" }],
  },

  // You can render these separately with a custom repeater-style form group:
  // Allowances
  // {
  //   name: "allowances",
  //   type: "custom", // e.g. you can build a repeater list that maps to the Allowance interface
  // }

  // Statutory Benefits
  // {
  //   name: "statutory_benefits",
  //   type: "custom",
  // }

];

const CreatePaygrade: FC = () => {
  const [form] = Form.useForm();
    const url=`v1/paygrades/:company`;

 const { mutate, isPending } = useMutation({
    mutationFn: async (body: IPayGradePayload) => {
      const res = await axiosPrivateInstance.post(
        url,
        body
      );
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
    <DashboardWrapper>
      <div className="flex flex-col gap-10">
        <SegmentWrapper
          title="Create Paygrade"
          subtitle="Add a new paygrade to your organization to manage its employees and payroll structure."
          footerBtns={
            <div className="flex justify-end w-full gap-3">
              <Button variant="secondary">Cancel</Button>
              <Button
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
          <div className="px-4 md:px-8  ">
           
            <DynamicForm
            url={url}
              title="Create Paygrade"
              fields={PaygradeFieldConfig}
              onFinish={(values) => {
                console.log("Form Submitted:", values);
              }}
              form={form}
              showDebugPanel
              initialValues={
                {
                  // taxable: "yes",
                  // type: "regular",
                }
              }
            />
          </div>
        </SegmentWrapper>
      </div>
    </DashboardWrapper>
  );
};

export default CreatePaygrade;

// {
//   "name": "{{$randomProductName}}",
//   "alias": "{{$randomBsBuzz}}",
//   "annual_gross": 12000,
//   "currency": "NGN",
//   "taxable": false,
//   "allowances": [
//     {
//       "id": "c290e771-b22b-4ca9-b32e-21ab671557514",
//       "basis": "percentage_of_gross_earning", //percentage_of_gross_earning, fixed_amount
//       "pay_schedule": "weekly", //weekly, bi_weekly, monthly, bi_monthly, quarterly, tri_annual, bi_annual, annual, anytime
//       "value": 2000,
//       "pay_period": "first_month" //first_month, second_month, third_month, fourth_month, fifth_month, last_month, january, february, march, april, may, june, july, august, september, october, november, december
//     }

//   ],
//   "tax_config": {
//     "is_automated": true,
//     "basis": "fixed_amount", // percentage_of_gross_earning | fixed_amount
//     "value": 100
//   },
//   "statutory_benefits": [
//     {
//       "id": "{{$randomUUID}}",
//       "allowances": [
//         {
//           "id": "c290e771-b22b-4ca9-b32e-21ab671557514"
//         }
//       ],
//       "contribution": 20,
//       "deduction": 15
//     }
//   ]
// }
