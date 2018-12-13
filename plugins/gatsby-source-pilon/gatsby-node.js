const config = require('./config')

exports.sourceNodes = async (
  { actions, createNodeId, createContentDigest },
  configOptions
) => {
  const { createNode } = actions

  // Gatsby adds a configOption that's not needed for this plugin, delete it
  delete configOptions.plugins

  // Helper function that processes a photo to match Gatsby's node structure

  const processProduct = product => {
    const nodeId = createNodeId(`product-${product.id}`)
    const nodeContent = JSON.stringify(product)

    const nodeData = Object.assign({}, product, {
      name: product.name,
      id: nodeId,
      parent: null,
      children: [],
      internal: {
        type: `PilonProduct`,
        content: nodeContent,
        contentDigest: createContentDigest(product)
      }
    })
    return nodeData
  }

  const authToken = await config.pilonApi.post('/token', {
    token_scope: 'public',
    environment_id: config.environmentId
  })

  const products = await config.pilonApi.get('/products', {
    headers: {
      Authorization: `Bearer ${authToken.data.token}`,
      Accept: 'application/json'
    }
  })
  products.data.forEach(product => {
    const nodeData = processProduct(product)
    createNode(nodeData)
  })

  return

  // return config.pilonApi
  //   .post('/token', {
  //     token_scope: 'public',
  //     environment_id: config.environmentId
  //   })
  //   .then(resToken => {
  //     config.pilonApi
  //       .get('/products', {
  //         headers: {
  //           Authorization: `Bearer ${resToken.data.token}`,
  //           Accept: 'application/json'
  //         }
  //       })
  //       .then(resProducts => {
  //         const products = resProducts.data
  //         console.log('sourcing')
  //         console.log(products)
  //         products.forEach(product => {
  //           const nodeData = processProduct(product)
  //           createNode(nodeData)
  //         })
  //         console.log('return')
  //         return
  //       })
  //   })
}
