import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../context/context'
import { v4 as uuid } from 'uuid';
import { codes, sortingAnalysis } from '../utils/analysis';
import { toast } from 'react-toastify';
import Information from './Information';

const Visualization = () => {
    const {array,size,move,back,pivot,time=0.9,portion,currentSort,noOfComps,noOfSwaps,sorted}=useGlobalContext();
    const [background,setBackground]=useState('var(--grey-800)')
    const [width,setWidth]=useState(0)
    useEffect(()=>{
      console.log(sortingAnalysis[currentSort]);
    },[])
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
            if(sorted.length>1 && i>=sorted[0] && i<=sorted[1]){
            return(
              <div key={i} className='bar' style={{height:`${size<15?e*20:size<50?e*8:size<80?e*5:e*4}px`,width:size<30?`${450/size}px`:size<70?`${820/size}px`:`${850/size}px`,backgroundColor:"rgb(12, 162, 24)"}}>
              </div>
            )
            }
            if(move && move.indices?.includes(i)){
              if(move?.action==="swapped"){
              return(
                <div key={uuid()} className={`bar `} style={{height:`${size<15?e*20:size<50?e*8:size<80?e*5:e*4}px`,width:size<30?`${450/size}px`:size<70?`${820/size}px`:`${850/size}px`,backgroundColor:e==pivot?"rgb(180, 28, 162)":back}}>
              </div>)

              }
            return(
              <div key={uuid()} className='bar' style={{height:`${size<15?e*20:size<50?e*8:size<80?e*5:e*4}px`,width:size<30?`${450/size}px`:size<70?`${820/size}px`:`${850/size}px`,backgroundColor:e==pivot?"rgb(180, 28, 162)":back}}>
            </div>)

            }
            return(
              <div key={uuid()} className='bar' style={{height:`${size<15?e*20:size<50?e*8:size<80?e*5:e*4}px`,width:size<30?`${450/size}px`:size<70?`${820/size}px`:`${850/size}px`,backgroundColor:e==pivot?"rgb(180, 28, 162)":background}}>
            </div>
            ) 
              

          })
        }
    </div>
    <Information show={true}/>
</Wrapper>  )
}

export default Visualization

const Wrapper=styled.div`
  display: grid;
  grid-template-columns: 1fr 400px;
  overflow: hidden;
  min-height: 600px;
  background-color: var(--grey-200);

    max-height: 90vh;
    min-height: 93vh;
    padding: 1rem;
    padding-top: 0;
    padding-right: 0;
    padding-bottom: 0;

    .array-container{
      position: relative;
      display: flex;
      align-items: flex-end;
    justify-content: center;
    text-align: center;
  }
  .background{
    position: absolute;
    inset: 0;
    display: flex;
    justify-content: center;
    text-align: center;
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
  background: var(--red-dark);
  height: 40px;
}
`

