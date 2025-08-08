export interface IPayGradePayload {
  name: string;
  alias: string;
  annual_gross: number;
  currency: string; // e.g., "NGN"
  taxable: boolean;
  allowances: Allowance[];
  tax_config: TaxConfig;
  statutory_benefits: StatutoryBenefit[];
}

export interface Allowance {
  id: string;
  basis: "percentage_of_gross_earning" | "fixed_amount";
  pay_schedule:
    | "weekly"
    | "bi_weekly"
    | "monthly"
    | "bi_monthly"
    | "quarterly"
    | "tri_annual"
    | "bi_annual"
    | "annual"
    | "anytime";
  value: number;
  pay_period:
    | "first_month"
    | "second_month"
    | "third_month"
    | "fourth_month"
    | "fifth_month"
    | "last_month"
    | "january"
    | "february"
    | "march"
    | "april"
    | "may"
    | "june"
    | "july"
    | "august"
    | "september"
    | "october"
    | "november"
    | "december";
}

export interface TaxConfig {
  is_automated: boolean;
  basis: "percentage_of_gross_earning" | "fixed_amount";
  value: number;
}

export interface StatutoryBenefit {
  id: string;
  allowances: Pick<Allowance, "id">[]; // Only the `id` of each allowance
  contribution: number;
  deduction: number;
}

export interface IPaygrade {
  id: string;
  name: string;
  alias: string;
  annual_gross: number;
  monthly_gross: number;
  daily_gross: number;
  annual_net: number;
  monthly_net: number;
  daily_net: number;
  currency: string;
  is_taxable: boolean;
  tax_config: any | null; 
}

interface PageInfo {
  current_page: number;
  page_size: number;
  total_items: number;
  total_pages: number;
}

interface PaygradesData {
  page_info: PageInfo;
  paygrades: IPaygrade[];
}

export interface IPaygradesData {
  success: boolean;
  code: number;
  message: string;
  data: PaygradesData;
}
