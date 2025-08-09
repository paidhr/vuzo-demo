import { axiosPrivateInstance } from "@/lib/axios-config";
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import DashboardWrapper from "@/components/ui/DashboardWrapper";
import { Table, TableColumnsType } from "antd";
import { Check, X } from "lucide-react";
import { IPaygrade, IPaygradesData } from "./interface";
import DebugPanel from "../../organizational/company/component/DebugPanel";
import { formatNumber } from "@/utils/formatNumber";
import SelectCompany from "../../organizational/company/component/SelectCompany";

const GetPaygrades = () => {
  const [selectedCompany, setSelectedCompany] = useState<string | null>(null);
  const id = `ffa10931-5fc0-47c6-bb24-e6186eca1c8a2`;

  const url = selectedCompany
    ? `/v1/paygrades?company=${selectedCompany}&page=1&page_size=150`
    : ``;
  const { data, isPending } = useQuery<IPaygradesData>({
    queryFn: async () => {
      const endpoint = url;
      const res = await axiosPrivateInstance.get(endpoint);
      return res.data;
    },
    queryKey: ["paygrades", selectedCompany],
  });

  const columns: TableColumnsType<IPaygrade> = [
    {
      title: "Name",
      render(_, record) {
        return (
          <span className="whitespace-nowrap text-neutral400 font-avenir text-sm flex flex-col">
            {record?.name}
          </span>
        );
      },
    },
    {
      title: "Annual",
      render(_, record) {
        return (
          <span className="whitespace-nowrap text-neutral400 font-avenir text-sm">
            {formatNumber(record?.annual_gross)}
          </span>
        );
      },
    },
    {
      title: "Monthly",
      render(_, record) {
        return (
          <span className="whitespace-nowrap text-neutral400 font-avenir text-sm">
            {formatNumber(record?.monthly_gross)}
          </span>
        );
      },
    },
    {
      title: "Currency",
      render(_, record) {
        return (
          <span className="whitespace-nowrap text-neutral400 font-avenir text-sm">
            {record?.currency}
          </span>
        );
      },
    },

    {
      title: "Taxable",
      render(_, record) {
        return (
          <span className="whitespace-nowrap text-neutral400 font-avenir text-sm">
            {record?.is_taxable ? (
              <Check className="text-green-500" />
            ) : (
              <X className=" text-danger500" />
            )}
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
              dataSource={data?.data?.paygrades || []}
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
            title="Select company to view paygrade"
            setSelectedCompany={setSelectedCompany}
          />
        )}
      </>
      )
    </DashboardWrapper>
  );
};

export default GetPaygrades;
