import React, { useEffect, useRef } from 'react'

const TreeCanvas = ({draw}) => {
    const ref=useRef(null);

    useEffect(()=>{
        const canvas=ref.current;
        const ctx=canvas.getContext("2d");
        draw(ctx);
        // ctx.fillStyle="red";
        // draw(ctx);
    
    },[draw])
  return (
    <canvas ref={ref} width={window.innerWidth} height={window.innerHeight} style={{background:"var(--grey-900",margin:"0rem"}}></canvas>
  )
}

export default TreeCanvas