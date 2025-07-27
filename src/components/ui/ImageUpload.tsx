import type { RcFile, UploadFile, UploadProps } from "antd/es/upload/interface";
import type { UploadChangeParam } from "antd/es/upload";
import { useToast } from "./use-toast";
import { Spin, Upload } from "antd";
import { InboxOutlined } from "@ant-design/icons";
import { P3 } from "./typography";
import { Button } from "./button";

export interface ImageUploadProps {
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  onChange: (value: RcFile, url?: string) => void;
  onRemove?: () => void;
  imgUrl?: string;
  imgClassName?: string;
  limit?: number;
  showUploadList?: boolean;
}

const { Dragger } = Upload;

const getBase64 = (img: RcFile, callback: (url: string) => void) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result as string));
  reader.readAsDataURL(img);
};

const customRequest = async (options: {
  onSuccess: (value: string) => void;
}) => {
  setTimeout(() => {
    options.onSuccess("ok");
  }, 0);
};

const ImageUpload = ({
  isLoading,
  setIsLoading,
  onChange,
  onRemove,
  imgUrl,
  imgClassName,
  limit = 2,
  showUploadList = true,
}: ImageUploadProps) => {
  const { toast } = useToast();

  const beforeUpload = (file: RcFile) => {
    // Only svg,  png, jpg, jpeg file are allowed
    const isPng = file.type === "image/png";
    const isJpg = file.type === "image/jpg";
    const isJpeg = file.type === "image/jpeg";
    // const isSvg = file.type === "image/svg+xml";
    const sizeLimit = limit || 2;
    const isLt2M = file.size / 1024 / 1024 < sizeLimit; // 2MB

    if (!isPng && !isJpg && !isJpeg) {
      toast({
        description: "You can only upload pdf, png, jpg, jpeg file!",
        variant: "destructive",
      });
    }
    if (!isLt2M) {
      toast({
        description: "File must be smaller than 2MB!",
        variant: "destructive",
      });
    }
    return (isPng || isJpg || isJpeg) && isLt2M;
  };

  const handleChange: UploadProps["onChange"] = (
    info: UploadChangeParam<UploadFile>
  ) => {
    if (info.file.status === "uploading") {
      setIsLoading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj as RcFile, (url) => {
        setIsLoading(false);
        onChange(info.file.originFileObj as RcFile, url);
      });
    }
  };

  return (
    <Spin spinning={isLoading}>
      <Dragger
        name="upload-companyLogo"
        className=" font-avenir"
        beforeUpload={beforeUpload}
        onChange={handleChange}
        // @ts-expect-error leave this as it is
        customRequest={customRequest}
        multiple={false}
        maxCount={1}
        onDrop={(e) => {
          e.preventDefault();
        }}
        onRemove={onRemove}
        showUploadList={showUploadList}
      >
        {imgUrl ? (
          <div className="relative">
            <img src={imgUrl} alt="img" className={imgClassName} />
          </div>
        ) : (
          <>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            {/* <P2 className="text-dark10 font-bold  text-sm leading-[21px]">
              Drop your file here or
            </P2> */}

            <P3 className="text-sm pb-5 text-dark30 text-[12px] leading-[18px]">
              PNG, JPG or JPEG (dimensions: 100 x 100)
            </P3>
            <Button
              variant="secondary"
              onClick={(e) => {
                e.preventDefault();
              }}
            >
              Choose file
            </Button>
          </>
        )}
      </Dragger>
    </Spin>
  );
};

export default ImageUpload;
