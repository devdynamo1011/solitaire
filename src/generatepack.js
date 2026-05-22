import { cardType, cardValue, randomNumber } from './constants';

let generatepack = () => {
    let pack = [];

    cardType.forEach(function(type){
        cardValue.forEach(function(value){
            let cardObj = {
                id:pack.length+1,
                type:type,
                value:value,
                face:false,
                path:`/images/${type}_${value}.png`,
            }
            pack.push(cardObj);
        })
    })
    // suffle
    for(let i=0;i<52;i++){
        let first = randomNumber(0,52);
        let second = randomNumber(0,52);

        [pack[first], pack[second]] = [pack[second], pack[first]]; 
    }
    return pack;
}
export default generatepack;
