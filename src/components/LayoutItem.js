import React from 'react'

export default function LayoutItem ({ children, className }) {
  return <div className={`o-layout__item ${typeof className === 'undefined' ? '' : className}`}>{children}</div>
}
