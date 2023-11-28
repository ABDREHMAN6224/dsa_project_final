import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { balanceIL, balanceIR, balancePartciularNode, balanceTree, deleteVal, insertValue, insertValue2, leftRotate, rightRotate } from '../utils/trees/BinaryTree'
import { sleep } from '../utils/sorting'
import { getSuccessiveNodes, getXYDifference } from '../utils/utils'

const CreateNode = ({node,setTree,setChange,change,setRotating,setAnimating,autoBalance,ctx,swaps,handleSubmit:handle}) => {
    const [display,setDisplay]=useState(true)
    const [val,setVal]=useState('')
    const [val1,setVal1]=useState('')
    const [enter,setEnter]=useState(false)
    const timing = {
    duration: 1000,
    };
    const findPC=(node,p)=>{
        if(node==null){return null;}
        if(node.id==p.id){
            return node;
        }
        if(p.value<node.value){
            let n= findPC(node.left,p);
            return n;
        }else{
            let n=findPC(node.right,p);
            return n;
        }
    }
    const animate=(swaps)=>{
        if(swaps.length<1){
            return;
        }
        const currMove=swaps.shift();
        const {p,c}=currMove;
        let p_node=findPC(node,p);
        let c_node=findPC(node,c); 
        setAnimating({action:"rotating",currNode:p_node})      
        const elem1=document.getElementById(p_node.id);
        const elem2=document.getElementById(c_node.id); 
        let divs=document.querySelectorAll(".before") ;
        for(let i=0;i<divs.length;i++){
            divs[i].classList.add("hide");
        }
        let elem1_x = elem1.getBoundingClientRect().x;
        let elem2_x = elem2.getBoundingClientRect().x;
        let elem1_y = elem1.getBoundingClientRect().y;
        let elem2_y = elem2.getBoundingClientRect().y;
        const diff = getXYDifference(elem1_x, elem2_x, elem1_y, elem2_y);
        let animatedc;
        let animatedp;
        if(currMove.action=="ir" || currMove.action=="il"){
            animatedp = [
                { translate: `${-diff[0]}px  ${diff[1]}px` },
            ];
        }else{
            
            animatedp = [
                { translate: `${diff[0]<0?-diff[0]-elem1.clientWidth/2:-diff[0]+elem1.clientWidth/2}px  ${diff[1]}px` },
            ];
        }
        animatedc = [
            { translate: `${diff[0]<0?-diff[0]+elem1.clientWidth/2:-diff[0] - elem1.clientWidth/2}px  ${-diff[1]}px` },
        ];
        if (currMove.action == "left_rotate") {
            if(p_node.left){
                let nn=getSuccessiveNodes(p_node.left);
                nn.map(n=>{
                    setTimeout(()=>{
                        document.getElementById(n).animate(animatedp,timing)
                    },100)
                })
            }
            const nodes=getSuccessiveNodes(c_node.right);
            nodes.map(n=>{
                setTimeout(()=>{
                    document.getElementById(n).animate(animatedc,timing)
                },100)
            })
        } else {
            
            if(p.right){
                let nn=getSuccessiveNodes(p_node.right);
                nn.map(n=>{
                    setTimeout(()=>{
                        document.getElementById(n).animate(animatedp,timing)
                    },100)
                })
            }
            const nodes=getSuccessiveNodes(c_node.left);
            nodes.map(n=>{
                setTimeout(()=>{
                    document.getElementById(n).animate(animatedc,timing)
                },100)
            })
        }
        elem2.animate(animatedc, timing)
        elem1.animate(animatedp, timing)
        setTimeout(()=>{
            if(currMove.action=="il"){
                node=balanceIL(node,p_node);
            }
            else if(currMove.action=="ir"){
                node=balanceIR(node,p_node);
            }
            else{
                node=balancePartciularNode(node,p_node);
            }
            setTree({root:node})
            let divs=document.querySelectorAll(".before") ;
            for(let i=0;i<divs.length;i++){
                divs[i].classList.remove("hide");
            }
            setAnimating({action:"",currNode:{}})
            setTimeout(()=>{
                animate(swaps);
            },500)
},1000)

        
    }
    const animateDeleteion=(swps,temp)=>{
        setAnimating({action:"",currNode:{}})
        if(swps.length<1){
            if(autoBalance){
                let tree_1=JSON.parse(JSON.stringify(node));
                balanceTree(tree_1,setAnimating,swaps);
                animate(swaps);
            }
            return;
        }
        const move=swps.shift();
        const {target,inorder}=move;
        let t_node=findPC(node,target);
        setAnimating({action:"compare",currNode:t_node})
        const elem_t=document.getElementById(t_node.id);
        let divs=document.querySelectorAll(".before") ;
        for(let i=0;i<divs.length;i++){
            divs[i].classList.add("hide");
        }
        let animatedt = [
            {transform:`rotate(360deg)`,scale:1.3  },
            {transform:`rotate(360deg)`,scale:1.2  },
            {transform:`rotate(360deg)`,scale:1.1  },
            {transform:`rotate(360deg)`,scale:1.3  },
            {transform:`rotate(360deg)`,scale:1.2  },
            {transform:`rotate(360deg)`,scale:1.1  },
            {transform:`translateY(-45px)`,scale:0.9  },
            {transform:`translateY(30px)`,scale:0.8  },
            {transform:`translateY(-50px)`,scale:0.7  },
            {transform:`translateY(20px)`,scale:0.6  },
            {transform:`translateY(-150px)`,scale:0.5  },
            {transform:`translateY(-350px)`  },
            {transform:`translateY(-1050px)`  },
        ];
        elem_t.animate(animatedt,timing)
        if(inorder!==null){

            let i_node=findPC(node,inorder);

            const elem_i=document.getElementById(i_node.id);
            const x1=elem_i.getBoundingClientRect().x;
            const y1=elem_i.getBoundingClientRect().y;
            const x2=elem_t.getBoundingClientRect().x;
            const y2=elem_t.getBoundingClientRect().y;
            const diff=getXYDifference(x1,x2,y1,y2);
            let animatedi = [
            {translate:`${diff[0]}px ${diff[1]}px`  }

        ];
            elem_i.animate(animatedi,{duration:timing.duration})
        }
        setTimeout(()=>{
            let divs=document.querySelectorAll(".before") ;
            setTree({root:deleteVal(node,target.value,[])})
            for(let i=0;i<divs.length;i++){
            divs[i].classList.remove("hide");
            }
            setTimeout(()=>{
                animateDeleteion(swps,temp)
            },200)
        },timing.duration)
    }
    useEffect(()=>{
        if(node!==null){
            handle();
        }
    },[node])
    const handleSubmit=(e)=>{
            e.preventDefault();
            if(val!==null){
                const data=async ()=>{
                    let d=await insertValue(node,Number(val),setAnimating)
                    setTree({root:d})
                    setAnimating({action:"",currNode:{}})
                    if(autoBalance){
                        let tree=JSON.parse(JSON.stringify(node));
                        balanceTree(tree,setAnimating,swaps);
                        await sleep(500);
                        animate(swaps);
                    }
                }
                data()
                setVal('');
                setChange(!change)
                setEnter(true)
            }else{
                setEnter(false)
            }
        }
    const handleDelete=(e)=>{
      e.preventDefault();
        let tree=JSON.parse(JSON.stringify(node));
        tree=deleteVal(tree,Number(val1),swaps);
        animateDeleteion(swaps,tree);
        setVal1("");   
    }
    return (<Wrapper>
    {display && <form action="" className='form node-input'>
        <div className="form-row">
        <label htmlFor="" className='form-label'>Values</label>
        <input type="number" className='form-input' value={val} placeholder='Enter Other Values' onChange={(e)=>{
            const val=e.target.value
            setVal(val)
        }} />
        </div>
        <button className='btn btn-danger' type="submit" onClick={handleSubmit}>Enter</button>
    </form>
}  
{display && 
 <form action="" className='form node-input'>
        <div className="form-row">
        <label htmlFor="" className='form-label'>Delete Node</label>
        <input type="number" className='form-input' value={val1} placeholder='Enter Value to Delete' onChange={(e)=>{
            const val=e.target.value
            setVal1(val)
        }} />
        </div>
        <button className='btn btn-danger' type="submit" onClick={handleDelete}>Delete</button>
    </form> }
  </Wrapper>
  )


}

export default CreateNode
const Wrapper=styled.div`
    /* position: relative; */
    /* .node-input{ */
`