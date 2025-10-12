import { create } from "zustand";
import { ICardItem, IFilter } from "../types";

interface IStore {
    rawData: ICardItem[];
    cardData: ICardItem[];
    filter: IFilter;   
    
    setRawData: (data: ICardItem[]) => void;
    setCardData: (data: ICardItem[]) => void;
    setFilter: (filter: IFilter) => void;
}

export const useStore = create<IStore>((set, get) => ({
    rawData: [],
    cardData: [],
    filter: { search: "", pricing: [] },

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

}));