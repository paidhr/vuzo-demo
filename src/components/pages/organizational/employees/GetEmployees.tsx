import { axiosPrivateInstance } from "@/lib/axios-config";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import DashboardWrapper from "@/components/ui/DashboardWrapper";
import { Table, TableColumnsType } from "antd";
import DebugPanel from "../../organizational/company/component/DebugPanel";
import SelectCompany from "../../organizational/company/component/SelectCompany";

const GetEmployees = () => {
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const id = `ffa10931-5fc0-47c6-bb24-e6186eca1c8a2`;

  const url = selectedCompany ? `/v1/employees?company=${selectedCompany}` : ``;
  const { data, isPending } = useQuery({
    queryFn: async () => {
      const endpoint = url;
      const res = await axiosPrivateInstance.get(endpoint);
      return res.data;
    },
    queryKey: ["paygrades", selectedCompany],
  });

  console.log("Data: ", data);

  const columns: TableColumnsType = [
    {
      title: "First Name",
      render(_, record) {
        return (
          <span className="whitespace-nowrap text-neutral400 font-avenir text-sm flex flex-col">
            {record.first_name}
          </span>
        );
      },
    },
    {
      title: "Last Name",
      render(_, record) {
        return (
          <span className="whitespace-nowrap text-neutral400 font-avenir text-sm flex flex-col">
            {record.last_name}
          </span>
        );
      },
    },
    {
      title: "Email",
      render(_, record) {
        return (
          <span className="whitespace-nowrap text-neutral400 font-avenir text-sm flex flex-col">
            {record.email}
          </span>
        );
      },
    },
    {
      title: "Phone Number",
      render(_, record) {
        return (
          <span className="whitespace-nowrap text-neutral400 font-avenir text-sm flex flex-col">
            {record.phone}
          </span>
        );
      },
    },
    {
      title: "Gender",
      render(_, record) {
        return (
          <span className="whitespace-nowrap text-neutral400 font-avenir text-sm flex flex-col">
            {record.gender}
          </span>
        );
      },
    },
    {
      title: "Status",
      render(_, record) {
        return (
          <span className="whitespace-nowrap text-neutral400 font-avenir text-sm flex flex-col">
            {record.status}
          </span>
        );
      },
    },
  ];
  return (
    <DashboardWrapper>
      <>
        <div className=" flex  justify-between gap-[30px] h-screen">
          <div className="my-2 w-[60%] ">
            <Table
              tableLayout="auto"
              columns={columns}
              loading={isPending}
              scroll={{
                y: "calc(100vh - 300px)",
                x: "max-content",
              }}
              dataSource={data?.data?.employees || []}
              rowKey={(record) => record?.id}
              pagination={{
                defaultPageSize: 20,
                // current: currentPage,
                // pageSize,
                // total: data?.data?.page_info?.total_items || 0,
                // showSizeChanger: true,
                // onChange: (page) => setCurrentPage(page),
                // onShowSizeChange: (_, size) => setPageSize(size),
              }}
            />
          </div>
          {data && (
            <DebugPanel
              title="Response:"
              url={url}
              values={JSON.stringify(data, null, 2)}
            />
          )}
        </div>
        {!selectedCompany && (
          <SelectCompany
            title="Select company to view employees"
            setSelectedCompany={setSelectedCompany}
          />
        )}
      </>
      )
    </DashboardWrapper>
  );
};

export default GetEmployees;
