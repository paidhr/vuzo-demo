import DashboardWrapper from "@/components/ui/DashboardWrapper";
import HomeImg from "@/assets/images/home.svg";
// import SegmentWrapper from "@/components/ui/SegmentWrapper";
// import { H3, P2 } from "@/components/ui/typography";
// import { useToast } from "@/components/ui/use-toast";
// import useAuthStore from "@/stores/auth/authStore";
// import { Tooltip } from "antd";
// import { Copy, Eye, EyeOff } from "lucide-react";
// import { useState } from "react";

const Home = () => {
  // const [showSecret, setShowSecret] = useState(false);
  // const { toast } = useToast();
  // const user = useAuthStore((state) => state.user);

  return (
    <DashboardWrapper>
      <div className="h-[70dvh] flex flex-col items-center justify-center">
        <h1 className="text-3xl text-neutral800 font-circlar font-bold mb-2">
          Coming Soon
        </h1>
        <p className="text-neutral500 font-circlar text-base mb-8">
          We're working hard to bring you something amazing. Stay tuned!
        </p>
        <div className="mb-6 ">
            <img
              className=""
              src={HomeImg}
              alt="logoin"
              width={426}
              height={288}
            />
          </div>
      </div>
      {/*  <SegmentWrapper
        title=" Client ID and Secret"
        subtitle="Your client ID and Secret are unique identifiers for your application. They are used to authenticate your application with the API. ‘Client ID’ is public and ‘Client Secret’ is private. Keep your secret safe."
      >
        <div className="px-4 md:px-6 lg:px-8 xl:px-[60px]">
          <div className="flex flex-col gap-4">
            <div>
              <H3 className="text-neutral700">Client ID</H3>
              <P2 className="text-neutral500 flex gap-4 items-center">
                {user?.clientId}
                <span
                  className="d"
                  onClick={() => {
                    navigator.clipboard.writeText(user?.clientId ?? "");
                    toast({
                      title: "Client Id copied to clipboard",
                      variant: "success",
                    });
                  }}
                  role="button"
                >
                  <Tooltip title="Copy Client ID">
                    <Copy className="cursor-pointer w-4 h-4" />
                  </Tooltip>
                </span>
              </P2>
            </div>
            <div>
              <H3 className="text-neutral700">Client Secret</H3>
              <P2 className="text-neutral500 flex gap-4 items-center">
                {showSecret
                  ? user?.clientSecret
                  : hideSecret(user?.clientSecret ?? "")}
                <span className="flex gap-4 items-center">
                  <Tooltip
                    title={
                      showSecret ? "Hide Client Secret" : "Show Client Secret"
                    }
                  >
                    {showSecret ? (
                      <Eye
                        className="cursor-pointer w-4 h-4"
                        onClick={() => setShowSecret(false)}
                      />
                    ) : (
                      <EyeOff
                        className="cursor-pointer w-4 h-4"
                        onClick={() => setShowSecret(true)}
                      />
                    )}
                  </Tooltip>

                  <Tooltip title="Copy Client Secret">
                    <Copy
                      className="cursor-pointer w-4 h-4"
                      onClick={() => {
                        navigator.clipboard.writeText(user?.clientSecret ?? "");
                        toast({
                          title: "Client Secret copied to clipboard",
                          variant: "success",
                        });
                      }}
                      role="button"
                    />
                  </Tooltip>
                </span>
              </P2>
            </div>
          </div> 
        </div>
      </SegmentWrapper>*/}
    </DashboardWrapper>
  );
};

export default Home;

// function hideSecret(secret: string) {
//   // e.g take 234567890 and return 2****0

//   if (!secret) {
//     return "****";
//   }

//   const firstChar = secret.charAt(0);
//   const lastChar = secret.charAt(secret.length - 1);
//   const hiddenSecret = `${firstChar}******************${lastChar}`;

//   return hiddenSecret;
// }
