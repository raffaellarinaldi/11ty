//Shared among projects
module.exports = (eleventyConfig) => {
    eleventyConfig.setQuietMode(true)
    eleventyConfig.addNunjucksShortcode('year', () => `${new Date().getFullYear()}`)
    eleventyConfig.addShortcode('11ty_version', () => require('@11ty/eleventy/package.json').version)
}
