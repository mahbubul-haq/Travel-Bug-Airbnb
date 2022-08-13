import React from 'react'

const DateInput = (props) => {
  return (
    <div>
      This is DateInput
      <button type="button" className="btn-primary btn-lg" onClick={()=>props.prevComponent()}>
            Prev
        </button>
      <button type="button" className="btn-primary btn-lg" onClick={()=>props.nextComponent()}>
            Next
        </button>
    </div>
  )
}

export default DateInput
