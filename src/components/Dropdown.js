import React, { useState } from 'react'

function Dropdown ({ values }) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <div className='c-dropdown'>
      <div className='c-dropdown__header' onClick={() => setIsOpen(!isOpen)}>
        <div>{values[0]}</div>
        <div><i className={isOpen ? 'arrow-up' : 'arrow-down'} /></div>
      </div>
      {isOpen
        ? <div className='c-dropdown__content'>
          {values.slice(1).map((value, index) => <div key={index}>{value}</div>)}
        </div>
        : null
      }
    </div>
  )
}

export default Dropdown
