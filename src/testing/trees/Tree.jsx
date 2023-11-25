import React, { useState } from 'react'
import TreeCanvas from './TreeCanvas'
import { tree } from './treeDs'


const Tree = () => {
  const [val,setVal]=useState("")
    const handleClick=(e)=>{
      e.preventDefault();
      tree.insert(Number(val));
      setVal('')
    }
    const draw=(context)=>{
      context.clearRect(0,0,context.canvas.width,context.canvas.height);
      tree.paint(context);
      requestAnimationFrame(()=>draw(context))

    }
  return (
    <div >
        <div className="fom">
          <form className="">
            <label htmlFor="" className="for">Enter value</label>
            <input type="text" value={val} onChange={(e)=>setVal(e.target.value)} className="form-iut" />
            <button type="submit" onClick={handleClick} className='btn btn-hipster'>Enter</button>
          </form>
        </div>
        <TreeCanvas draw={draw}/>
    </div>
  )
}

export default Tree