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
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './components/Home';

const App = () => {
  const {using3d}=useGlobalContext();
  const router=createBrowserRouter([
    
    {
      path:"/",
      element:<Home/>
    },
        {
          path:"/trees",
          element:<TreeVisualizer/>
        },
        {
          path:"/heap",
          element:<Heap/>
        },
        {
          path:"/sorting",
          element:<>
          <Navbar/>
              {
              using3d?
                <Another/>
                :
                <Visualization/>
              }
          </>
        }
      
    
  ]);

  return (
    <>
            <RouterProvider router={router}/>
    </>
  )
}


export default App
