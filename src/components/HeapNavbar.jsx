import React, { useState } from 'react'
import styled from 'styled-components'
import { useHeapContext } from '../context/Heapctx';

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

    </Wrapper>
  )
}

export default HeapNavbar

const Wrapper=styled.div`
background: var(--grey-900);
    .form{
        label{
            font-size: 1.3rem;
        }
        background-color: var(--grey-900);
        margin: 0;
        color: var(--grey-100);
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

`