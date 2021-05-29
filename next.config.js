const nextConfig = {
  publicRuntimeConfig: {
    SERVER_URL: process.env.SERVER_URL,
  },
}

console.log('nextConfig', nextConfig)

module.exports = nextConfig

