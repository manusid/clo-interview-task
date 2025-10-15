import { ICardItem } from "../../../types";
import "./CardItem.css";

type TCardItemProps = {
    data: ICardItem
}
function CardItem({data}: TCardItemProps) {
    let pricingText: any = "";
    if (data.pricingOption === 1) {
        pricingText = "Free";
    } else if(data.pricingOption === 2) {
        pricingText = "View onlly";
    } else {
        pricingText = `$${data.price}`;
    }
  return (
    <>
       <div className="cardItem">
            <div className="Card-image">
                <img src={data.imagePath} alt="card-image"/>
            </div>
            <div className="card-details">
                <div className="desc">
                    <h4>{data.title}</h4>
                    <p>{data.creator}</p>
                </div>
                <div className="price">
                    {pricingText}
                </div>
            </div>
       </div>
    </>
  );
}

export default CardItem;
