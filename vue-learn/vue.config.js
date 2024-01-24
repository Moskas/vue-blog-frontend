module.exports = {
    // options...
    devServer: {
        proxy: {
            '^/graphql': {
                target: 'http://localhost:8000',
                ws: true,
                changeOrigin: true,
            }
        }
    }
}