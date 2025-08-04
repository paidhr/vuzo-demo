export interface ICompanyPayload {
  business_name: string;
  legal_name: string;
  website: string;
  email: string;
  phone: string;
  business_type:
    | "private_limited_company"
    | "public_limited_company"
    | "public_unlimited_company"
    | "sole_proprietorship";
  industry:
    | "agric_produce"
    | "betting_and_lottery"
    | "book_stores"
    | "cable_satellite_paytv"
    | "clothing_and_accessories"
    | "commercial_footware"
    | "credit_lending_companies"
    | "cryptocurrency"
    | "department_stores"
    | "digital_goods_entertainment"
    | "education"
    | "electronics_stores"
    | "financial_institutions_fund_manager_investment"
    | "general_contractors"
    | "general_merchandise_stores"
    | "grocery_stores_and_supermarkets"
    | "hospitality_lodging"
    | "insurance"
    | "money_transfer"
    | "non_financial_institution"
    | "professional_services"
    | "real_estate_facility_management"
    | "religious_organisations"
    | "security_broker_dealer_custom"
    | "security_brokers_dealers"
    | "tax_accounting_audit"
    | "taxicabs"
    | "telecommunication"
    | "ticketing_events"
    | "transportation_services"
    | "travel_airlines"
    | "travel_agencies_tour"
    | "utilities_electric_gas"
    | "video_game_arcades_establishments"
    | "other";
  rc_number: string;
  rc_date: string; // or Date if you're parsing it
  address: {
    country: string;
    line1: string;
    line2?: string;
    city: string;
    state: string;
    postal_code: string;
  };
}
