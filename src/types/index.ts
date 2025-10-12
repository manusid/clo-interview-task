export enum PricingOption {
    PAID = 0,
    FREE = 1,
    VIEW_ONLY = 2
}

export const pricingOptions = {  
    [PricingOption.PAID]: "Paid",
    [PricingOption.FREE]: "Free",
    [PricingOption.VIEW_ONLY]: "View Only"
}

export interface ICardItem {
  id: string;
  creator: string;
  title: string;
  pricingOption: number;
  imagePath: string;
  price: number;
}

export interface IFilter {
    search: string | null;
    pricing: PricingOption[] | null
}