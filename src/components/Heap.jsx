import React, { useEffect, useState } from 'react'
import styled from 'styled-components';
import HeapNavbar from './HeapNavbar';
import { useHeapContext } from '../context/Heapctx';

const Heap = () => {
  const {display,heap}=useHeapContext();
  

  return (
    <Wrapper>
      <HeapNavbar/>
      <div className="display">
          <div className="binary-tree">
            {display(heap||null)}
          </div>
      </div>
    </Wrapper>
  )
}

export default Heap
const Wrapper=styled.div`
  display: grid;
  grid-template-columns: 350px 1fr;
  height: 100vh;
  max-height: 100vh;
  background: var(--grey-900);
  .binary-tree {
  padding-top: 2rem;
  display: grid;
  place-items: center;
  max-height: 90vh;
  overflow: scroll;  
  ::-webkit-scrollbar{
    display: none;
  }
  }
  .binary-tree span{
    grid-column:1/-1;
    place-items: center;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    display: grid;
    box-shadow: var(--shadow-3);
    border: 1px solid var(--grey-200);
    background: var(--green-light);
    margin: 0 auto;
    transition: all 0.15s;
    .before{
      content: '';
      /* animation: width 0.5s linear forwards; */
      margin: 0;
      padding: 0;
      position: absolute;
      width: 50%;
      height: 2rem;
      top: 0;
      left: 50%;
      right: 0%;
      transform: translateY(-100%);
      background: #000;
      background: linear-gradient(to bottom right, transparent 49%,#fff 51%,transparent 53%);
      transition: all 0.5s ease-in-out;
    } 
    .hide{
      display: none;
    }
    .after{
      background: linear-gradient(to bottom right, transparent 45%,red 51%,transparent 56%);

    }
    
  
  }
  .binary-tree :nth-child(3) > span .before{
    right: 50%;
    left: 0;
    background: #000;
    background: linear-gradient(to bottom left, transparent 49%,#fff 51%,transparent 53%);
  } 
  .binary-tree :nth-child(3) > span .after{
    background: linear-gradient(to bottom left, transparent 45%,red 51%,transparent 56%);
  }
   .binary-tree >div >span .before{
    /* content: none; */
    display: none;
  }
 
  .binary-tree div{
    position: relative;
    display: grid;
    
     grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-template-rows: 3rem auto;
    gap: 1rem;
    margin-top: 1rem;
  } 
  
  
  .binary-tree span p{
    position: absolute;
    top: -25px;
    color: var(--red-light);
    font-size: 12px;
  }
  .form{
    padding: 1rem ;
    min-width: 100%;
    box-shadow: none;
  }
  
`