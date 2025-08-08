export interface IPaybandData {
  success: boolean;
  code: number;
  message: string;
  data: {
    page_info: PageInfo;
    paybands: IPayband[];
  };
}

export interface PageInfo {
  current_page: number;
  page_size: number;
  total_items: number;
  total_pages: number;
}

export interface IPayband {
  id: string;
  name: string;
  alias: string;
  minimum_annual_gross: number;
  maximum_annual_gross: number;
  minimum_monthly_gross: number;
  maximum_monthly_gross: number;
  minimum_daily_gross: number;
  maximum_daily_gross: number;
  minimum_annual_net: number;
  maximum_annual_net: number;
  minimum_monthly_net: number;
  maximum_monthly_net: number;
  minimum_daily_net: number;
  maximum_daily_net: number;
  currency: string;
  is_taxable: boolean;
  tax_config: any | null;
  allowances: any | null;
  benefits: any | null;
}
