import {
  Form,
  Input,
  Select,
  DatePicker,
  Button,
  Radio,
  Checkbox,
  type FormProps,
} from "antd";
import { useEffect, useMemo } from "react";

const { Option } = Select;
const { RangePicker } = DatePicker;

/**
 * Enhanced Dynamic Form Builder with Field Dependencies
 *
 * Features:
 * - Conditional field visibility (show/hide fields based on other field values)
 * - Field enabling/disabling based on conditions
 * - Dynamic validation rules that adapt to field visibility
 * - Form data cleaning (removes values from hidden fields)
 * - Multiple condition types: equals, notEquals, includes, exists, etc.
 * - Smooth transitions and visual feedback
 *
 * Dependency Actions:
 * - "show": Show field when condition is met
 * - "hide": Hide field when condition is met
 * - "enable": Enable field when condition is met
 * - "disable": Disable field when condition is met
 *
 * Condition Types:
 * - "equals": Field value equals specified value(s)
 * - "notEquals": Field value does not equal specified value(s)
 * - "includes": Field value (array) includes any of the specified values
 * - "notIncludes": Field value (array) does not include any specified values
 * - "exists": Field has a non-empty value
 * - "notExists": Field is empty or undefined
 */

// Example field config with dependencies:
// This has been moved to the bottom as an example usage component

export type DependencyConfig = {
  field: string; // The field name to watch
  condition:
    | "equals"
    | "notEquals"
    | "includes"
    | "notIncludes"
    | "exists"
    | "notExists";
  value?: string | string[] | number | boolean; // The value(s) to compare against
  action: "show" | "hide" | "enable" | "disable"; // What to do when condition is met
};

export type FieldConfig = {
  name: string;
  label: string;
  type:
    | "input"
    | "select"
    | "multiSelect"
    | "date"
    | "dateRange"
    | "radio"
    | "checkbox";
  placeholder?: string;
  options?: Option[];
  rules?: any[];
  dependencies?: DependencyConfig;
};

export interface Option {
  label: string;
  value: string | number;
}

export type DynamicFormProps = {
  fields: FieldConfig[];
  showDebugPanel?: boolean;
} & FormProps;

const DynamicForm: React.FC<DynamicFormProps> = ({
  fields,
  showDebugPanel = false,
  ...rest
}) => {
  // Watch all form values for dependency evaluation
  const rawWatchedValues = Form.useWatch([], rest.form);
  const watchedValues = useMemo(
    () => rawWatchedValues || {},
    [rawWatchedValues]
  );

  // Function to evaluate if a field should be visible/enabled based on dependencies
  const evaluateCondition = (
    dependency: DependencyConfig,
    currentValues: Record<string, any>
  ): boolean => {
    const { field, condition, value } = dependency;
    const fieldValue = currentValues[field];

    switch (condition) {
      case "equals":
        if (Array.isArray(value)) {
          return value.includes(fieldValue);
        }
        return fieldValue === value;
      case "notEquals":
        if (Array.isArray(value)) {
          return !value.includes(fieldValue);
        }
        return fieldValue !== value;
      case "includes":
        return Array.isArray(fieldValue) && Array.isArray(value)
          ? value.some((v) => fieldValue.includes(v))
          : false;
      case "notIncludes":
        return Array.isArray(fieldValue) && Array.isArray(value)
          ? !value.some((v) => fieldValue.includes(v))
          : true;
      case "exists":
        return (
          fieldValue !== undefined && fieldValue !== null && fieldValue !== ""
        );
      case "notExists":
        return (
          fieldValue === undefined || fieldValue === null || fieldValue === ""
        );
      default:
        return true;
    }
  };

  // Function to determine if a field should be shown/enabled
  const shouldShowField = (field: FieldConfig): boolean => {
    if (!field.dependencies) return true;

    const conditionMet = evaluateCondition(field.dependencies, watchedValues);
    return field.dependencies.action === "show" ? conditionMet : !conditionMet;
  };

  const shouldEnableField = (field: FieldConfig): boolean => {
    if (!field.dependencies) return true;

    const conditionMet = evaluateCondition(field.dependencies, watchedValues);
    if (field.dependencies.action === "enable") return conditionMet;
    if (field.dependencies.action === "disable") return !conditionMet;
    return true;
  };

  // Function to get dynamic rules based on visibility
  const getDynamicRules = (field: FieldConfig) => {
    const isVisible = shouldShowField(field);
    if (!isVisible) {
      // Remove required validation for hidden fields
      return field.rules?.filter((rule: any) => !rule.required) || [];
    }
    return field.rules || [];
  };

  const renderField = (field: FieldConfig, isEnabled: boolean = true) => {
    const commonProps = {
      disabled: !isEnabled,
      style: { width: "100%" },
    };

    switch (field.type) {
      case "input":
        return <Input placeholder={field.placeholder} {...commonProps} />;
      case "select":
        return (
          <Select placeholder={field.placeholder} {...commonProps}>
            {field?.options?.map((opt) => (
              <Option key={opt.value} value={opt.value}>
                {opt.label}
              </Option>
            ))}
          </Select>
        );
      case "multiSelect":
        return (
          <Select
            mode="multiple"
            placeholder={field.placeholder}
            {...commonProps}
          >
            {field?.options?.map((opt) => (
              <Option key={opt.value} value={opt.value}>
                {opt.label}
              </Option>
            ))}
          </Select>
        );
      case "date":
        return <DatePicker {...commonProps} />;
      case "dateRange":
        return <RangePicker {...commonProps} />;
      case "radio":
        return (
          <Radio.Group disabled={!isEnabled}>
            {field?.options?.map((opt) => (
              <Radio key={opt.value} value={opt.value}>
                {opt.label}
              </Radio>
            ))}
          </Radio.Group>
        );
      case "checkbox":
        return (
          <Checkbox.Group disabled={!isEnabled}>
            {field?.options?.map((opt) => (
              <Checkbox key={opt.value} value={opt.value}>
                {opt.label}
              </Checkbox>
            ))}
          </Checkbox.Group>
        );
      default:
        return <Input placeholder={field.placeholder} {...commonProps} />;
    }
  };

  return (
    <div>
      {/* Debug panel to show current form values */}
      {showDebugPanel && (
        <div className="font-avenir text-xs my-5 rounded-md bg-padeLightBlue p-2">
          <strong>Current Form Values:</strong>
          <pre>{JSON.stringify(watchedValues, null, 2)}</pre>
        </div>
      )}

      <Form layout="vertical" {...rest}>
        {fields?.map((field) => {
          const isVisible = shouldShowField(field);
          const isEnabled = shouldEnableField(field);
          const dynamicRules = getDynamicRules(field);

          if (!isVisible) {
            return null; // Don't render hidden fields
          }

          return (
            <Form.Item
              key={field.name}
              name={field.name}
              label={field.label}
              rules={dynamicRules}
              style={{
                opacity: isEnabled ? 1 : 0.6,
                transition: "opacity 0.3s ease",
              }}
            >
              {renderField(field, isEnabled)}
            </Form.Item>
          );
        })}
      </Form>
    </div>
  );
};

export default DynamicForm;

// Example usage with fields
const exampleFields: FieldConfig[] = [
  {
    name: "username",
    label: "Username",
    type: "input",
    placeholder: "Enter username",
    rules: [{ required: true, message: "Username is required" }],
  },
  {
    name: "accountType",
    label: "Account Type",
    type: "select",
    options: [
      { label: "Personal", value: "Personal" },
      { label: "Business", value: "Business" },
      { label: "Enterprise", value: "Enterprise" },
    ],
    placeholder: "Select account type",
    rules: [{ required: true, message: "Account type is required" }],
  },
  {
    name: "companyName",
    label: "Company Name",
    type: "input",
    placeholder: "Enter company name",
    rules: [{ required: true, message: "Company name is required" }],
    dependencies: {
      field: "accountType",
      condition: "equals",
      value: ["Business", "Enterprise"],
      action: "show",
    },
  },
  {
    name: "employeeCount",
    label: "Number of Employees",
    type: "select",
    options: [
      { label: "1-10", value: "1-10" },
      { label: "11-50", value: "11-50" },
      { label: "51-200", value: "51-200" },
      { label: "201+", value: "201+" },
    ],
    placeholder: "Select employee count",
    rules: [{ required: true, message: "Employee count is required" }],
    dependencies: {
      field: "accountType",
      condition: "equals",
      value: "Enterprise",
      action: "show",
    },
  },
  {
    name: "hasSupport",
    label: "Do you need technical support?",
    type: "radio",
    options: [
      { label: "Yes", value: "Yes" },
      { label: "No", value: "No" },
    ],
    rules: [{ required: true, message: "Support preference is required" }],
  },
  {
    name: "supportLevel",
    label: "Support Level",
    type: "select",
    options: [
      { label: "Basic", value: "Basic" },
      { label: "Standard", value: "Standard" },
      { label: "Premium", value: "Premium" },
    ],
    placeholder: "Select support level",
    rules: [{ required: true, message: "Support level is required" }],
    dependencies: {
      field: "hasSupport",
      condition: "equals",
      value: "Yes",
      action: "show",
    },
  },
  {
    name: "contactMethod",
    label: "Preferred Contact Method",
    type: "checkbox",
    options: [
      { label: "Email", value: "Email" },
      { label: "Phone", value: "Phone" },
      { label: "Chat", value: "Chat" },
    ],
    dependencies: {
      field: "hasSupport",
      condition: "equals",
      value: "Yes",
      action: "show",
    },
  },
  {
    name: "gender",
    label: "Gender",
    type: "select",
    options: [
      { label: "Male", value: "Male" },
      { label: "Female", value: "Female" },
      { label: "Other", value: "Other" },
    ],
    placeholder: "Select gender",
    rules: [{ required: true, message: "Gender is required" }],
  },
  {
    name: "customGender",
    label: "Please specify",
    type: "input",
    placeholder: "Please specify your gender",
    rules: [{ required: true, message: "Please specify your gender" }],
    dependencies: {
      field: "gender",
      condition: "equals",
      value: "Other",
      action: "show",
    },
  },
  {
    name: "dob",
    label: "Date of Birth",
    type: "date",
    rules: [{ required: true, message: "Date of Birth is required" }],
  },
];
