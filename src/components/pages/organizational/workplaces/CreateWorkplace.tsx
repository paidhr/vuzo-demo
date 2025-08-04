import SegmentWrapper from "@/components/ui/SegmentWrapper";
import { Button } from "@/components/ui/button";
import DashboardWrapper from "@/components/ui/DashboardWrapper";
import { create_workplace_field } from "@/data/data";
import DynamicForm from "@/components/ui/form/form-builder";
const CreateWorkplace = () => {
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
          <div className="px-4 md:px-6 xl:px-[60px]">
            <DynamicForm url="" fields={create_workplace_field} />
          </div>
        </SegmentWrapper>
      </DashboardWrapper>
    </>
  );
};

export default CreateWorkplace;
