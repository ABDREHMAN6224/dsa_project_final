import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useTreeContext } from '../context/TreeContext'
import { treeAnalysis, treeCodes } from '../utils/analysis';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const trees=["Segment Tree","Binary Search Tree","AVL Tree","Red Black Tree"];
const TreeNavbar = ({setAutoBalance,setTree}) => {
  const {selected,setSelected,setOpenInfo,openInfo}=useTreeContext();
  const handleClick=(t)=>{
    setSelected(t);
  }
  useEffect(()=>{
    setOpenInfo(false);
    setTree({root:null});
    if(selected=="AVL Tree"){
      setAutoBalance(true);
    }else{
      setAutoBalance(false);
    }
  },[selected])
  return (
    <Wrapper>
      <Link to={"/"} className='btn btn-danger back'>Home</Link>
      <h3>Trees</h3>
      <div className="trees">
      {trees.map((t,i)=>{
        return <button key={i} onClick={()=>handleClick(t)} className={`${selected===t?"selected btn btn-primary btn-hero":"selected btn btn-hipster"}`}>{t}</button>
      })}
      </div>
      <button className={`${openInfo?"btn btn-danger":"btn btn-hipster"}`} onClick={()=>setOpenInfo(!openInfo)}>Analysis</button>
      {openInfo && 
      <div className="infos">
        <h2>
          {selected}
          </h2>
          <h4>Complexity Analysis</h4>
          <div className="times">
            {Object.keys(treeAnalysis[selected]).map((elem,i)=>{
              return <div key={i} className='single'>
                <h4 >{elem} :</h4>
                {selected==="Binary Search Tree"?
                  treeAnalysis[selected][elem].split(",").map((e,i)=>{
                    return <h5> {e}</h5>
                  })
                :
                <h5>{treeAnalysis[selected][elem]}</h5>
                }
              </div> 
            })}
          </div>
          <button className='btn  btn-primary btn-hero' onClick={()=>{
            navigator.clipboard.writeText(treeCodes[selected]);
            toast.success("Code Copied to Clipboard")
          }}>Copy C++ code</button>
      </div>
      }
    </Wrapper>
  )
}

export default TreeNavbar
const Wrapper=styled.div`
  height: 8vh;
  position:relative;
  padding: 1.3rem;
  padding-left: 5.4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: var(--grey-700);
  border-bottom: 1px solid var(--grey-500);
  h3{
    margin: 0;
    color: var(--red-light);
    color: var(--green-light);
    font-weight: bold;
    text-transform: capitalize;
  }
  .btn-hipster{
    color: var(--grey-900);
    &:hover{
      color: white;
    }
  }
  .trees{
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 1rem;
  }
  .infos{
    position:absolute;
    width:400px;
    height:700px;
    background:var(--primary-200);
    top:4rem;
    right:20px;
    z-index:2;
    border-radius:var(--borderRadius);
    padding:1rem;
    display: flex;
    flex-direction: column;
    gap: 1.3rem;
    padding: 2rem;
    h2{
      font-weight: bold;
      text-align: center;
      color: var(--grey-900);
    }
    h4{
      text-align: center;
      font-weight: bold;
    }
     .single{
    display: flex;
    flex-direction: column;
    h5{
      margin: 0;
      text-transform: lowercase;
    }
    h4{
      margin: 0;
      font-weight: bold;
      text-align: start;

    }
    
  }
  .times{
    display: flex;
    flex-direction: column;
    gap: 1.3rem;
  }
  }
  .btn{
    margin-top: 2rem;
  }
  .back{
    position: absolute;
    top: -10px;
    left: 5px;
  }
`
