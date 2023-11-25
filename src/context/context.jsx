import {  createContext, useContext, useEffect, useState } from "react";
import { generateArray, shuffleArray } from "../utils/utils";
import { bubbleSort, heapSort, insertionSort, mergeSort, quickSort, selectionSort, sleep } from "../utils/sorting";

const AppContext=createContext()

const AppProvider=({children})=>{
    const [time,setTime]=useState(10);
    const [size,setSize]=useState(10)
    const [moves,setMoves]=useState([])
    const [array,setArray]=useState(generateArray(size))
    const [pivot,setPivot]=useState(null)
    const [portion,setportion]=useState(null)
    const [back,setBack]=useState(["var(--grey-900)"]);
    const [move,setMove]=useState({});
    const [sorted,setSorted]=useState([])
    const [jmp,setJmp]=useState([]);
    const [using3d,setusing3d]=useState(false);



    const mergeSortAnimate=()=>{
        setMove({})
        setJmp([])
        setportion(null);
        setPivot(null); 
        const tempArray=[...array]
        const swaps= mergeSort(tempArray,0,array.length-1);
        const temp=swaps.filter((s)=>s.action=="swapped" && s.value)
        if(!using3d){
            animate(swaps);
        }
        return swaps;
        
    }
    const heapSortAnimate=()=>{
        setMove({})
        setJmp([])
        setPivot(null);
        setportion(null);
        const tempArray=[...array]

        const swaps= heapSort(tempArray);
        if(!using3d){

            animate(swaps)
        }
        return swaps
    }
    const bubbleSortAnimate=()=>{
        setMove({})
        setJmp([])
        setPivot(null);
        setportion(null);
        const tempArray=[...array]
        if(!using3d){

            animate(bubbleSort(tempArray));
        }
        const swaps=bubbleSort(tempArray);
        // setMoves(swaps)
        return swaps
    }
    const selectionSortAnimate=()=>{
        setMove({})
        setJmp([])
        setPivot(null);
        setportion(null);
        const tempArray=[...array]
        if(!using3d){

            animate(selectionSort(tempArray));
        }
        return selectionSort(tempArray);
    }
    const quickSortAnimate=()=>{
        setMove({})
        setJmp([])
        setportion(null);
        setPivot(null);
        const tempArray=[...array]
        const swaps= quickSort(tempArray,0,array.length-1);
        if(!using3d){

            animate(swaps)
        }
        return swaps
        
    }
    const insertionSortAnimate=()=>{
        setMove({})
        setJmp([])
        setportion(null);
        setPivot(null);
        const tempArray=[...array]
        const swaps= insertionSort(tempArray);
        if(!using3d){

            animate(swaps)
        }
        return swaps

    }
    const animate=(swaps)=>{
        if(swaps?.length<1){
            return;
        }
        const currMove=swaps.shift();
        // setSwaps(swaps.slice(1));
        const [i, j] = currMove.indices;
        const large=i>=j?i:j;
        const small=i<j?i:j;
        setMove({...currMove,indices:[small,large]});
        if(currMove.action==="sorted"){
            setSorted(currMove.indices)
        }
        if (currMove.action === "put") {
            setBack("var(--green-light)")
            const k=currMove.value
            array[j]=k
        }
        else if(currMove.action=="compare"){
            setBack("yellow")
        }
        else if (currMove.action === "swapped") {
            setBack("var(--primary-900)");
            [array[i], array[j]] = [array[j], array[i]];
            setArray(array)
            
        }
        else if(currMove.action==="portion"){
            setportion(currMove.indices)
        }
        if (currMove.action === "pivot") {
            setPivot(currMove.value)
        }
        setTimeout(()=>{
            animate(swaps);
        },time)

    }
    const shuffle=()=>{
        setArray(generateArray(size))
    }
    useEffect(()=>{
        setArray(generateArray(size))
    },[size])
    return <AppContext.Provider value={{using3d,setusing3d,setMoves,setArray,jmp,sorted,moves,setSorted,insertionSortAnimate,array,setSize,setTime,time,size,pivot,heapSortAnimate,shuffle,animate,portion,move,bubbleSortAnimate,quickSortAnimate,setBack,back,selectionSortAnimate,mergeSortAnimate,setPivot,setportion}}>
        {children}
    </AppContext.Provider>
}
export default AppProvider

export const useGlobalContext=()=>useContext(AppContext);