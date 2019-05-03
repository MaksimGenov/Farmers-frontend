import React from 'react'

export default function ProgressBar ({ current, total }) {
  const calcQtyRatio = () => {
    const ratio = (current / total) * 100
    return `${ratio}%`
  }

  return (
    <div className='c-progress-bar'>
      <div>{`${current}/${total}`}</div>
      <div className='c-progress-bar__background' />
      <div className='c-progress-bar__done' style={{ width: calcQtyRatio() }} />
    </div>
  )
}
