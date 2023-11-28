import React from 'react'
import styled from 'styled-components'
import sortingImg2D from "../images/sorting.png"
import sortingImg3D from "../images/3d_sort.png"
import segment from "../images/segment.png"
import tree from "../images/tree.png"
import { Link } from 'react-router-dom'

const Home = () => {
    
  return (
    <Wrapper>
      <div className="heading">
        <div className="title">
        <h2>Welcome To</h2>
        <h1>DSA VISUALIZER</h1>
        <div className="links">
          <Link to={"/trees"} className='btn btn-primary btn-hero'>Trees</Link>
          <Link to={"/heap"} className='btn btn-primary btn-hero'>Heap</Link>
          <Link to={"/sorting"} className='btn btn-primary btn-hero'>Sorting</Link>
        </div>
        </div>
      </div>
      <div className="images">
        <div className="image">
          <img src={sortingImg2D} alt="" className='img' />
        </div>
        <div className="image">
          <img src={sortingImg3D} alt="" className='img' />
        </div>
        <div className="image">
          <img src={tree} alt="" className='img' />
        </div>
        <div className="image">
          <img src={segment} alt="" className='img' />
        </div>
      </div>
    </Wrapper>
  )
}

export default Home
const Wrapper=styled.div`
background:var(--grey-900);
  height: 100vh;
  max-height: 100vh;
  display: grid;
  grid-template-columns: 1fr 1fr;
  h1,h2{
    font-weight: bold;
    color: var(--primary-300);
    margin: 0;
    font-size: 5rem;
    letter-spacing: 2px;
  }
  h1{
    margin-top: 1rem;
    color: var(--primary-200);

  }
  .heading{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 3rem;
  }
  .images{
    padding: 3rem;
    display: grid;
    gap: 1rem;
    place-items: center;
    /* background-color: red; */
    grid-template-columns: 1fr 1fr;
  }
  .image{
    border: 1px solid var(--primary-200);
    /* width: 10rem; */
    /* aspect-ratio: 1; */
    background: yellow;
    border-radius: 10px;
    width: 20rem;
    height: 12rem;
    .img{
      width: 100%;
      height:100%;
      object-fit: fill;
    }
  }
  .links{
    margin-top: 2rem;
    display: flex;
    gap: 1rem;
    justify-content: center;
  }
`