module.exports = {
    devServer: {
        port: '8081',
        disableHostCheck: true
    },
    productionSourceMap: false, // Disable source maps in production for better performance
    css: {
        extract: true, // Extract CSS to separate files for better caching
        sourceMap: false
    }
}