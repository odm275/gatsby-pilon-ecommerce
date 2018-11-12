const config = require('./config')

exports.sourceNodes = (
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
        contentDigest: createContentDigest(product),
      },
    })
    return nodeData
  }
  return config.pilonApi
    .post('/token', {
      token_scope: 'public',
      environment_id: config.environmentId,
    })
    .then(resToken => {
      config.pilonApi
        .get('/products', {
          headers: {
            Authorization: `Bearer ${resToken.data.token}`,
            Accept: 'application/json',
          },
        })
        .then(resProducts => {
          const products = resProducts.data
          products.forEach(product => {
            const nodeData = processProduct(product)
            createNode(nodeData)
          })
        })
    })
}
