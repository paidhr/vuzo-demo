import CopyToClipboard from '@/utils/copy-to-clipboard';
import React from 'react'
import { toast } from '@/components/ui/use-toast';
import { H6 } from '@/components/ui/typography';
import { Copy } from 'lucide-react';

interface props{
    url: string;
    title?: string;
    values:any
}
const DebugPanel = ({url,title="You are building this request",values}:props) => {
  return (
    <div className="font-mono  min-w-[397px] max-w-[397px] bg-[#101928] text-xs rounded-md  py-5 px-4 max-h-[600px]">
          <H6 className="text-white">
            {title}
          </H6>

          <p className="mb-2 mt-4">
         <span className="text-white text-sm">{url}</span>
          </p>
          
          <div className=" rounded-xl bg-[#1D2739] p-4 h-[90%] overflow-y-scroll">
            <div className="flex justify-end items-center">
              <button onClick={()=>{
      CopyToClipboard(values)
      toast({
          variant: "success",
          title:
            "Copied",
        });
    }}
    
    className='px-2 py-1 border rounded flex items-center gap-2 bg-white'><Copy className='h-4 w-4'/> <p className='text-sm'>Copy</p>  </button>
            </div>
            <pre
            className="whitespace-pre-wrap text-[#13B378] text-sm"
            dangerouslySetInnerHTML={{
              __html: values,
            }}
          />
          </div>
        </div>
  )
}

export default DebugPanel

