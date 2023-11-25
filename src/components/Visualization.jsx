import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../context/context'
import { v4 as uuid } from 'uuid';

const Visualization = () => {
    const {array,size,move,back,pivot,time=0.9,portion}=useGlobalContext();
    const [background,setBackground]=useState('var(--grey-900)')
    const [width,setWidth]=useState(0)

  return (
<Wrapper >
  <div className="array-container">
    <div className="background">
    {
      array.map((e,i)=>{
        if(portion && (i>=portion[0] && i<=portion[1])){
          return <div key={uuid()} style={{height:"100%",width:size<30?`${450/size}px`:size<70?`${820/size}px`:`${850/size}px`,background:"var(--grey-300)"}}></div>
        }else{
          return <div key={uuid()} style={{height:"100%",width:size<30?`${450/size}px`:size<70?`${820/size}px`:`${850/size}px`,background:"transparent"}}></div>
        }

      })
    }
    </div>
      {
          array.map((e,i)=>{
            // if(sorted.length>1 && i>=sorted[0] && i<=sorted[1]){
            // return(
            //   <div key={i} className='bar' style={{height:`${size<15?e*20:size<50?e*8:size<80?e*5:e*4}px`,width:size<30?`${450/size}px`:size<70?`${820/size}px`:`${850/size}px`,backgroundColor:"green"}}>
            //   </div>
            // )
            // }
            if(move && move.indices?.includes(i)){
              if(move?.action==="swapped"){
              return(
                <div key={uuid()} className={`bar `} style={{height:`${size<15?e*20:size<50?e*8:size<80?e*5:e*4}px`,width:size<30?`${450/size}px`:size<70?`${820/size}px`:`${850/size}px`,backgroundColor:e==pivot?"white":back}}>
              </div>)

              }
            return(
              <div key={uuid()} className='bar' style={{height:`${size<15?e*20:size<50?e*8:size<80?e*5:e*4}px`,width:size<30?`${450/size}px`:size<70?`${820/size}px`:`${850/size}px`,backgroundColor:e==pivot?"white":back}}>
            </div>)

            }
            return(
              <div key={uuid()} className='bar' style={{height:`${size<15?e*20:size<50?e*8:size<80?e*5:e*4}px`,width:size<30?`${450/size}px`:size<70?`${820/size}px`:`${850/size}px`,backgroundColor:e==pivot?"white":background}}>
            </div>
            ) 
              

          })
        }
    </div>
</Wrapper>  )
}

export default Visualization

const Wrapper=styled.div`


  overflow: hidden;
    min-height: 600px;
    background-color: var(--grey-200);
    display: flex;
    justify-content: center;
    text-align: center;
    padding: 1rem;
    padding-bottom: 0;
    .array-container{
      position: relative;
      display: flex;
      align-items: flex-end;
    }
    .background{
      position: absolute;
      inset: 0;
      display: flex;
      align-items: flex-end;
      div{
        margin: 1.3px;
      }
    }
  .bar {
    background-color:var(--grey-900);
    margin: 1.3px;
    position: relative;
  }
  .bar::after{
    content:"";
    border-radius: 18px;
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
  position: absolute;
  top: -40px;
  left: 0;
  width: 100%;
  background: var(--primary-500);
  height: 40px;
}

`

