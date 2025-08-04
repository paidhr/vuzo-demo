import DashboardWrapper from "@/components/ui/DashboardWrapper";
import DynamicForm from "@/components/ui/form/form-builder";
import SegmentWrapper from "@/components/ui/SegmentWrapper";
import { Button } from "@/components/ui/button";
import { create_employee_field } from "@/data/data";

const CreateEmployee = () => {
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
          <div className="px-4 md:px-6 xl:px-[60px]">
            <DynamicForm url="" fields={create_employee_field} />
          </div>
        </SegmentWrapper>
      </DashboardWrapper>
    </>
  );
};

export default CreateEmployee;
