import SegmentWrapper from "@/components/ui/SegmentWrapper";
import { Button } from "@/components/ui/button";
import DashboardWrapper from "@/components/ui/DashboardWrapper";
import DynamicForm, { FieldConfig } from "@/components/ui/form/form-builder";
import { countries } from "../company/sampleData/countries";
import { Form } from "antd";
import SelectCompany from "../company/component/SelectCompany";
import { useState } from "react";
const CreateWorkplace = () => {
  const [form] = Form.useForm();
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);

  const url = selectedCompany
    ? `/v1/workplaces?company=${selectedCompany}`
    : ``;

  // CREATE WORKDPLACE FIELDS DATA
  const create_workplace_field: FieldConfig[] = [
    {
      name: "country",
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
      name: "business_name",
      label: "Business Name",
      type: "input",
      placeholder: "Enter your business name",
      rules: [{ required: true, message: "Name is required" }],
    },
    {
      name: "line1",
      label: "Address Line 1",
      type: "input",
      placeholder: "Enter your address line 1",
      rules: [{ required: true, message: "Address Line 1 is required" }],
    },
    {
      name: "line2",
      label: "Address Line 2",
      type: "input",
      placeholder: "Enter your address line 2 (optional)",
    },
    {
      name: "city",
      label: "City",
      type: "input",
      placeholder: "Enter your city",
      rules: [{ required: true, message: "City is required" }],
    },
    {
      name: " state",
      label: "State",
      type: "input",
      placeholder: "Enter your state",
      rules: [{ required: true, message: "State is required" }],
    },
    {
      name: "postal_code",
      label: "Postal Code",
      type: "input",
      placeholder: "Enter your postal code",
      rules: [{ required: true, message: "Postal code  is required" }],
    },
    {
      name: "tax_station_code",
      label: "Tax Station Code",
      type: "input",
      placeholder: "Enter your tax station code",
      rules: [{ required: true, message: "Station code is required" }],
    },
    {
      name: "tax_id",
      label: "Tax ID",
      type: "input",
      placeholder: "Enter your tax id",
      rules: [{ required: true, message: "Tax ID is required" }],
    },
    {
      name: "primary",
      label: "Is this Primary Workplace?",
      type: "radio",
      options: [
        { label: "Yes", value: "true" },
        { label: "No", value: "false" },
      ],
      rules: [{ required: true, message: "Primary preference is required" }],
    },
  ];

  return (
    <>
      <DashboardWrapper>
        <SegmentWrapper
          title="Create Workplace"
          subtitle="Create a new workplace to manage your organizational structure."
          footerBtns={
            <div className="flex justify-end w-full gap-3">
              <Button
                variant="secondary"
                // variant="secondary"
              >
                Cancel
              </Button>
              <Button
                // submitting={isPending}
                variant="primary"
                // onClick={() => {
                //   form.submit();
                // }}
              >
                Save
              </Button>
            </div>
          }
        >
          <div className="px-4 md:px-8">
            <DynamicForm form={form} url="" fields={create_workplace_field} />
          </div>
        </SegmentWrapper>
      </DashboardWrapper>
      {!selectedCompany && (
        <SelectCompany
          title="Select company to create a workplaces"
          setSelectedCompany={setSelectedCompany}
        />
      )}
    </>
  );
};

export default CreateWorkplace;
