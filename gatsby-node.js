const Promise = require('bluebird')
const path = require('path')
exports.onCreateNode = ({ node, actions }) => {
  const { createNodeField } = actions
  if (node.internal.type === `PilonProduct`) {
    console.log('PilonProduct')
    const routeFragment = node.name
      .toLowerCase()
      .split(' ')
      .join('-')
    createNodeField({
      node,
      name: `slug`,
      value: `products/${routeFragment}`
    })
  }
}

exports.createPages = ({ graphql, actions }) => {
  const { createPage } = actions
  return new Promise((resolve, reject) => {
    const productPageTemplate = path.resolve(`src/templates/product-page.js`)
    resolve(
      graphql(`
        query {
          allPilonProduct {
            edges {
              node {
                fields {
                  slug
                }
              }
            }
          }
        }
      `).then(result => {
        if (result.errors) {
          console.log('Got an Error')
          console.log(result.errors)
          reject(result.errors)
        }
        result.data.allPilonProduct.edges.forEach(({ node }) => {
          createPage({
            path: node.fields.slug,
            component: productPageTemplate,
            context: {
              // Data passed to context is available
              // in page queries as GraphQL variables.
              slug: node.fields.slug
            }
          })
        })
        return
      })
    )
  })
}

exports.onCreateWebpackConfig = ({ actions }) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        components: path.resolve(__dirname, 'src/components'),
        templates: path.resolve(__dirname, 'src/templates'),
        scss: path.resolve(__dirname, 'src/scss')
      }
    }
  })
}
