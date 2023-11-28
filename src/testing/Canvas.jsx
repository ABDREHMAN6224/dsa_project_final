import React, { useEffect, useRef } from 'react'

const Canvas = ({draw,animate}) => {
    const canRef=useRef(null);

    useEffect(()=>{
      const canvas=canRef.current;
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      const context=canvas.getContext("2d");
      const bars=animate(context);
      draw(context,bars);
    },[draw])

  return (
    <canvas ref={canRef} id='draw_i' width={100} height={730} style={{background:"var(--grey-200)"}}/>

  )
}

export default Canvas