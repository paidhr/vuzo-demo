import { Form, Modal, Select } from 'antd'
import React from 'react'
import { ICompanies } from '../interface/companies.types'
import { axiosPrivateInstance } from '@/lib/axios-config'
import { useQuery } from '@tanstack/react-query'
import { Button } from '@/components/ui/button'

interface props{
    title:string
    setSelectedCompany:(companyId:string)=>void
    
}
const SelectCompany = ({title,setSelectedCompany}:props) => {
      const [form] = Form.useForm();
     const url=`/v1/companies?page=${1}&page_size=${150}`
    const { data, isPending } = useQuery<ICompanies>({
    queryFn: async () => {
      const endpoint =url ;

      const res = await axiosPrivateInstance.get(endpoint);
      return res.data;
    },
    queryKey: ["companies"],
  });

  return (
    <Modal title="Select Company" closable={false} open footer={null}>
<div className='bg-white'>
        <p className="text- font-avenir text-sm mb-4">
          {title}
        </p>
        <Form form={form} layout='vertical' onFinish={()=>{            
            setSelectedCompany(form.getFieldValue('company'))
        }}>
            <Form.Item label={<span className='text-black'>Company</span>} name="company" rules={[{ required: true, message: 'Please select a company!' }]}>
                <Select allowClear showSearch options={data?.data?.companies?.map((item)=>(
                    { label: item.business_name, value: item.id }
                )
                )}/>

            </Form.Item>
            <div className='flex items-center justify-end gap-4 mt-2'>
        <Button          type="submit"
                variant="primary">Proceed</Button></div>
        </Form>
</div>
    </Modal>
  )
}

export default SelectCompany