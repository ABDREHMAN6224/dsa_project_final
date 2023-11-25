import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import Canvas from './Canvas'
import { useGlobalContext } from '../context/context'
import { getHeight, getWidth } from '../utils/utils'

const Another = () => {
    const {array,size,moves,time}=useGlobalContext();
    const [frames,setFrames]=useState(30);
    const [margin,setMargin]=useState(20); 
    let sorted=[]; 
    let pivot=null;
    const lerp=(a,b,t)=>{
        return a+(b-a)*t;
    }
    class Bar{
        constructor(x,y,width,height){
            this.x=x;
            this.y=y;
            this.height=height;
            this.width=width-4;
            this.animations=[];
        }
        moveTo(loc,mul,frames=time){
            for(let i=0;i<=frames;i++){
                const t=i/frames;
                const u=Math.sin(t*Math.PI)
                const x=lerp(this.x,loc.x,t);
                const y=lerp(this.y,loc.y,t);
                this.animations.push({x:x,y:y-u*2*mul,type:"swap"});
                
            }
        }

        jump(frames=time,t="compare"){
            for(let i=0;i<=frames;i++){
                const term=i/frames;
                const u=Math.sin(term*Math.PI)
                this.animations.push({x:this.x,y:this.y-u*this.width/5,type:t});
            }
        }
        draw(ctx){
            let changed=false; 
            if(this.animations.length>0){
                const {x,y,type}=this.animations.shift();
                this.x=x;
                this.y=y;
                changed=true;
                if(type=="swap"){
                    ctx.fillStyle="rgb(222, 50, 50)"
                }
                else if(type=="put"){
                    ctx.fillStyle="rgb(190, 20, 20)"
                }
                else if(type=="pivot"){
                    ctx.fillStyle="rgb(168, 13, 147)"
                }
                else{

                    ctx.fillStyle="rgb(76, 50, 222)"

                }
            }
            else{
                ctx.fillStyle="rgb(78, 56, 147)"
            }
            if(this===pivot){
                ctx.fillStyle="rgb(180, 28, 162)"
                
            }
            if(sorted.includes(this)){
                ctx.fillStyle="rgb(12, 162, 24)"

            }
            const left=this.x-this.width/2;
            const right=this.x+this.width/2;
            const top=this.y-this.height;
            const bottom=this.y;
            ctx.beginPath();
            ctx.moveTo(left,top);
            ctx.lineTo(left,bottom);
            ctx.ellipse(this.x,this.y,this.width/2,this.width/4,0,Math.PI,2*Math.PI,true);
            ctx.lineTo(right,top);
            ctx.ellipse(this.x,top,this.width/2,this.width/4,0,0,Math.PI*2,true);
            ctx.fill();
            ctx.stroke();
            
            return changed;
        }
    }
    const animate=(context)=>{
        const bars=[];
        for(let i=0;i<array.length;i++){
            let width=getWidth(size);
            let height=getHeight(size,array[i]);
            const x=width*i+width/2+margin*2;
            const y=context.canvas.height-margin*2;
            
            bars[i]=new Bar(x,y,width,height);
        }
        return bars;
    }
    const draw=(context,bars)=>{
        context.clearRect(0,0,context.canvas.width,context.canvas.height);
        let changed=false;
        for(let i=0;i<bars.length;i++){
           changed= bars[i].draw(context)||changed;
        }
        if(!changed && moves.length>0){
            const currMove=moves.shift();
            const [i,j]=currMove.indices;
            if(currMove.action==="swapped"){
                bars[i].moveTo(bars[j],1);
                bars[j].moveTo(bars[i],-1);
                [bars[i],bars[j]]=[bars[j],bars[i]];
            }
            else if(currMove.action==="compare"){
                console.log(i,j);
                bars[i].jump();
                bars[j].jump();
            }
            else if(currMove.action==="pivot"){
                pivot=bars[i];
                bars[i].jump(time,"pivot");
                    }
            else if(currMove.action==="sorted"){
                console.log(i,j);
                sorted=[]
                for(let k=i;k<=j;k++){
                    sorted.push(bars[k]);
                    sorted=([...new Set(sorted)]);
                }
                // // bars[i].jump(time,"pivot");
                    }
            else if(currMove.action==="put"){
                 const value=currMove.value;
                 array[j]=value;    
                let width=getWidth(size);
                let height=getHeight(size,value);
                const x=width*i+width/2+margin*2;
                const y=context.canvas.height-margin*2;
                bars[j]=new Bar(x,y,width,height);
                bars[j].jump(time,"put");
            }
            
        }
        requestAnimationFrame(()=>draw(context,bars))
    }

  return (
    <Wrapper>
        <Canvas draw={draw} animate={animate}/>
    </Wrapper>
  )
}

export default Another

const Wrapper=styled.div`
    display: grid;
    place-items: center;
    /* grid-template-columns: 1fr 200px; */
`