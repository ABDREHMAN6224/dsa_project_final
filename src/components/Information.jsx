import React from 'react'
import styled from 'styled-components'
import { useGlobalContext } from '../context/context'
import { v4 as uuid } from 'uuid';
import { codes, sortingAnalysis } from '../utils/analysis';
import { toast } from 'react-toastify';
const Information = ({show}) => {
    const {array,currentSort,noOfComps,noOfSwaps}=useGlobalContext();

  return (

    <Wrapper >

      <h3>{currentSort} Sort Analysis</h3>
      <div className="info">

            {Object.keys(sortingAnalysis[currentSort]).map(m=>{
              return <div key={uuid()} className='single'>
                <h4 >
                  {m+ " =>"}
                </h4>
                <h5>
                  {sortingAnalysis[currentSort][m]}
                </h5>
            </div>
            })}
            <div className="single">
                <h4>
                  {"Arr length =>"}
                </h4>
                <h5>
                  {array.length}
                </h5>

            </div>
            <div style={{display:show?"":"none"}} className="single">
                <h4>
                  {"Number Of Comps =>"}
                </h4>
                <h5>
                  {noOfComps}
                </h5>

            </div>
            <div className="single" style={{display:show?"":"none"}}>
                <h4>
                  {"Number Of Swaps =>"}
                </h4>
                <h5>
                  {noOfSwaps}
                </h5>

            </div>
        </div>
      <button className='btn btn-hero btn-block' onClick={() => {
        navigator.clipboard.writeText(codes[currentSort]);
        toast.success("Copied To Clipboard")
      }}
      >Copy C++ Code
          
      </button>
    </Wrapper>  )
}

export default Information
const Wrapper=styled.div`
background: var(--grey-300);
  padding: 2rem;
  display: flex;
  gap: 1.5rem;
  align-items: start;
  flex-direction: column;
  h3{
    font-weight: bold;
    text-align: center;
    color: var(--grey-900);
  }
  h4{
    font-weight: bold;
  }
  .info{
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }
  .single{
    display: flex;
    gap: 1rem;
    align-items: center;
    p{
      text-transform: lowercase;
    }
    
  }
  .btn{
    text-align: center;
    margin: 0 auto;
    font-size: 1rem;
    padding: 1rem auto;
  }

`