import React from 'react'
import CreateFarmer from './CreateFarmer'
import FarmersList from './FarmersList'
import Layout from '../../../components/Layout'
import Wrapper from '../../../components/Wrapper'
import LayoutItem from '../../../components/LayoutItem'

export default function FarmersTable () {
  return (
    <Wrapper>
      <Layout className='o-layout--center'>
        <LayoutItem className='u-5/6'>
          {/* table header */}
          <Wrapper>
            <Layout>
              <LayoutItem className='u-4/12'>Name</LayoutItem>
              <LayoutItem className='u-3/12'>Town</LayoutItem>
              <LayoutItem className='u-3/12'>Phone Numbers</LayoutItem>
            </Layout>
          </Wrapper>
          {/* table rows */}
          <Layout>
            <FarmersList />
          </Layout>
          <Layout>
            <CreateFarmer />
          </Layout>
        </LayoutItem>
      </Layout>
    </Wrapper>
  )
}
