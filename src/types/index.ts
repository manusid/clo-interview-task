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

export interface DropdownOption {
  value: string;
  label: string;
}

export interface CustomDropdownProps {
  placeholder?: string;
}

export const sortAscending = <T>(arr: T[]): T[] => {
  return [...arr].sort((a, b) => (a as any) - (b as any)); // Type assertion for generic comparison
};

export const sortDescending = <T>(arr: T[]): T[] => {
  return [...arr].sort((a, b) => (b as any) - (a as any)); // Type assertion for generic comparison
};
