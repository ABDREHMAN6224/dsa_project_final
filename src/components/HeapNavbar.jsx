import React, { useState } from 'react'
import styled from 'styled-components'
import { useHeapContext } from '../context/Heapctx';
import { heapAnalysis, heapCode } from '../utils/analysis';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';

const HeapNavbar = () => {
    const {insertInArr,choice,setChoice,deleteFromArr}=useHeapContext();
    const [val,setVal]=useState("");
    const handleSubmit=(e)=>{
        e.preventDefault();
        insertInArr(val);
        setVal("");

    }
    const handleDelete=()=>{
            deleteFromArr();
    }
  return (
    <Wrapper>
        <h3>Heaps</h3>
        <div className="controls">

        <form className="form" onSubmit={handleSubmit}>
            <div className="form-row">
                <label htmlFor="" className="form-label">Enter Value</label>
                <input type="number" name="" required id="" className="form-input" value={val} onChange={(e)=>setVal(e.target.value)} />
                <button type="submit" className='btn btn-hipster'>Enter</button>
            </div>
            </form>
            <div className="form">

            <div className="form-row">
                <select type="number" name="" required id="" className="form-input" value={choice} onChange={(e)=>{
                    setChoice(e.target.value);
                }}>
                    <option value="min" className='opt' >Min Heap</option>
                    <option value="max" className='opt' >Max Heap</option>
                </select>
            </div>
            <button className='btn btn-danger' onClick={handleDelete}>Remove Element</button>
            </div>
        </div>
        <div className="analysis">
            <h4>Analaysis</h4>
            <div className="time">
                {Object.keys(heapAnalysis).map((elem,i)=>{
                    return <div className="single">
                        <h5>{elem}</h5>
                        <p>{heapAnalysis[elem]}</p>
                    </div>
                })}
            </div>
        </div>
                <button className='btn btn-primary btn-block' onClick={()=>{
                    navigator.clipboard.writeText(heapCode);
                    toast.success("Code Copied to Clipboard");
                }}>Copy C++ Code</button>
                <Link to={"/"} className='btn btn-danger back'>Home</Link>

    </Wrapper>
  )
}

export default HeapNavbar

const Wrapper=styled.div`
background: var(--grey-200);
padding: 0.8rem;
display: flex;
flex-direction: column;
gap: 3rem;
h3{
    margin: 0;
    font-size: 2.4rem;
}
h3,h4{
    text-align: center;
    font-weight: bold;
}
.form{
    label{
        font-size: 1.3rem;
    }
    background-color: var(--grey-800);
    margin: 0;
    /* color: var(--grey-100); */
    .btn{
        margin-top: 1rem;
    }
    max-width: 200px;
    padding: 10px;
}
select{
    width: 100%;
        font-size: 1.15rem;
        border: 1px solid #caced1;
        border-radius: 0.25rem;
        color: #000;
        cursor: pointer;
    }
    
    .form{
        background: var(--grey-300);
        color: var(--grey-900);
    }
    .time{
        display: flex;
        gap: 0.5rem;
        border: 1px solid black;
        h5,p{
            margin: 0;
        }
        h5{
            font-weight: 700;
            font-size: 1.3rem;
        }
        p{
            font-weight: 400;
            font-size: 18px;
        }
        
    }
    .time > :nth-child(2){
        border-right: 1px solid black;
        border-left: 1px solid black;
    }
    .single{
        padding: 5px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        h5{
            margin: 0;
            text-align: center;

        }
    }
    .back{
        max-width: 200px;
        text-align: center;
        margin: 0 auto;
    }
    `

    