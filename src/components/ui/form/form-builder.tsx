import {
  Form,
  Input,
  Select,
  DatePicker,
  Radio,
  Checkbox,
  type FormProps,
  Alert,
} from "antd";
import { useMemo } from "react";
import { H4, H6 } from "../typography";
import CopyToClipboard from "@/utils/copy-to-clipboard";
import { toast } from '@/components/ui/use-toast';
import { Copy } from "lucide-react";
import DebugPanel from "@/components/pages/organizational/company/component/DebugPanel";

const { Option } = Select;
const { RangePicker } = DatePicker;

export type DependencyConfig = {
  field: string;
  condition:
    | "equals"
    | "notEquals"
    | "includes"
    | "notIncludes"
    | "exists"
    | "notExists";
  value?: string | string[] | number | boolean;
  action: "show" | "hide" | "enable" | "disable";
};

export type FieldConfig = {
  name: string | string[];
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
  inputType?: "text" | "email" | "number" | "tel" | "url" | "password";
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
  url: string;
} & FormProps;

const DynamicForm: React.FC<DynamicFormProps> = ({
  fields,
  url,
  showDebugPanel = true,
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
        return (
          <Input
            placeholder={field.placeholder}
            type={field.inputType || "text"}
            {...commonProps}
          />
        );
      case "select":
        return (
          <Select
            placeholder={field.placeholder}
            showSearch
            filterOption={(
              input: string,
              option?: {
                label: string;
                value: string;
                children: React.ReactNode;
              }
            ) => {
              if (option) {
                const label = option.label || "";
                return label?.toLowerCase().indexOf(input?.toLowerCase()) >= 0;
              } else {
                return false;
              }
            }}
            options={field?.options?.map((i) => ({
              label: i.label,
              value: i.value as string,
              children: null,
            }))}
            {...commonProps}
          />
        );
      case "multiSelect":
        return (
          <Select
            mode="multiple"
            showSearch
            placeholder={field.placeholder}
            filterOption={(
              input: string,
              option?: {
                label: string;
                value: string;
                children: React.ReactNode;
              }
            ) => {
              if (option) {
                const label = option.label || "";
                return label?.toLowerCase().indexOf(input?.toLowerCase()) >= 0;
              } else {
                return false;
              }
            }}
            options={field?.options?.map((i) => ({
              label: i.label,
              value: i.value as string,
              children: null,
            }))}
            {...commonProps}
          />
        );
      case "date":
        return <DatePicker {...commonProps} format="YYYY-MM-DD" />;
      case "dateRange":
        return <RangePicker {...commonProps} format="YYYY-MM-DD" />;
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
    <div className=" flex  justify-between gap-[30px] h-screen">
      <div className="h-full overflow-y-scroll ">
        <Form layout="vertical" {...rest} rootClassName="flex-grow">
        <div className="mb-4">
                          <Alert
                            message={
                              "Use the form on the left to simulate the company creation process. As you fill out each field, the code snippet on the right updates in real time to reflect the API request payload you’ll need in your implementation."
                            }
                            type="info"
                            showIcon
                            className="bg-[#E8F0FE]  font-avenir text-neutral500 text-sm w-full flex justify-between items-center "
                          />
                        </div>
        <div className="grid grid-cols-2 gap-x-4 gap-y-0">
          {fields?.map((field) => {
            const isVisible = shouldShowField(field);
            const isEnabled = shouldEnableField(field);
            const dynamicRules = getDynamicRules(field);

            if (!isVisible) {
              return null; 
            }

            return (
              <Form.Item
                key={
                  Array.isArray(field.name) ? field.name.join(".") : field.name
                }
                name={field.name}
                label={field.label}
                rules={dynamicRules}
                style={{
                  opacity: isEnabled ? 1 : 0.6,
                  transition: "opacity 0.3s ease",
                }}
              >
                <>
                            

                {renderField(field, isEnabled)}
                </>
              </Form.Item>
            );
          })}
        </div>
      </Form>
      </div>
      {showDebugPanel && (
        <DebugPanel url={url} values={prettyPrintJson(formatFormValues(watchedValues))} />
    
      )}
    </div>
  );
};

export default DynamicForm;


const formatFormValues = (values: Record<string, any>) => {
  const formatted: Record<string, any> = {};

  for (const [key, value] of Object.entries(values)) {
    if (value?.isValid && typeof value.format === "function") {
      formatted[key] = value.format("YYYY-MM-DD");
    } else if (value instanceof Date) {
      formatted[key] = value.toISOString().split("T")[0]; // fallback
    } else {
      formatted[key] = value;
    }
  }

  return formatted;
};

const prettyPrintJson = (obj: any) => {
  const json = JSON.stringify(obj, null, 2);
  return json
    .replace(/"([^"]+)":/g, '<span class="text-[#13B378]">"$1"</span>:')
    .replace(/: "([^"]+)"/g, ': <span class="text-[#13B378]">"$1"</span>')
    .replace(/: ([0-9]+)/g, ': <span class="text-[#13B378]">$1</span>');
};