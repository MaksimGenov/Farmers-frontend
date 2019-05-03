import React from 'react'

export default function Layout ({ children, className }) {
  return <div className={`o-layout ${typeof className === 'undefined' ? '' : className}`}>{children}</div>
}
