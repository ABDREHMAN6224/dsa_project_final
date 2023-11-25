import React, { useEffect, useRef } from 'react'

const Canvas = ({draw,animate}) => {
    const canRef=useRef(null);

    useEffect(()=>{
      const canvas=canRef.current;
      const context=canvas.getContext("2d");
      const bars=animate(context);
      draw(context,bars);
    },[draw])

  return (
    <canvas ref={canRef} id='draw_i' width={window.innerWidth} height={600} style={{background:"var(--grey-300)"}}/>

  )
}

export default Canvas