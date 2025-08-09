import DashboardWrapper from "@/components/ui/DashboardWrapper";
import DynamicForm, { FieldConfig } from "@/components/ui/form/form-builder";
import SegmentWrapper from "@/components/ui/SegmentWrapper";
import { Button } from "@/components/ui/button";
import { countries } from "../company/sampleData/countries";
import { Form } from "antd";
import SelectCompany from "../company/component/SelectCompany";
import { useState } from "react";

const CreateEmployee = () => {
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);

  const url = selectedCompany ? `/v1/employees?company=${selectedCompany}` : ``;
  const [form] = Form.useForm();
  const create_employee_field: FieldConfig[] = [
    {
      name: "first_name",
      label: "First Name",
      type: "input",
      placeholder: "Enter first name",
      rules: [{ required: true, message: "First name is required" }],
    },
    {
      name: "last_name",
      label: "Last Name",
      type: "input",
      placeholder: "Enter last name",
      rules: [{ required: true, message: "Last name is required" }],
    },
    {
      name: "start_date",
      label: "Start Date ",
      type: "date",
      placeholder: "Select Start date",
      rules: [{ required: true, message: "Start date is required" }],
    },
    {
      name: "middle_name",
      label: "Middle Name",
      type: "input",
      placeholder: "Enter middle name",
      rules: [{ required: true, message: "Middle name is required" }],
    },
    {
      name: "termination_date",
      label: "Termination Date ",
      type: "date",
      placeholder: "Select Termination date",
      rules: [{ required: true, message: "Termination date is required" }],
    },
    {
      name: "identification_number",
      label: "Identification Number",
      type: "input",
      placeholder: "Enter your identification number",
      rules: [{ required: true, message: "Identification number is required" }],
    },
    {
      name: "department",
      label: "Department",
      type: "input",
      placeholder: "Enter your department",
      rules: [{ required: true, message: "Department is required" }],
    },
    {
      name: "manager",
      label: "Manager",
      type: "input",
      placeholder: "Enter your manager's name",
      rules: [{ required: true, message: "Manager's name is required" }],
    },
    {
      name: "workplace",
      label: "Workplace",
      type: "input",
      placeholder: "Enter your workplace",
      rules: [{ required: true, message: "Workplace is required" }],
    },
    {
      name: "email",
      label: "Email",
      type: "input",
      inputType: "email",
      placeholder: "Enter email address",
      rules: [{ required: true, message: "Email is required" }],
    },
    {
      name: "phone_number",
      label: "Phone Number",
      type: "input",
      inputType: "tel",
      placeholder: "Enter phone number",
    },
    {
      name: "job_title",
      label: "Job Title",
      type: "input",
      placeholder: "Enter your job title",
      rules: [{ required: true, message: "Job title is required" }],
    },
    {
      name: "marital_status",
      label: "Marital Status",
      type: "input",
      placeholder: "Enter your marital status",
      rules: [{ required: true, message: "Marital Status is required" }],
    },
    {
      name: "paygrade",
      label: "Pay Grade",
      type: "input",
      placeholder: "Enter your pay grade",
      rules: [{ required: true, message: "Paygrade is required" }],
    },
    {
      name: "gender",
      label: "Gender",
      type: "input",
      placeholder: "Enter your Gender",
      rules: [{ required: true, message: "Gender is required" }],
    },
    {
      name: "tin",
      label: "Tax Identification Number (TIN)",
      type: "input",
      placeholder: "Enter your Tax Identification Number",
      rules: [{ required: true, message: "Tax Identification is required" }],
    },
    {
      name: "dob",
      label: "Date of Birth",
      type: "date",
      placeholder: "Select Date of Birth",
      rules: [{ required: true, message: "Date of birth is required" }],
    },
    {
      name: ["bank_account", "account_number"],
      label: "Account Number",
      type: "input",
      placeholder: "Enter your account number",
      rules: [{ required: true, message: "Account Number is required" }],
    },
    {
      name: ["bank_account", "beneficiary_type"],
      label: "Beneficiary Type",
      type: "input",
      placeholder: "Enter your Beneficiary Type",
      rules: [{ required: true, message: "Beneficiary Type is required" }],
    },
    {
      name: ["bank_account", "is_domestic"],
      label: "Is Domestic",
      type: "radio",
      options: [
        { label: "Yes", value: "true" },
        { label: "No", value: "false" },
      ],
      rules: [{ required: true, message: "Domestic preference is required" }],
    },
    {
      name: ["bank_account", "bank_code"],
      label: "Bank Code",
      type: "input",
      placeholder: "Enter your Bank Code",
      rules: [{ required: true, message: "Bank code is required" }],
    },
    {
      name: ["bank_account", "routing_type"],
      label: "Routing Type",
      type: "input",
      placeholder: "Enter your Routing type",
      rules: [{ required: true, message: "Routing type is required" }],
    },
    {
      name: ["bank_account", "routing_code"],
      label: "Routing Code",
      type: "input",
      placeholder: "Enter your Routing code",
      rules: [{ required: true, message: "Routing code is required" }],
    },
    {
      name: ["bank_account", "account_country"],
      label: "Account Country",
      type: "input",
      placeholder: "Enter your Account country",
      rules: [{ required: true, message: "Account country is required" }],
    },
    {
      name: ["bank_account", "account_first_name"],
      label: "Account First Name",
      type: "input",
      placeholder: "Enter your Account First Name",
      rules: [{ required: true, message: "Account first name is required" }],
    },
    {
      name: ["bank_account", "account_last_name"],
      label: "Account Last Name",
      type: "input",
      placeholder: "Enter your Account Last Name",
      rules: [{ required: true, message: "Account last name is required" }],
    },
    {
      name: ["bank_account", "account_company_name"],
      label: "Account Company Name",
      type: "input",
      placeholder: "Enter your Account Company Name",
      rules: [{ required: true, message: "Account company name is required" }],
    },
    {
      name: ["residence", "country"],
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
      name: ["residence", "line1"],
      label: "Address Line 1",
      type: "input",
      placeholder: "Enter your address line 1",
      rules: [{ required: true, message: "Address Line 1 is required" }],
    },
    {
      name: ["residence", "line2"],
      label: "Address Line 2",
      type: "input",
      placeholder: "Enter your address line 2 (optional)",
    },
    {
      name: ["residence", "city"],
      label: "City",
      type: "input",
      placeholder: "Enter your city",
      rules: [{ required: true, message: "City is required" }],
    },
    {
      name: ["residence", "state"],
      label: "State",
      type: "input",
      placeholder: "Enter your state",
      rules: [{ required: true, message: "State is required" }],
    },
    {
      name: ["residence", "postal_code"],
      label: "Postal Code",
      type: "input",
      placeholder: "Enter your postal code",
      rules: [{ required: true, message: "Postal code  is required" }],
    },
    {
      name: ["pfa", "pfa_code"],
      label: "Pension Fund Administrator Code (PFA)",
      type: "input",
      placeholder: "Enter your Pension Fund Administrator code",
      rules: [
        {
          required: true,
          message: "Pension fund administrator code  is required",
        },
      ],
    },
    {
      name: ["pfa", "rsa_pin"],
      label: "Retirement Savings Account (RSA)",
      type: "input",
      placeholder: "Enter your Retirement savings account",
      rules: [
        {
          required: true,
          message: "Retirement savings account  is required",
        },
      ],
    },
    {
      name: ["pfa", "effective_date"],
      label: "Effective Date",
      type: "date",
      placeholder: "Select Effective Date",
      rules: [{ required: true, message: "Effective date is required" }],
    },
    {
      name: ["emergency_contact", "name"],
      label: "Emergency Name",
      type: "input",
      placeholder: "Enter your Emergency Name",
      rules: [
        {
          required: true,
          message: "Emergency name  is required",
        },
      ],
    },
    {
      name: ["emergency_contact", "email"],
      label: "Emergency Email",
      type: "input",
      inputType: "email",
      placeholder: "Enter Emergency email address",
      rules: [{ required: true, message: "Email is required" }],
    },
    {
      name: ["emergency_contact", "email"],
      label: "Phone Number",
      type: "input",
      inputType: "tel",
      placeholder: "Enter your phone number",
      rules: [{ required: true, message: "Phone is required" }],
    },
    {
      name: ["emergency_contact", "relationship"],
      label: "Relationship",
      type: "input",
      inputType: "text",
      placeholder: "Enter your Relationship",
      rules: [{ required: true, message: "Relationship is required" }],
    },
  ];

  return (
    <>
      <DashboardWrapper>
        <SegmentWrapper
          title="Create Employee"
          subtitle="Fill in the details to create a new employee profile."
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
            <DynamicForm
              form={form}
              url=""
              fields={create_employee_field}
              showDebugPanel
            />
          </div>
        </SegmentWrapper>
      </DashboardWrapper>
      {!selectedCompany && (
        <SelectCompany
          title="Select company to create a employees"
          setSelectedCompany={setSelectedCompany}
        />
      )}
    </>
  );
};

export default CreateEmployee;
