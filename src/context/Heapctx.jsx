import { createContext, useContext, useEffect, useState } from "react";
import { convertToTreeStructure, downHeap, getIndices, upHeap } from "../utils/trees/Heap";
import { v4 as uuid } from "uuid";
import { getXYDifference } from "../utils/utils";
const heapContext=createContext();
const HeapProvider=({children})=>{
    const [arr,setArr]=useState([]);
    const [heap,setHeap]=useState(null);
    const [choice,setChoice]=useState("min");
    const [swaps,setSwaps]=useState([])
    const [animating,setAnimating]=useState({action:'',currNode:{}});
    const timing = {
    duration: 1000,
    };
    const animate=(swaps,copy)=>{
        if(swaps.length<1){
            return;
        }
        const currMove=swaps.shift();
        const {id_1,id_2}=currMove;
        
        const elem1=document.getElementById(id_1);
        const elem2=document.getElementById(id_2); 
        console.log(elem1);
        console.log(elem2);
        let divs=document.querySelectorAll(".before") ;
        for(let i=0;i<divs.length;i++){
            divs[i].classList.add("hide");
        }
        let elem1_x = elem1.getBoundingClientRect().x;
        let elem2_x = elem2.getBoundingClientRect().x;
        let elem1_y = elem1.getBoundingClientRect().y;
        let elem2_y = elem2.getBoundingClientRect().y;
        const diff = getXYDifference(elem1_x, elem2_x, elem1_y, elem2_y);
        let animatedc;
        let animatedp;
        if(diff[0]>=0 && diff[1]>=0){
            animatedc = [
                { translate: `${-diff[0]}px  ${-diff[1]}px` },
            ];        
            animatedp = [
                    { translate: `${diff[0]}px  ${diff[1]}px` },
            ];
        }
        else if(diff[0]<0 && diff[1]>=0){
            animatedc = [
                { translate: `${-diff[0]}px  ${-diff[1]}px` },
            ];        
            animatedp = [
                { translate: `${diff[0]}px  ${diff[1]}px` },
            ];
        }
        else if(diff[1]<0 && diff[0]>=0){
            animatedc = [
                { translate: `${-diff[0]}px  ${-diff[1]}px` },
            ];        
            animatedp = [
                { translate: `${diff[0]}px  ${diff[1]}px` },
            ];
        }else{
            animatedc = [
                { translate: `${-diff[0]}px  ${-diff[1]}px` },
            ];        
            animatedp = [
                { translate: `${diff[0]}px  ${diff[1]}px` },
            ];
        }
        elem1.animate(animatedp, timing)
        elem2.animate(animatedc, timing)
        setTimeout(()=>{
            let i1=getIndices(copy,id_1);            
            let i2=getIndices(copy,id_2);
            console.log(copy);
            [copy[i1],copy[i2]]=[copy[i2],copy[i1]];
            if(currMove.action=="delete"){
                copy.pop();
            }
            setArr([...copy]);
            let divs=document.querySelectorAll(".before") ;
            for(let i=0;i<divs.length;i++){
                divs[i].classList.remove("hide");
            }
            setTimeout(()=>{
                animate(swaps,copy);
            },300)
},1000)

        
    }
    const display= (root)=>{
    if(root!==null){
      return (<div >
        {
          animating.action==="compare" && animating.currNode==root?
         <span id={root.id}  style={{backgroundColor:"var(--red-dark)",color:"white"}}>{root.value}
          <div className='before' ></div>
          </span>:
         <span id={root.id}  style={{backgroundColor:"var(--grey-200)"}}>{root.value}
            <div className='before'></div>
          </span>

        }
                {root.left?display(root.left):<div></div>}
                {root.right?display(root.right):<div></div>}
          </div>)}
      
    
  }
  useEffect(()=>{
  },[heap])
    useEffect(()=>{
        let temp=convertToTreeStructure(arr);
        setHeap(()=>({...temp}))
    },[arr]);
    const insertInArr=(val)=>{
        let temp=JSON.parse(JSON.stringify(arr));
        temp.push({id:uuid(),value:Number(val),left:null,right:null});
        let copy=JSON.parse(JSON.stringify(temp));
        setArr(JSON.parse(JSON.stringify(temp)));
        upHeap(temp.length-1,choice,temp,swaps);
        setTimeout(()=>{
            animate(swaps,copy);
        },100)
                // console.log(swaps);

    }
    const deleteFromArr=()=>{
        const temp=JSON.parse(JSON.stringify(arr));
        const copy=JSON.parse(JSON.stringify(temp));
        swaps.push({action:"delete",id_1:copy[0].id,id_2:copy[copy.length-1].id});
        temp[0]=temp[temp.length-1];
        temp.pop();
        downHeap(0,choice,temp,swaps);
        setTimeout(()=>{
            animate(swaps,copy);
        },100)
    }
    return (
        <heapContext.Provider value={{arr,heap,insertInArr,display,choice,setChoice,deleteFromArr}}>
            {children}
        </heapContext.Provider>
    )
}
export default HeapProvider
export const useHeapContext=()=>useContext(heapContext);