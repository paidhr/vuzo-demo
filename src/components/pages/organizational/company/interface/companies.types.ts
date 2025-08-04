interface BaseRes {
  success: boolean;
  code: number;
  message: string;
}

export interface ICompanies extends BaseRes {
  data: CompanyData;
}
export interface CompanyData {
  page_info: PageInfo;
  companies?: CompaniesEntity[] | null;
}
export interface PageInfo {
  current_page: number;
  page_size: number;
  total_items: number;
  total_pages: number;
}
export interface CompaniesEntity {
  id: string;
  business_name: string;
  legal_name: string;
  address: Address;
  tax: TaxOrPensionOrHousing;
  pension: TaxOrPensionOrHousing;
  housing: TaxOrPensionOrHousing;
  website: string;
  email: string;
  phone: string;
  business_type?: null;
  industry?: null;
  rc_number: string;
  rc_date: string;
}
export interface Address {
  line1: string;
  line2: string;
  city: string;
  state?: null;
  postal_code: string;
  country: string;
}
export interface TaxOrPensionOrHousing {
  employer_code: string;
}

export interface IWorkplaces extends BaseRes {
  data: WorkplaceData;
}

export interface WorkplaceData {
  page_info: PageInfo;
  workplaces?: WorkplacesEntity[] | null;
}

export interface WorkplacesEntity {
  id: string;
  name: string;
  active: boolean;
  address: Address;
  primary: boolean;
  tax_id: string;
  tax_office: string;
  tax_office_code: string;
}

export interface IPaygrades extends BaseRes {
  data: PaygradeData;
}

export interface PaygradeData {
  page_info: PageInfo;
  // paygrades?: WorkplacesEntity[] | null;
}
