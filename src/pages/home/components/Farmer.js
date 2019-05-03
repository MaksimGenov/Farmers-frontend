import React from 'react'
import { Link } from 'react-router-dom'
import Dropdown from '../../../components/Dropdown'
import Layout from '../../../components/Layout'
import LayoutItem from '../../../components/LayoutItem'
import TableData from '../../../components/TableData'

function Farmer ({ farmer }) {
  return (
    <Layout className='margin-bottom'>
      <LayoutItem className='u-4/12@desktop u-1/1@mobile'>
        <TableData>{farmer.name}</TableData>
      </LayoutItem>
      <LayoutItem className='u-3/12@desktop u-1/1@mobile'>
        <TableData>{farmer.town}</TableData>
      </LayoutItem>
      <LayoutItem className='u-3/12@desktop u-1/1@mobile'>
        <Dropdown values={farmer.phoneNumbers} />
      </LayoutItem>
      <LayoutItem className='u-2/12@desktop'>
        <Link to={`/farmer/${farmer._id}`} className='c-btn c-btn--primary'>Cultures</Link>
      </LayoutItem>
    </Layout>
  )
}

export default Farmer
