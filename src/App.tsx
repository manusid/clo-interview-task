import { useEffect, useState } from "react";
import { ICardItem, IFilter } from "./types";
import Header from "./components/Header/Header";
import Filter from "./components/Filter/Filter";
import CardsList from "./components/CardsList/CardsList";
import { useStore } from "./store";
import SortBy from "./components/SortBy/SortBy";

function App() {
  const { cardData, rawData, filter, setCardData, setRawData, setFilter, sortBy } =
    useStore();

  useEffect(() => {
    populateData(rawData);
  }, [filter.search, JSON.stringify(filter.pricing), sortBy]);

  const populateData = (data: ICardItem[]) => {
    const pricing = filter.pricing ?? [];
    const searchText = filter?.search?.toLowerCase()?.trim();

    console.log({ pricing, searchText });

    const filteredData = data.filter((d) => {
      let isSearchMatched = true;
      let filterPriceOnly = true;
      if (searchText) {
        isSearchMatched =
          d.creator.toLowerCase().includes(searchText) ||
          d.title.toLowerCase().includes(searchText);
      }
      if (sortBy === "price_high-low" || sortBy === "price_low-high") {
        filterPriceOnly = d.pricingOption === 0;
      }
      if (pricing.length > 0) {
        return (
          isSearchMatched && filterPriceOnly && pricing.indexOf(Number(d.pricingOption)) !== -1
        );
      }
      return isSearchMatched && filterPriceOnly;
    });

    const sortedData = filteredData.sort((a, b) => {
      if (sortBy === "price_low-high") {
        return a.price - b.price
      }

      if (sortBy === "price_high-low") {
        return b.price - a.price
      }

      return a.creator.localeCompare(b.creator)
    })

    setCardData(sortedData);
  };

  useEffect(() => {
    const init = async () => {
      const res = await fetch(
        `https://closet-recruiting-api.azurewebsites.net/api/data`
      );
      const resJson = await res.json();
      setRawData(resJson);
      const url = new URL(window.location.href);
      const filter = url.searchParams.get("filter");
      const parsedFilter = JSON.parse(filter ?? "{}");

      try {
        // if (Object.keys(parsedFilter).length > 0) {
        if (parsedFilter?.search != "" && parsedFilter?.pricing?.length > 0) {
          console.log("inside params");
          setFilter(parsedFilter);
        } else {
          populateData(resJson);
        }
      } catch (e) {}
    };

    init();
  }, []);

  return (
    <div>
      <Header />
      <div className="body-section">
        <Filter />
        <div className="sort-section">
          <SortBy
            placeholder="Select sort by"
          />
        </div>
        <CardsList cardData={cardData} />
      </div>
    </div>
  );
}

export default App;
