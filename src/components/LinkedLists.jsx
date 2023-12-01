import React, { useEffect, useRef, useState } from 'react'
import styled from 'styled-components';

const LinkedLists = () => {
    const [list,setList]=useState({val:1,next:{val:2,next:{val:3,next:{val:4,next:{val:5,next:null}}}}});
    const ref=useRef(null);
    const displayList=(ll)=>{
        if(ll===null){
            return <div ></div>;
        }
        return(
            <div className="list-item">
                <span className='list-item-val'>{ll.val}</span>
                {displayList(ll.next)}
            </div>
        )
        
    }
    return (
        <Wrapper>
        <div className="display-container">
            <div ref={ref} className="list">
                {displayList(list)}
            </div>
        </div>
    </Wrapper>
  )
}

export default LinkedLists
const Wrapper=styled.div`
display: flex;
align-items: center;
justify-content: center;
.list{
    padding-top: 5rem;
    display: flex;
    align-items: center;
    justify-content: center;
}
.list div{
position: relative;
    display: grid;
    grid-template-columns: 8rem auto;
    gap: 3rem;
}
    
    .list-item-val{
        font-size: 2rem;
        font-weight: 500;
        color: #fff;
        background-color: #000;
        padding: 1rem;
        border-radius: 10px;
        position: relative;
    }

    .list span{
        text-align: center;
        &::after{
            content: '';
            position: absolute;
            width: 5rem;
            height: 4px;
            right: 90%;
            top: 50%;
            transform: translateY(50%);
            background-color: red;
            
            border-width: 8px;
            border-style: solid;
            border-color:  transparent  yellow transparent transparent;            /* display: inline-block; */
            /* padding: 3px; */
            transform: rotate(180deg);
        }

    }
    .list > div > span::after{
        content: none;
        height: 0;
    }
`