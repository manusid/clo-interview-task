import { useEffect } from "react";
import { ICardItem } from "../../types";
import CardItem from "./CardItem/CardItem";
import "./CardsList.css"

type TCardListProps = {
  cardData: ICardItem[];
};

function CardsList({ cardData }: TCardListProps) {
  useEffect(() => {
    console.log("card data changed: ", cardData);
  }, [JSON.stringify(cardData)]);

  return (
    <div className="cardList">
      {cardData.map((item, idx) => (
        <CardItem key={`${item?.id}_${idx}`} data={item} />
      ))}
    </div>
  );
}

export default CardsList;
