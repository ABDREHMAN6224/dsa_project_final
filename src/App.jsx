import React, { useState } from 'react'
import Navbar from './components/Navbar'
import styled from 'styled-components';
import Visualization from './components/Visualization';
import TreeVisualizer from './components/TreeVisualizer';
import SegmentTree from './components/SegmentTree';
import Another from './testing/Another';
import Tree from './testing/trees/Tree';
import Heap from './components/Heap';
import { useGlobalContext } from './context/context';

const App = () => {
  const {using3d}=useGlobalContext();
  return (
    <>
    {/* <Heap/> */}
    {/* <Tree/> */}
      {/* <TreeVisualizer/> */}
      {/* <SegmentTree/> */}
    <Navbar/>
    <div id="container">
   {
   using3d?
    <Another/>
    :
    <Visualization/>
   }
  </div>
    {/* <div className="options"></div> */}
  {/* <Navbar/> */}
    {/* <Check/> */}
    </>
  )
}

export default App
