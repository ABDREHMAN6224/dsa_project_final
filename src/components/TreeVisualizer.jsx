import React, { useEffect, useRef, useState } from 'react'
import CreateNode from './CreateNode';
import styled from 'styled-components';
import { BFS, balanceTree, deleteVal, inOrderTraversal, postOrderTraversal, preOrderTraversal, searchValue } from '../utils/trees/BinaryTree';
import TreeNavbar from './TreeNavbar';
import { v4 as uuid } from 'uuid';
import { useTreeContext } from '../context/TreeContext';
import SegmentTree from './SegmentTree';

const TreeVisualizer = () => {
  const [tree,setTree] =useState({root:null});
  const [search,setSearch] =useState('');
  const [change,setChange]=useState(false) 
  const [render, setRender] = useState(false);
  const [rotatingTree,setRotating]=useState({type:"",tree:null});
  const [context,setContext]=useState(null)
  const [swaps,setSwaps]=useState([]);

  const [animating,setAnimating]=useState({action:"",currNode:""})
  const [autoBalance,setAutoBalance]=useState(true)
  const {selected}=useTreeContext();
  
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
    setRender(true)
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
  const animateTraversals=(arr,ids)=>{
    if(arr.length<1){
      setTimeout(()=>{
        revertChnages(ids);
      },400)
      return;
    }
    const {id,value}=arr.shift();
    
    const elem=document.getElementById(id);
    elem.style.backgroundColor="var(--red-dark)";
    const temp=document.createElement('h3');
    document.getElementById('answer').appendChild(temp);
    temp.innerHTML=value;

    setTimeout(()=>{
      elem.style.backgroundColor="green";
      elem.style.color="white";
      animateTraversals(arr,ids);
    },400)
  }
  const revertChnages=(array)=>{
    if(array.length<1){
      return;
    }
    console.log(array);
    const {id}=array.shift();
    const elem=document.getElementById(id);
    elem.style.backgroundColor="var(--green-light)";
    elem.style.color="black";
    revertChnages(array)
  }
  useEffect(()=>{
    if(document.getElementById('answer') ){
      document.getElementById('answer').innerHTML="";
    }
   },[tree])
  return (
    <main>
      <TreeNavbar setAutoBalance={setAutoBalance} setTree={setTree}/>
      {selected=="Segment Tree"?<SegmentTree/> :
    <Wrapper>
      <div className="nodes">
        <CreateNode swaps={swaps} node={tree.root} ctx={context} change={change} setChange={setChange} setTree={setTree} setRotating={setRotating}  setAnimating={setAnimating} autoBalance={autoBalance} handleSubmit={handleSubmit}/>
            {render && 
        <form className='form' >
          <div className="form-row">
          <label htmlFor="" className='form-label'>Search</label>
          <input type="text" name="search" value={search} onChange={(e)=>setSearch(e.target.value)} className='form-input'  placeholder='Enter Value to Seacrh' />
          
            </div>
          <button type="submit" className='btn btn-danger' onClick={handleSearch} >Enter</button>
        </form>
        }
        {render &&
        <div className="controls">
          <button className="btn btn-hipster btn-block" onClick={()=>{
            let arr=[];
            
            document.getElementById('answer').innerHTML="";
            inOrderTraversal(tree.root,arr);
            let ids=JSON.parse(JSON.stringify(arr));
            animateTraversals(arr,ids);
          }}>Inorder</button>
          <button className="btn btn-hipster btn-block" onClick={()=>{
          let arr=[];
          
          document.getElementById('answer').innerHTML="";
          preOrderTraversal(tree.root,arr);
            let ids=JSON.parse(JSON.stringify(arr));
            animateTraversals(arr,ids);

          }}>PreOrder</button>
          <button className="btn btn-hipster btn-block" onClick={()=>{
          let arr=[];
          
          document.getElementById('answer').innerHTML="";
          postOrderTraversal(tree.root,arr);
            let ids=JSON.parse(JSON.stringify(arr));
            animateTraversals(arr,ids);
          }}>PostOrder</button>
          <button className="btn btn-hipster btn-block" onClick={()=>{
            let arr=[];
            
            document.getElementById('answer').innerHTML="";
            BFS(tree.root,arr);
            let ids=JSON.parse(JSON.stringify(arr));
            animateTraversals(arr,ids);
          }}>BFS</button>
        </div>
        }
        
      </div>
      <div className="display-container" >
      {tree.root &&
        <div className="binary-tree preorde inorde postorde">
          {display(tree.root)}
        </div>
      }
      <div id="answer"></div>
      </div>
   </Wrapper>
   }
  </main>
  )
}

export default TreeVisualizer

const Wrapper=styled.div`

  background-color: var(--grey-900);
  display: grid;
  grid-template-columns:250px 1fr ;
  max-height: 92vh;
  min-height: 92vh;
  overflow: hidden;
  .display-container{
    height: 100vh;
  }
  #answer{
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 1rem;
    gap: 1.8rem;
    font-size: 2.3rem;
    font-weight: 900;
    max-width: 90vw;
    flex-wrap: wrap;
    h3{
      margin: 0;
      padding: 0;
    
    }
  }
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
    overflow: hidden;
    background: var(--grey-100);
    /* background: white; */
    form{
      color: black;
      background: white;
      background: var(--grey-100);
    }
    padding: 2rem;
    display: flex;
    flex-direction: column;
    overflow: hidden;
    position: relative;
    gap: 2rem;
    align-items: center;
  }
  .display-container{
    padding: 1rem;
    /* margin:0 auto; */
    position: relative;
    min-width: 100%;
    min-height: 90vh;
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
  .controls{
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
`