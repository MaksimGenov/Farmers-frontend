import React, { Fragment, useState } from 'react'
import Header from './Header'
import Footer from './Footer'
import GlobalContext from '../context/GlobalContext'

export default function PageLayout (props) {
  const [username, setUsername] = useState('max')

  return (
    <Fragment>
      <GlobalContext.Provider value={{ username, setUsername }}>
        <Header />
        <main className='o-wrapper'>
          {props.children}
        </main>
        <Footer />
      </GlobalContext.Provider>
    </Fragment>
  )
}
