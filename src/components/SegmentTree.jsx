import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { populate, queryData, update } from '../utils/trees/SegmentTree'

const SegmentTree = () => {
    const [arr,setArr]=useState([])
    const [val,setVal]=useState('')
    const [u_val,setU_Val]=useState([])
    const [u_val1,setU_Val1]=useState('')
    const [tree,setTree]=useState({})
    const [op,setOp]=useState('')
    const [query,setQuery]=useState([])
    const [ans,setAns]=useState('')
    const [ques,setQues]=useState('')
    const [animating,setAnimating]=useState({action:"",currNode:""})
  
  const display= (root)=>{
    if(root!==null){
      return (<div>
        {
          animating.action==="in_moving" && animating.node==root?
                <span style={{border:"8px solid green"}}>
                    <p>{root.value}</p>
                    <p>[{root.start},{root.end}]</p>
                </span>
          :
          animating.action==="out_moving" && animating.node==root?
                <span style={{border:"8px solid red"}}>
                    <p>{root.value}</p>
                    <p>[{root.start},{root.end}]</p>
                </span>
:   animating.action==="par_moving" && animating.node==root?
                <span style={{border:"8px solid yellow"}}>
                    <p>{root.value}</p>
                    <p>[{root.start},{root.end}]</p>
                </span>
:
                <span >
                    <p>{root.value}</p>
                    <p>[{root.start},{root.end}]</p>
                </span>
          
          
        }
                {root.left?display(root.left):<div></div>}
                {root.right?display(root.right):<div></div>}
          </div>)}
      
    
  }
    const handleSubmit=(e)=>{
        e.preventDefault();
        let data=val.split(",");
        data=data.map((d)=>Number(d))    
        setArr(data)
        setTree(populate(data,0,data.length==0?0:data.length-1,op))
    }
    const handleQuerySubmit=(e)=>{
        e.preventDefault();
        let data=ques.split(",");
        data=data.map((d)=>Number(d)) 
        setQuery(data)
        const animate=async()=>{
            setAns(`Answer: ${await queryData(tree,data[0],data[1],op,setAnimating)}`)
            setAnimating({action:"",node:null})
          }   
        if(data[0]>=0 && data[1]<arr.length){
            animate()
          }else{
            setAns('Please Enter valid index range')
          }

    }
    const hanldeUpdate=(e)=>{
      e.preventDefault();
      let data=u_val1.split(",");
      console.log(data);
      data=data.map((d)=>Number(d)) 
      setU_Val(data)
       const animate=async()=>{
            const newValue=await update(tree,data[0],data[1],op,setAnimating)
            tree.value=newValue;
            setTree(tree)
            setAnimating({action:"",node:null})
          }
          animate()
      }   

    
  return (
    <Wrapper>
        <div className="options">
        <form className="form">
            <div className="form-row">
                <label className="form-label">Insert Array Separated by Commas</label>
                <input type="text"  value={val} required className='form-input' onChange={((e)=>setVal(e.target.value))}/> 
            </div>
            <div className="form-row">
                <label className="form-label">Insert Operation</label>
                <input type="text"  value={op} required placeholder='a,s,m' className='form-input' onChange={((e)=>setOp(e.target.value))}/>
            </div>
            <button type="submit" className='btn btn-primary' onClick={handleSubmit}>Submit</button>
        </form>
        <form className="form">
            <div className="form-row">
                <label className="form-label">Insert Query range</label>
                <input type="text" placeholder='start_index,end_index'  value={ques} className='form-input' onChange={((e)=>setQues(e.target.value))}/> 
            </div>
            <button type="submit" className='btn btn-primary' onClick={handleQuerySubmit}>Submit</button>
        </form>
        <form className="form">
            <div className="form-row">
                <label className="form-label">Update</label>
                <input type="text" placeholder='index , value' required value={u_val1} className='form-input' onChange={((e)=>setU_Val1(e.target.value))}/> 
            </div>
            <button type="submit" className='btn btn-primary' onClick={hanldeUpdate}>Submit</button>
        </form>
    </div>
      <div className="display-container">
      {tree&&
        <div className="binary-tree">
          {display(tree)}
        </div>
      }
      {ans && <h3>{ans}</h3>}
      <div className="legend">
        <div>
            <div className="color"></div>
            <h5>Partial Index </h5>
        </div>
        <div>
            <div className="color"></div>
            <h5>Out of Bound </h5>

        </div>
        <div>
            <div className="color"></div>
            <h5>Completely In Bound </h5>

        </div>
      </div>
      </div>
    </Wrapper>
  )
}

export default SegmentTree
const Wrapper=styled.div`
    /* padding: 3rem; */
    display: grid;
    grid-template-columns: 400px 1fr;
    max-height: 92vh;
    min-height: 92vh;
    .options{
        background: var(--grey-100);
      }
      .form{
      background: var(--grey-100);
        margin: 0;
        max-width: 370px;
    }
    .display-container{
    position: relative;
    padding: 3rem;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 90vh;
    height: auto;
    background: var(--grey-900);
    h3{
        position: absolute;
        bottom: 0rem;
        right: 0rem;
        padding: 2rem;
        margin: 0;
        background: var(--grey-50);
        color: var(--green-dark);
    }
    
}
.legend{
    position: absolute;
    padding: 1rem;
    top: 0;
    background: var(--grey-900);
    color: var(--green-light);
    display: flex;
    flex-direction: column;
    gap: 10px;
    right: 0;
    h5{
        font-size: 12px;
        margin: auto 0;

    }
    div{
        display: flex;
        align-items: center;
        /* justify-content: space-between; */
        gap: 1rem;
    }
    div div{
        width: 30px;
        height: 30px;
        border-radius: 50%;
    }
    & :nth-child(1){
        div{
            border:5px solid yellow ;
        }
    }
    & :nth-child(2){
        div{
            border:5px solid red ;
        }
        
    }
    & :nth-child(3){
        div{
            border:5px solid green ;
        }
        
    }
    

  }
  ::-webkit-scrollbar{
    display: none;
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
    width: 3.5rem;
    height: 3.5rem;
    border-radius: 50%;
    display: grid;
    box-shadow: var(--shadow-3);
    border: 1px solid var(--grey-200);
    background: var(--green-light);
    margin: 0 auto;
    &::before{
      content: '';
      position: absolute;
      width: 50%;
      height: 2rem;
      top: 0;
      left: 50%;
      right: 0%;
      transform: translateY(-100%);
      background: #000;
      background: linear-gradient(to bottom right, transparent 49%,#fff 51%,transparent 53%);
    } 
  
  }
  .binary-tree :nth-child(3) > span::before{
    right: 50%;
    left: 0;
    background: #000;
    background: linear-gradient(to bottom left, transparent 49%,#fff 51%,transparent 53%);
  } 
   .binary-tree >div >span::before{
    content: none;
  }
 
  .binary-tree div{
    position: relative;
    display: grid;
    
     grid-template-columns: repeat(2, minmax(0, 1fr));
    grid-template-rows: 3.5rem auto;
    gap: 1rem;
    margin-top: 1rem;
  } 
  
  
  .binary-tree span {
    /* padding: 5px; */
    background: linear-gradient(to bottom,var(--grey-100) 43%,var(--grey-700) 50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    p{
        color: #000;
        margin: 0;
        padding: 0;
        font-weight: bold;
        border-radius: 100%;
        display: grid;
        place-items: center;
    }
    & :last-child{
        color: var(--red-light);
    }
  }
  
`