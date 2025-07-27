import { Button } from "@/components/ui/button";
import DashboardWrapper from "@/components/ui/DashboardWrapper";
import DynamicForm, {
  type FieldConfig,
} from "@/components/ui/form/form-builder";
import SegmentWrapper from "@/components/ui/SegmentWrapper";
import { Form } from "antd";

const fields: FieldConfig[] = [
  {
    name: "name",
    label: "Name",
    type: "input",
    placeholder: "",
    rules: [{ required: true, message: "Name is required" }],
  },
  {
    name: "taxable",
    label: "Is this allowance taxable?",
    type: "radio",
    options: [
      { label: "Yes", value: "yes" },
      { label: "No", value: "no" },
    ],
    rules: [{ required: true, message: "Taxable preference is required" }],
  },
  {
    name: "type",
    label: "Pay type",
    type: "radio",
    options: [
      { label: "Regular", value: "regular" },
      { label: "Off-cycle", value: "off-cycle" },
    ],
    rules: [{ required: true, message: "Taxable preference is required" }],
  },
];

const CreateAllowance = () => {
  const [form] = Form.useForm();

  return (
    <div>
      <DashboardWrapper>
        <SegmentWrapper
          title="Create Allowances"
          subtitle="An allowance is a periodic sum of money provided to cover specific expenses."
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

export default CreateAllowance;

// export function CodeBlockWithHeader() {
//   const [copied, setCopied] = useState(false);

//   const code = `import { useState } from 'react';

// function Counter() {
//   const [count, setCount] = useState(0);

//   return (
//     <div>
//       <p>You clicked {count} times</p>
//       <button onClick={() => setCount(count + 1)}>
//         Click me
//       </button>
//     </div>
//   );
// }`;

//   const handleCopy = () => {
//     navigator.clipboard.writeText(code);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   return (
//     <div className="w-full max-w-[450px]">
//       <CodeBlock>
//         <CodeBlockGroup className="border-border border-b py-2 pr-2 pl-4">
//           <div className="flex items-center gap-2">
//             <div className="bg-primary/10 text-primary rounded px-2 py-1 text-xs font-medium">
//               React
//             </div>
//             <span className="text-muted-foreground text-sm">counter.tsx</span>
//           </div>
//           <Button
//             variant="outline"
//             size="icon"
//             className="h-8 w-8"
//             onClick={handleCopy}
//           >
//             {copied ? (
//               <Check className="h-4 w-4 text-green-500" />
//             ) : (
//               <Copy className="h-4 w-4" />
//             )}
//           </Button>
//         </CodeBlockGroup>
//         <CodeBlockCode code={code} language="tsx" />
//       </CodeBlock>
//     </div>
//   );
// }
