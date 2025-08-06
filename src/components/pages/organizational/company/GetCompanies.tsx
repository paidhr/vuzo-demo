import { axiosPrivateInstance } from '@/lib/axios-config';
import React from 'react'
import { CompaniesEntity, ICompanies } from './interface/companies.types';
import { useQuery } from '@tanstack/react-query';
import DashboardWrapper from '@/components/ui/DashboardWrapper';
import { Table, TableColumnsType } from 'antd';
import { Copy } from 'lucide-react';
import CopyToClipboard from '@/utils/copy-to-clipboard';
import { toast } from '@/components/ui/use-toast';
import DebugPanel from './component/DebugPanel';

const GetCompanies = () => {
    const url=`/v1/companies?page=${1}&page_size=${150}`
    const { data, isPending } = useQuery<ICompanies>({
    queryFn: async () => {
      const endpoint =url ;

      const res = await axiosPrivateInstance.get(endpoint);
      return res.data;
    },
    queryKey: ["companies"],
  });

   const columns: TableColumnsType<CompaniesEntity> = [
    {
      title: "Name",
      render(_, record) {
        return (
               <span className="whitespace-nowrap text-neutral400 font-avenir text-sm">
            {record?.business_name}
          </span>
         
        );
      },
    },
    {
      title: "Email",
      render(_, record) {
        return (
          <span className="whitespace-nowrap text-neutral400 font-avenir text-sm">
            {record?.email}
          </span>
        );
      },
    },
    {
      title: "Website",
      render(_, record) {
        return (
          <span className="whitespace-nowrap text-neutral400 font-avenir text-sm">
            {record?.website}
          </span>
        );
      },
    },
    {
      title: "Phone",
      render(_, record) {
        return (
          <span className="whitespace-nowrap text-neutral400 font-avenir text-sm">
            {record?.phone}
          </span>
        );
      },
    },
    {
      title: "Address",
      render(_, record) {
        return (
          <span className="whitespace-nowrap text-neutral400 font-avenir text-sm">
            {record?.address?.line1}
          </span>
        );
      },
    },
    {
      title: "RC Number",
      render(_, record) {
        return (
          <span className="whitespace-nowrap text-neutral400 font-avenir text-sm">
            {record?.rc_number}
          </span>
        );
      },
    },
    {
      title: "RC Date",
      render(_, record) {
        return (
          <span className="whitespace-nowrap text-neutral400 font-avenir text-sm">
            {record?.rc_date}
          </span>
        );
      },
    },
    
  ];
  return (
      <DashboardWrapper>

          <div className=' flex  justify-between gap-[30px] h-screen'>
                  <div className="my-2 w-[60%] ">
       
        <Table
        tableLayout="auto"
          columns={columns}
          loading={isPending}
          scroll={{
            y: "calc(100vh - 300px)",
            x: "max-content",
          }}
          dataSource={
            data?.data?.companies|| []
          }
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
          { data&&
         
        <DebugPanel title="Response:" url={url} values={JSON.stringify(data, null, 2)} />}
    </div>
      </DashboardWrapper>
  )
}

export default GetCompanies