import React from 'react'

export default function TableData ({ children, className }) {
  return <div className={`c-table__data ${typeof className === 'undefined' ? '' : className}`}>{children}</div>
}
