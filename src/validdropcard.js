import { cardValue } from "./constants";
const validdropcard = (chooseCard,dropCard) => {
    if(
        (
            (dropCard.type === "hearts" || dropCard.type === "diamonds" ) && 
            (chooseCard.type === "spades" || chooseCard.type === "clubs" )
        ) ||
        (
            (chooseCard.type === "hearts" || chooseCard.type === "diamonds" ) && 
            (dropCard.type === "spades" || dropCard.type === "clubs" )
        )
    ){
        if(cardValue.indexOf(chooseCard.value)+1 === cardValue.indexOf(dropCard.value)){
            return true;
        }else{
            return false;
        }
    }else{
        return false;
    }
}

export default validdropcard;