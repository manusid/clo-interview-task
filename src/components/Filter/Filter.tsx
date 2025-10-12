import { useStore } from "../../store";
import { PricingOption, pricingOptions } from "../../types";

function Filter() {
  const { filter, setFilter } = useStore();
  return (
    <div>
      <div className="search-container">
        <input
          className="search"
          placeholder="Serach keyword"
          value={filter?.search ?? ""}
          onChange={(e) => {
            const value = e.target.value;
            setFilter({ ...filter, search: value });
          }}
        />
      </div>
      <div className="filter-container">
        <ul className="filter-list">
          {Object.entries(pricingOptions).map(([value, label], idx) => {
            return (
              <li key={`${value}-${idx}`}>
                <input
                  type="checkbox"
                  value={value}
                  checked={(filter?.pricing ?? []).indexOf(Number(value)) !== -1}
                  onChange={(e) => {
                    const intValue = Number(e.target.value);
                    const isChecked = e.target.checked as Boolean;

                    let pricing: PricingOption[] = filter.pricing ?? [];

                    if (isChecked === true) {
                      if (pricing.indexOf(intValue) === -1)
                        pricing.push(intValue);
                    } else {
                      pricing = pricing.filter(
                        (ele) => Number(ele) !== Number(value)
                      );
                    }
                    setFilter({ ...filter, pricing });
                  }}
                />{" "}
                {label}
              </li>
            );
          })}
        </ul>
        <button
          className="reset"
          onClick={() => {
            setFilter({ ...filter, pricing: [] });
          }}
        >
          Reset
        </button>
      </div>
    </div>
  );
}

export default Filter;
