import React, { useEffect, useRef, useState } from 'react'
import CreateNode from './CreateNode';
import styled from 'styled-components';
import { balanceTree, deleteVal, searchValue } from '../utils/trees/BinaryTree';
import TreeNavbar from './TreeNavbar';
import { v4 as uuid } from 'uuid';

const TreeVisualizer = () => {
  const [tree,setTree] =useState({root:null});
  const [search,setSearch] =useState('');
  const [change,setChange]=useState(false) 
  const [render, setRender] = useState(false);
  const [value, setValue] = useState('');
  const [rotatingTree,setRotating]=useState({type:"",tree:null});
  const [context,setContext]=useState(null)
  const [swaps,setSwaps]=useState([])
  const [val,setVal]=useState("");


  const [animating,setAnimating]=useState({action:"",currNode:""})
  const [autoBalance,setAutoBalance]=useState(true)
  
  
  const display= (root)=>{
    if(root!==null){
      return (<div >
        {
          animating.action==="compare" && animating.currNode==root?
         <span id={root.id}  style={{backgroundColor:"var(--red-dark)",color:"white"}}>{root.value}
          <div className='before' ></div>
          <p>{root.height}</p>
          </span>:
          animating.action==="rotating" && animating.currNode==root?
         <span id={root.id}  style={{backgroundColor:"var(--primary-600)",color:"white"}}>{root.value}
            <div className='before'></div>
          <p>{root.height}</p>
          </span>:animating.action==="found" && animating.currNode==root?<span id={root.id}  className='found' style={{backgroundColor:"yellow"}}>{root.value}
                    <div className='before'></div>

          <p>{root.height}</p>
          </span>
          :
         <span id={root.id} className={animating.action==="not_found"?"no-match":""}>{root.value}
                    <div className='before'></div>

          <p>{root.height}</p>
          </span>


        }
                {root.left?display(root.left):<div></div>}
                {root.right?display(root.right):<div></div>}
          </div>)}
      
    
  }
  const handleSubmit=(e)=>{
    e.preventDefault();

    // tree.root=insertInBinaryTree(Number(value),350,100,context)
    tree.root={value:Number(value),left:null,right:null,height:0,id:"n_"+uuid()}
    setRender(true)
  }
  
  const handleBalanace=()=>{
    const animate=async ()=>{
      const root=await balanceTree(tree.root,setAnimating,swaps)
      setTree({root:root})
      setAnimating({action:"",currNode:""})
    }
    animate()
    
    
  }
  const handleSearch=(e)=>{
    e.preventDefault()
    const animate=async ()=>{
      await searchValue(tree.root,Number(search),setAnimating)
    }
    animate()
    
  }
    useEffect(()=>{
      if(animating.action==="found"||animating.action==="not_found"){
        setTimeout(()=>{
          setAnimating({action:"",currNode:""})
        },400)
  
      }
    },[animating])
    
  return (
    <main>
      <TreeNavbar/>
    <Wrapper>
      <div className="nodes">
        {/* //only for binary search trees and avl trees */}
         <form action="" className='form' onSubmit={handleSubmit}>
          <div className="form-row">
        <label htmlFor="" className='form-label'>Root</label>
          <input type="number" value={value} className='form-input' placeholder='Enter Root Node' onChange={(e)=>{ const val=e.target.value
            setValue(val)}} />
            </div>
          <button type="submit" className='btn btn-danger' >Enter</button>
        </form>
        {render && <CreateNode swaps={swaps} node={tree.root} ctx={context} change={change} setChange={setChange} setTree={setTree} setRotating={setRotating}  setAnimating={setAnimating} autoBalance={autoBalance}/>}
            {render && 
        <form className='form' >
          <div className="form-row">
          <label htmlFor="" className='form-label'>Search</label>
          <input type="text" name="search" value={search} onChange={(e)=>setSearch(e.target.value)} className='form-input'  placeholder='Enter Value to Seacrh' />
          
            </div>
          <button type="submit" className='btn btn-danger' onClick={handleSearch} >Enter</button>
        </form>
        }
        {/* //only for binary search trees */}

        {/* {autoBalance ? <button onClick={()=>setAutoBalance(!autoBalance)} className="btn  btn-hipster">Set Manual Balance</button>:
        <button onClick={()=>setAutoBalance(!autoBalance)} className="btn  btn-hipster">Set Auto Balance</button>} */}
        {/* {render && !autoBalance && <button onClick={handleBalanace} className="btn  btn-primary">balance</button>} */}
        {/* {tree.root && 
        <form action="" className='form node-input'>
        <div className="form-row">
        <label htmlFor="" className='form-label'>Value</label>
        <input type="number" className='form-input' value={val} placeholder='Enter Other Values' onChange={(e)=>{
            const val=e.target.value
            setVal(val)
        }} />
        </div>
        <button className='btn btn-danger' type="submit" onClick={handleDelete}>DeleteNode</button>
    </form> 
        // <button onClick={()=>setTree({root:null})} className="btn  btn-danger">Delete Tree</button>
        } */}
        
      </div>
      <div className="display-container">
        {/* <canvas id='tree' width={"700"} height={"700"} style={{background:"yellow"}}></canvas> */}
      {tree.root &&
        <div className="binary-tree preorde inorde postorde">
          {display(tree.root)}
        </div>
      }
      </div>
   </Wrapper>
  </main>
  )
}

export default TreeVisualizer

const Wrapper=styled.div`

  background-color: var(--grey-900);
  /* padding: 3rem; */
  display: grid;
  grid-template-columns:250px 1fr ;
  height: 100vh;
  .no-match{
    background-color: red!important;
    scale: 1.4;
  }
  .found{
    animation: grow .15s linear;
  }
  @keyframes grow {
    0%{
      transform: scale(1.1);
    }
    50%{
      transform: scale(1.2);
      
    }
    100%{
      transform: scale(1);

    }
    
  }
  .form{
    max-width: 290px;
    margin: 0;
    padding-top: 0rem;
    background: var(--grey-700);
    color: var(--grey-50);
  }
  .btn{
    max-width: 200px;
  }
  .nodes{
    background: var(--grey-700);
    padding: 3rem;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
    gap: 2rem;
    align-items: center;
  }
  .display-container{
    padding: 3rem;
    /* display: flex; */
    margin:0 auto;
    /* align-items: center; */
    /* justify-content: center; */
    position: relative;
    min-width: 100%;
    min-height: 90vh;
    height: auto;
    background: var(--grey-900);
    

  }
  .animating-section{
    position: absolute;
    top: 20px;
    right: 20px;
    width: 300px;
    height: 300px;
    background: white;
    overflow: hidden;
}
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
  @keyframes moveWidth {
    0%{
      height:0;
    }
    100%{
      height:2rem;
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
  
  .inorder div,.preorder div,.postorder div{
    display: flex;
    margin: 0;
    gap: 0;
  }
  .inorder span::before,.preorder span::before,.postorder span .before{
   content: none;
  }
  .preorder :nth-child(1){
    order: 1;

  }
  .preorder :nth-child(2){
    order: 2;

  }
  .preorder :nth-child(3){
    order: 3;
  }

  .inorder :nth-child(1){
    order: 2;

  }
  .inorder :nth-child(2){
    order: 1;

  }
  .inorder :nth-child(3){
    order: 3;
  }
  .postorder :nth-child(1){
    order: 3;

  }
  .postorder :nth-child(2){
    order: 1;

  }
  .postorder :nth-child(3){
    order: 2;
  }
  ::-webkit-scrollbar{
    display: none;
  }
`