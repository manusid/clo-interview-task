import { create } from "zustand";
import { ICardItem, IFilter, DropdownOption  } from "../types";

interface IStore {
    rawData: ICardItem[];
    cardData: ICardItem[];
    filter: IFilter; 
    sortBy: string;  
    
    setRawData: (data: ICardItem[]) => void;
    setCardData: (data: ICardItem[]) => void;
    setFilter: (filter: IFilter) => void;
    setSortby: (sort: string) => void;
}
export const options: DropdownOption[] = [
    { value: 'price_high-low', label: 'High to Low' },
    { value: 'price_low-high', label: 'Low to high' },
    { value: 'name_asc', label: 'Name' },
  ];

export const useStore = create<IStore>((set, get) => ({
    rawData: [],
    cardData: [],
    filter: { search: "", pricing: [] },
    sortBy: "name_asc",

    setRawData: (data) => {
        set({  rawData: data })
    },
    setCardData: data => {
        set({  cardData : data })
    },
    setFilter: data => {
        const url = new URL(window.location.href);
        url.searchParams.set("filter", JSON.stringify(data));
        window.history.pushState({}, "", url)
        set({  filter: data })
    },
    setSortby: sort => {
        set({ sortBy: sort })
    }
}));