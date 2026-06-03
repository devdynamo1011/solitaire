import { useEffect, useRef, useState } from 'react';
import generatepack from './generatepack'
import closedCard from './images/card_back.png';
import './App.css'
import validdropcard from './validdropcard';
import { cardValue } from './constants';

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
  let [dropCard,setDropCard] = useState(null);
  
  let chooseFromDeck = () => {
    if(deck_closedArr.length>0){
      let card = deck_closedArr.pop();
      setOpen_closedArr([...open_closedArr,card]);
    }else{
      setDeck_closedArr(open_closedArr.reverse());
      setOpen_closedArr([]);
    }
  }

  let moveCard = (card) => {
    if (!card.face) return;
    
    if (chooseCard === null) {
        setChooseCard(card);
    } else {
        setDropCard(card);
        let source = "";
           
        if(open_closedArr.length>0){
          if(open_closedArr[open_closedArr.length-1].id == chooseCard.id){
            source = "open";
          }
        }
        
        if( source == "open" && validdropcard(open_closedArr[open_closedArr.length-1], card)){
          let dr,dc;
          columnsArr.forEach(function(column,colIndex){
              column.forEach(function(_card,cardIndex){
                if(card.id == _card.id){
                  dr = cardIndex;
                  dc = colIndex;
                  return
                }
              });
          });
          let _card = open_closedArr.pop();
          _card.face = true;
          columnsArr[dc].push(_card);
          return;
        }
        
        if (validdropcard(chooseCard, card)){
            let cr,cc,dr,dc;
            columnsArr.forEach(function(column,colIndex){
                column.forEach(function(_card,cardIndex){
                  if(chooseCard.id == _card.id){
                    cr = cardIndex;
                    cc = colIndex;
                    return
                  }else if(card.id == _card.id){
                    dr = cardIndex;
                    dc = colIndex;
                    return
                  }
                });
            });
            
            let x = columnsArr[cc].length - cr + 1;
            let cardSlice = columnsArr[cc].splice(cr,x);
            columnsArr[cc][columnsArr[cc].length-1].face = true;
            columnsArr[dc].push(...cardSlice);
            return;
        }
        
        setChooseCard(null);
        setDropCard(null);
    }
  }

  let finalPlace = (T) => {
    console.log(T);
    console.log(chooseCard);
    
    if(T == 'club'){
      if(clubArr.length == cardValue.indexOf(chooseCard.value)){
        setClubArr([...clubArr,chooseCard]);
      }
    } else if (T == 'spade') {
      if(spadeArr.length == cardValue.indexOf(chooseCard.value)){
        setSpadeArr([...spadeArr,chooseCard]);
      }
    } else if (T == 'heart') {
      if(heartArr.length == cardValue.indexOf(chooseCard.value)){
        setHeartArr([...heartArr,chooseCard]);
      }
    } else if (T == 'diamond') {
      if(diamondArr.length == cardValue.indexOf(chooseCard.value)){
        setDiamondArr([...diamondArr,chooseCard]);
      }
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
              <img src={open_closedArr[open_closedArr.length-1].path} 
              style={{height:'100%',width:'100%'}} 
              onClick={()=>{moveCard(open_closedArr[open_closedArr.length-1])}}/>
              :""
            }
          </div>
        </div>
        <div className='right'>
          <div className='card club'>
            <img src='/images/club.png' onClick={()=>{finalPlace('club')}} ref={club} style={{height:'100%',width:'100%'}}/>
          </div>
          <div className='card heart'>
            <img src='/images/heart.png' onClick={()=>{finalPlace('heart')}} ref={heart} style={{height:'100%',width:'100%'}}/>
          </div>
          <div className='card spade'>
            <img src='/images/spade.png' onClick={()=>{finalPlace('spade')}} ref={spade} style={{height:'100%',width:'100%'}}/>
          </div>
          <div className='card diamond'>
            <img src='/images/diamond.png' onClick={()=>{finalPlace('diamond')}} ref={diamond} style={{height:'100%',width:'100%'}}/>
          </div>
        </div>
      </div>
      <div className='bottom-row' ref={columns}>
        {columnsArr.map(function(column,index){
          let colcls = 'card col col'+(index+1);
          return <div key={index} className={colcls}>
            {column.map(function(card,index){
              return <img key={index} 
              src={card.face?card.path:closedCard} 
              className='cardImg' 
              style={{top:index*20+"px"}} 
              onClick={()=>{moveCard(card)}}/>
            })}
          </div>;
        })}
      </div>
    </div>
  </>;
}

export default App;