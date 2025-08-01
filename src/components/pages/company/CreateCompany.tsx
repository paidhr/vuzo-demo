import { Button } from "@/components/ui/button";
import DashboardWrapper from "@/components/ui/DashboardWrapper";
import DynamicForm, {
  type FieldConfig,
} from "@/components/ui/form/form-builder";
import SegmentWrapper from "@/components/ui/SegmentWrapper";
import { Form } from "antd";

const businessType=[
    {label:"Private Limited Company", value: "private_limited_company"},
    {
label: "Public Limited Company", value: "public_limited_company"},
    {label: "Public Unlimited Company", value: "public_unlimited_company"},
    {label: "Sole Proprietorship", value: "sole_proprietorship"},
  ];
  const industry=[
    {label: "Agric Produce", value: "agric_produce"},
    {label: "Betting and Lottery", value: "betting_and_lottery"},
    {label: "Book Stores", value: "book_stores"},
    {label: "Cable, Satellite & PayTV", value: "cable_satellite_paytv"},
    {label: "Clothing and Accessories", value: "clothing_and_accessories"},
    {  label: "Commercial Footwear", value: "commercial_footware"},
    {label: "Credit Lending Companies", value: "credit_lending_companies"},
    {
label: "Cryptocurrency", value: "cryptocurrency"},
    {label: "Department Stores", value: "department_stores"},
    {
label: "Digital Goods & Entertainment", value: "digital_goods_entertainment"},
    {label: "Education", value: "education"},
    {label: "Electronics Stores", value: "electronics_stores"},
    {
label: "Financial Institutions (Fund Manager/Investment)", value: "financial_institutions_fund_manager_investment"},
    {
label: "General Contractors", value: "general_contractors"},
    {label: "General Merchandise Stores", value: "general_merchandise_stores"},
    {label: "Grocery Stores and Supermarkets", value: "grocery_stores_and_supermarkets"},
    {label: "Hospitality (Lodging)", value: "hospitality_lodging"},
    {label: "Insurance", value: "insurance"},
    {label: "Money Transfer", value: "money_transfer"},
    {label: "Non-Financial Institution", value: "non_financial_institution"},
    {label: "Professional Services", value: "professional_services"},
    {
label: "Real Estate & Facility Management", value: "real_estate_facility_management"},
    {label: "Religious Organisations", value: "religious_organisations"},
    {label: "Security Broker Dealer (Custom)", value: "security_broker_dealer_custom"},
    {label: "Security Brokers/Dealers", value: "security_brokers_dealers"},
    {label: "Tax Accounting & Audit", value: "tax_accounting_audit"},
    {label: "Taxicabs", value: "taxicabs"},
    {label: "Telecommunication", value: "telecommunication"},
    {label: "Ticketing & Events", value: "ticketing_events"},
    {label: "Transportation Services", value: "transportation_services"},
    {label: "Travel Airlines", value: "travel_airlines"},
    {label: "Travel Agencies & Tour", value: "travel_agencies_tour"},
    {label: "Utilities (Electric & Gas)", value: "utilities_electric_gas"},
    {
label: "Video Game Arcades & Establishments", value: "video_game_arcades_establishments"
    },
    { label: "Other", value: "other"}
    
  ]
  
    

const fields: FieldConfig[] = [
  {
    name: "business_name",
    label: "Business Name",
    type: "input",
    placeholder: "",
    rules: [{ required: true, message: "Name is required" }],
  },
  {
    name: "legal_name",
    label: "Legal Name",
    type: "input",
    placeholder: "",
    rules: [{ required: true, message: " Legal name is required" }],
  },
  {
    name: "website",
    label: "Website",
    type: "input",
    placeholder: "",
    rules: [{ required: true, message: "Website is required" }],
  },
  {
    name: "email",
    label: "Email",
    type: "input",
    placeholder: "",
    rules: [{ required: true, message: "Email is required" }],
  },
  {
    name: "phone",
    label: "Phone Number",
    type: "input",
    placeholder: "",
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
  },
  {
    name: "industry",
    label: "Industry",
    type: "select",
    options: industry.map((i) => ({
      label: i.label,
      value: i.value,
    })),
    rules: [{ required: true, message: "industry  is required" }],
  },
  {
    name: "rc_number",
    label: "RC Number ",
    type: "input",
    placeholder: "",
    rules: [{ required: true, message: "RC number is required" }],
  },
    {
    name: "rc_date",
    label: "RC Date ",
    type: "date",
    placeholder: "",
    rules: [{ required: true, message: "RC date is required" }],
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
  {
    name: "type",
    label: "Pay type",
    type: "radio",
    options: [
      { label: "Regular", value: "regular" },
      { label: "Special", value: "special" },
    ],
    rules: [{ required: true, message: "Taxable preference is required" }],
  },
];

const CreateCompany = () => {
  const [form] = Form.useForm();

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
              fields={fields}
              onFinish={(values) => {
                console.log("Form Submitted:", values);
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


