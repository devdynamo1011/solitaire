import { useEffect, useRef, useState } from 'react';
import generatepack from './generatepack'
import closedCard from './images/card_back.png';
import './App.css'
const App = () => {
  let deck_closed = useRef(undefined);
  let open_closed = useRef(undefined);
  let club = useRef(undefined);
  let heart = useRef(undefined);
  let spade = useRef(undefined);
  let diamond = useRef(undefined);
  let columns = useRef(undefined);

  let pack = generatepack();

  let [deck_closedArr,setDeck_closedArr] = useState([]);
  let [open_closedArr,setOpen_closedArr] = useState([]);
  let [clubArr,setClubArr] = useState([]);
  let [heartArr,setHeartArr] = useState([]);
  let [spadeArr,setSpadeArr] = useState([]);
  let [diamondArr,setDiamondArr] = useState([]);
  let [columnsArr,setColumnsArr] = useState([[],[],[],[],[],[],[]]);

  useEffect(()=>{
    
    columnsArr.map((columnArr,index)=>{
      for(let i=0;i<=index;i++){
        let card = pack.pop();
        if(i==index){
          card.face = true;
        }
        columnArr.push(card);
      }
    })
    setDeck_closedArr(pack);
  },[]);

  
  return <>
    <div className='board'>
      <div className='top-row'>
        <div className='left'>
          <div className='card deck-close' ref={deck_closed}></div>
          <div className='card deck-open' ref={open_closed}></div>
        </div>
        <div className='right'>
          <div className='card club' ref={club}></div>
          <div className='card heart' ref={heart}></div>
          <div className='card spade' ref={spade}></div>
          <div className='card diamond' ref={diamond}></div>
        </div>
      </div>
      <div className='bottom-row' ref={columns}>
        <div className='card col col1'></div>
        <div className='card col col2'></div>
        <div className='card col col3'></div>
        <div className='card col col4'></div>
        <div className='card col col5'></div>
        <div className='card col col6'></div>
        <div className='card col col7'>
          {columnsArr[6].map((card,index)=>{
            console.log(card.path);
            return <img src={card.face?card.path:closedCard} className='cardImg' style={{top:index*20+"px"}}/>
          })}
        </div>
      </div>
    </div>
  </>;
}

export default App;