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
  
  let [chooseCard,setChooseCard] = useState(null);

  let chooseFromDeck = () => {
    if(deck_closedArr.length>0){
      let card = deck_closedArr.pop();
      setOpen_closedArr([...open_closedArr,card]);
    }else{
      setDeck_closedArr(open_closedArr.reverse());
      setOpen_closedArr([]);
    }
  }

  let selectCard = (card) => {
    if(card.face){
      console.log(card);
      
    }
  }

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
    let newpack = pack.map(card => ({...card,face: true}));
    setDeck_closedArr(newpack);
  },[]);

  
  return <>
    <div className='board'>
      <div className='top-row'>
        <div className='left'>
          <div className='card deck-close' ref={deck_closed} onClick={chooseFromDeck}>
            {
              deck_closedArr.length>0?
              <img src='/images/card_back.png' style={{height:'100%',width:'100%'}}/>
              :""
            }
            
          </div>
          <div className='card deck-open' ref={open_closed}>
            {
              open_closedArr.length>0?
              <img src={open_closedArr[open_closedArr.length-1].path} style={{height:'100%',width:'100%'}} onClick={()=>{selectCard(open_closedArr[open_closedArr.length-1])}}/>
              :""
            }
          </div>
        </div>
        <div className='right'>
          <div className='card club' ref={club}></div>
          <div className='card heart' ref={heart}></div>
          <div className='card spade' ref={spade}></div>
          <div className='card diamond' ref={diamond}></div>
        </div>
      </div>
      <div className='bottom-row' ref={columns}>
        {columnsArr.map(function(column,index){
          let colcls = 'card col col'+(index+1);
          return <div key={index} className={colcls}>
            {column.map(function(card,index){
              return <img key={index} src={card.face?card.path:closedCard} className='cardImg' style={{top:index*20+"px"}} onClick={()=>{selectCard(card)}}/>
            })}
          </div>;
        })}
      </div>
    </div>
  </>;
}

export default App;