const axios = require('axios')

const pilonApiBaseUrl = 'https://api.pilon.io/v1'

const axiosInstance = axios.create({
  baseURL: pilonApiBaseUrl,
})

module.exports = {
  pilonApiBaseUrl,
  environmentId: '46cd0056-e3cc-11e8-a8aa-4de4aa86614d',
  pilonApi: axiosInstance,
}
