module.exports = {
    src: {
        assets: './src/assets/cache.manifest',
        bowerLibs: './src/lib/',
        components: './src/components/**',
        css: {
            files: './src/css/*.css',
            root: './src/css'
        },
        images: "./src/img*/**",
        less: './src/less/*.less',
        lessComponents: './src/less/components/*.less'
    },
    dest: {
        root: './dist/',
        components: './dist/components',
        css: './dist/css',
        images: './dist/img',
        lib: './dist/lib'
    }
};