import { Link } from 'gatsby'
import get from 'lodash/get'
import React from 'react'
import map from 'lodash/map'
import Img from 'gatsby-image'
import './style.scss'

const Product = ({ data }) => {
  console.log('data in Product')
  console.log(data)
  const { name, sku, id, short_desc, long_desc } = data
  console.log(name)
  return (
    <div className="article">
      <div className="container">
        <div className="info">
          <h1>{name}</h1>
        </div>
        <div className="content">
          <div className="productPrimary">
            <img
              style={{ width: 250 }}
              src="https://www.ikea.com/us/en/images/products/angland-table-lamp-with-led-bulb__0385322_PE558444_S4.JPG"
            />
            <div className="productSecondary">
              <div>{short_desc}</div>
              <div>$4.99</div>
              <span className="badge badge-secondary">{sku}</span>
              <input type="number" />
            </div>
          </div>
          <div className="content">
            <div>
              <p>{long_desc}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Product
/*
const getAd = (isIndex, adsense) => {
  return !isIndex ? <Adsense clientId={adsense} slotId="" format="auto" /> : ''
}

const Button = ({ path, label, primary }) => (
  <Link className="readmore" to={path}>
    <span
      className={`btn btn-outline-primary btn-block ${
        primary ? 'btn-outline-primary' : 'btn-outline-secondary'
      }`}
    >
      {label}
    </span>
  </Link>
)

const Badges = ({ items, primary }) =>
  map(items, (item, i) => {
    return (
      <span
        className={`badge ${primary ? 'badge-primary' : 'badge-secondary'}`}
        key={i}
      >
        {item}
      </span>
    )
  })
*/
