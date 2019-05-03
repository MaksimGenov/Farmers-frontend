import React from 'react'

export default function Wrapper ({ children, className }) {
  return <div className={`o-wrapper ${typeof className === 'undefined' ? '' : className}`}>{children}</div>
}
