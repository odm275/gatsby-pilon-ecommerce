import { graphql } from 'gatsby'
import React from 'react'
import Layout from 'components/Layout'
import Product from './Product'
const Template = ({ data, location }) => {
  console.log('data')
  console.log(data)
  return (
    <Layout location={location}>
      <h1>lol</h1>
    </Layout>
  )
}

export default Template
export const query = graphql`
  query($slug: String!) {
    pilonProduct(fields: { slug: { eq: $slug } }) {
      name
      sku
      id
      short_desc
      long_desc
    }
  }
`
