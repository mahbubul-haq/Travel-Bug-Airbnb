import React from 'react'

const ViewGuideline = (props) => {
  return (
    <div>
      This is ViewGuideline
      <br/>
      {props.source().x}
      <br/>
      {props.source().y}
      <br/>
      {props.source().label}
      <br/>
      {props.destination().x}
      <br/>
      {props.destination().y}
      <br/>
      {props.destination().label}
    </div>
  )
}

export default ViewGuideline
