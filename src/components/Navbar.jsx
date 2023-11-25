import React from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../context/context'

const Navbar = () => {
    const {using3d,setusing3d,size,setSize,setMoves,setTime,time,setPivot,setSorted,setBack,setportion,insertionSortAnimate,heapSortAnimate,shuffle,bubbleSortAnimate,mergeSortAnimate,selectionSortAnimate,quickSortAnimate}=useGlobalContext()
    
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
       setMoves(moves);
     }
    }
    const handleSelection=()=>{
      const moves =selectionSortAnimate();
      // setMoves(moves);
      if(using3d){
        setMoves(moves);
      }
    }
    const handleMerge=()=>{
      const moves =mergeSortAnimate();
      if(using3d){
        setMoves(moves);
      }
      // setMoves(moves);
    }
    const handleQuick=()=>{
      const moves =quickSortAnimate();
      if(using3d){
        setMoves(moves);
      }
      // setMoves(moves);
    }
    const handleInsertion=()=>{
      const moves =insertionSortAnimate();
      if(using3d){
        setMoves(moves);
      }
      // setMoves(moves);
    }
    const handleHeap=()=>{
      const moves =heapSortAnimate();
      if(using3d){
        setMoves(moves);
      }
      // setMoves(moves);
    }
  return (
    <Wrapper>
        <input type="range" name="size" id="" min={5} max={120} step={5} value={size} onChange={(e)=>{
            setSize(Number(e.target.value))}
            }/>
        <input type="range" name="size" id="" min={5} max={100} step={5} value={time} onChange={(e)=>{
            setTime(Number(e.target.value))}
            }/>
        <button type='button' onClick={handleShuffle} className='btn btn-primary'>Shuffle Array</button>
        <button type='button' onClick={handleBubble} className='btn btn-hipster'>BubbleSort</button>
        {/* <button type='button' onClick={bubbleSortAnimate} className='btn btn-hipster'>BubbleSort</button> */}
        {/* <button type='button' onClick={selectionSortAnimate} className='btn btn-hipster'>selectionSort</button> */}
        <button type='button' onClick={handleSelection} className='btn btn-hipster'>selectionSort</button>
        {/* <button type='button' onClick={mergeSortAnimate} className='btn btn-hipster'>mergeSort</button> */}
        <button type='button' onClick={handleMerge} className='btn btn-hipster'>mergeSort</button>
        {/* <button type='button' onClick={quickSortAnimate} className='btn btn-hipster'>quickSort</button> */}
        <button type='button' onClick={handleQuick} className='btn btn-hipster'>quickSort</button>
        <button type='button' onClick={handleInsertion} className='btn btn-hipster'>insertionSort</button>
        {/* <button type='button' onClick={insertionSortAnimate} className='btn btn-hipster'>insertionSort</button> */}
        <button type='button' onClick={handleHeap} className='btn btn-hipster'>heapSort</button>
        <button type='button' onClick={()=>setusing3d(!using3d)} className='btn btn-hipster'>{using3d?"toggle to 2d":"toggleTo3d"}</button>
    </Wrapper>
  )
}

export default Navbar

const Wrapper=styled.div`
    
`