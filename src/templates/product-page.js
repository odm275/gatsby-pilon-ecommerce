import { graphql } from 'gatsby'
import get from 'lodash/get'
import React from 'react'
import Layout from 'components/Layout'
import Product from './Product'
const Template = ({ data, location }) => {
  return (
    <Layout location={location}>
      <Product data={get(data, 'pilonProduct')} />
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
      shortDesc
      longDesc
    }
  }
`
