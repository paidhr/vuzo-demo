import { Button } from "@/components/ui/button";
import DashboardWrapper from "@/components/ui/DashboardWrapper";
import DynamicForm, { FieldConfig } from "@/components/ui/form/form-builder";
import SegmentWrapper from "@/components/ui/SegmentWrapper";
import { currencies } from "@/utils/currencies";
import { Collapse, Form } from "antd";
import type { CollapseProps } from "antd";
import { FC } from "react";

const items: CollapseProps["items"] = [
  {
    key: "1",
    label: "Paygrade",
    children: <p>mm,</p>,
  },
  {
    key: "2",
    label: "Allowances",
    children: <p>mm,</p>,
  },
  {
    key: "3",
    label: "Tax Configuration",
    children: <p>mm,</p>,
  },
];

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
    rules: [{ required: true, message: "Taxable preference is required" }],
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
];

const CreatePaygrade: FC = () => {
  const [form] = Form.useForm();
  return (
    <DashboardWrapper>
      <div className="flex flex-col gap-10">
        <SegmentWrapper
          title="Paygrade"
          subtitle=""
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
          <div className="px-4 md:px-6 xl:px-[60px]">
            <Collapse items={items} defaultActiveKey={["1"]} />;
            <DynamicForm
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
