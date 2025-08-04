import { axiosPrivateInstance } from '@/lib/axios-config';
import React from 'react'
import { CompaniesEntity, ICompanies } from './interface/companies.types';
import { useQuery } from '@tanstack/react-query';
import DashboardWrapper from '@/components/ui/DashboardWrapper';
import { Table, TableColumnsType } from 'antd';
import { Copy } from 'lucide-react';
import CopyToClipboard from '@/utils/copy-to-clipboard';
import { toast } from '@/components/ui/use-toast';

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

          <div className='px-4 md:px-6 lg:px-10 py-5'>
                  <div className="my-2">
       
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
          { data&& <div className="font-mono text-xs my-5 rounded-md bg-padeLightBlue p-4">
  <div className='flex items-center justify-between'>
      <p className="mb-2">
      Url: <span className="text-blue-600">{url}</span>
    </p>

    <button onClick={()=>{
      CopyToClipboard(JSON.stringify(data, null, 2));
      toast({
          variant: "success",
          title:
            "Copied",
        });
    }} className='px-2 py-1 border border-black rounded flex items-center gap-2'><p className='text-sm'>Copy</p> <Copy className='h-4 w-4'/> </button>

  </div>
    <strong className="block mb-1">Response:</strong>
    <pre
      className="whitespace-pre-wrap"
      dangerouslySetInnerHTML={{
        __html: data ? JSON.stringify(data, null, 2) : 'Loading...',
      }}
    />
    </div>}
    </div>
      </DashboardWrapper>
  )
}

export default GetCompanies