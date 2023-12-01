import React from 'react'
import styled from 'styled-components'

const LinkedLists2 = () => {
  return (
    <Wrapper>

<div class="linked-list">
  <div class="node">1</div>
  <div class="node">2</div>
  <div class="node">3</div>
  <div class="node">4</div>
</div>  
    </Wrapper>
)
}

export default LinkedLists2
const Wrapper=styled.div`
    /* CSS */
.linked-list {
  display: flex;
  justify-content: space-between;
  width: 100%;
}

.node {
  width: 50px;
  height: 50px;
  border: 1px solid black;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
}

.node:not(:last-child)::after {
  content: '';
  position: absolute;
  width: 50px;
  height: 2px;
  background: black;
  top: 50%;
  right: -25px;
}
    `