import { cn } from "@/utils/utils";
import {
  Form,
  type FormItemProps,
  Input,
  Select,
  type InputProps,
  type SelectProps,
} from "antd";

const { Option } = Select;

export const CustomInput = ({
  label,
  name,
  required = false,
  inputProps,
  ...restProps
}: InputItemProps) => {
  return (
    <Form.Item
      label={
        <span className="font-circular text-neutral300 text-sm  ">{label}</span>
      }
      name={name}
      rules={[{ required, message: "Please enter this field" }]}
      // tooltip="This is a required field"
      {...restProps}
    >
      <Input
        className={cn(
          " font-circular text-neutral400 h-10",
          inputProps?.className
        )}
        {...inputProps}
      />
    </Form.Item>
  );
};

export const CustomSelect = ({
  label,
  name,
  required = false,
  options,
  isLoading = false,
  addBottomSpace = false,
  selectProps,
  ...restProps
}: SelectItemProps) => {
  return (
    <Form.Item
      name={name}
      label={
        <span className="font-circular text-neutral300 text-sm  ">{label}</span>
      }
      rules={[{ required, message: "Please enter this field" }]}
      {...restProps}
    >
      <Select
        loading={isLoading}
        filterOption={(input, option) => {
          if (option) {
            const value = (option.value as string) || "";
            return value.toLowerCase().indexOf(input.toLowerCase()) >= 0;
          } else {
            return false;
          }
        }}
        className={cn(
          " font-circular text-neutral400 h-10",
          selectProps?.className
        )}
        {...selectProps}
      >
        {options?.map((option, index) => (
          <Option key={index} value={option.value}>
            <span className=" text-neutral400 font-circular">
              {option.label}
            </span>
          </Option>
        ))}

        {addBottomSpace
          ? ["first", "second"].map((item) => (
              <Option
                key={"empty" + item}
                disabled
                className="pointer-events-none"
              >
                {" "}
              </Option>
            ))
          : null}
      </Select>
    </Form.Item>
  );
};

type InputItemProps = FormItemProps & {
  inputProps?: InputProps;
};

type SelectItemProps = FormItemProps & {
  options: { label: string; value: string }[] | undefined;
  isLoading?: boolean;
  addBottomSpace?: boolean;
  required?: boolean;
  selectProps?: SelectProps;
};
