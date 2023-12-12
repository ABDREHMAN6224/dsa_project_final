import React, { useEffect } from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../context/context'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const {setIsSorting,isSorting,using3d,endIt,setEndIt,setusing3d,size,setSize,setMoves,setTime,time,setPivot,setSorted,setBack,setportion,insertionSortAnimate,heapSortAnimate,shuffle,bubbleSortAnimate,mergeSortAnimate,selectionSortAnimate,quickSortAnimate}=useGlobalContext()
    
    const handleShuffle=()=>{
      setportion(null);
      setPivot(null); 
      setSorted([]);
      setBack('var(--grey-900)');
      shuffle();
    }
    const handleBubble=()=>{
     const moves=bubbleSortAnimate();
     if(using3d){
      setIsSorting(false);
       setMoves(moves);
     }
    }
    const handleSelection=()=>{
      const moves =selectionSortAnimate();
      // setMoves(moves);
      if(using3d){
        setIsSorting(false);
        setMoves(moves);
      }
    }
    const handleMerge=()=>{
      const moves =mergeSortAnimate();
      if(using3d){
        setIsSorting(false);
        setMoves(moves);
      }
      // setMoves(moves);
    }
    const handleQuick=()=>{
      const moves =quickSortAnimate();
      if(using3d){
        setIsSorting(false);
        setMoves(moves);
      }
      // setMoves(moves);
    }
    const handleInsertion=()=>{
      const moves =insertionSortAnimate();
      if(using3d){
        setIsSorting(false);
        setMoves(moves);
      }
      // setMoves(moves);
    }
    const handleHeap=()=>{
      const moves =heapSortAnimate();
      if(using3d){
        setIsSorting(false);
        setMoves(moves);
      }
    }
  return (
    <Wrapper>
      <div className="controls">
        <Link className="btn btn-danger" to="/">Home</Link>
      <div className="row">
        <h6>Size Of Arr</h6>
        <input type="range" name="size" id="" min={5} max={150} step={5} value={size} onChange={(e)=>{
          setSize(Number(e.target.value))}
        } disabled={isSorting}/>
        </div>
        <div className="row">
        <h6>Speed (max:min)</h6>
        <input type="range" name="size" id="" min={5} max={500} step={5} value={time} onChange={(e)=>{
          setTime(Number(e.target.value))}
        } disabled={isSorting}/>
        </div>
        <button type='button' onClick={handleShuffle} className='btn btn-primary' disabled={isSorting}>Shuffle Array</button>
        </div>
            <div className="sorts">

        <button type='button' onClick={handleBubble} className='btn btn-hipster' disabled={isSorting}>BubbleSort</button>
        <button type='button' onClick={handleSelection} className='btn btn-hipster' disabled={isSorting}>selectionSort</button>
        <button type='button' onClick={handleMerge} className='btn btn-hipster' disabled={isSorting}>mergeSort</button>
        <button type='button' onClick={handleQuick} className='btn btn-hipster' disabled={isSorting}>quickSort</button>
        <button type='button' onClick={handleInsertion} className='btn btn-hipster' disabled={isSorting}>insertionSort</button>
        <button type='button' onClick={handleHeap} className='btn btn-hipster' disabled={isSorting}>heapSort</button>
            </div>
            <div >
        <button type='button' onClick={()=>setusing3d(!using3d)} className='btn btn-primary' disabled={isSorting}>{using3d?"toggle to 2d":"toggleTo3d"}</button>
            </div>
    </Wrapper>
  )
}

export default Navbar

const Wrapper=styled.div`
  background: var(--grey-300);
  padding: 0px 1rem;
  height: 3rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  .controls{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 20px;
  }
  .row{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 10px;
    h6{
      margin: 0;
      font-size: 14px;
      padding: 0;
    }
  }
  .sorts{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }
    
`
