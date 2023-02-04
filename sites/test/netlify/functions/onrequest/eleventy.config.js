const
{ EleventyServerlessBundlerPlugin } = require("@11ty/eleventy"),
htmlmin = require("html-minifier").minify,
axios = require("axios").default;

module.exports = (eleventyConfig) => {
  // Copy files
  eleventyConfig.addPassthroughCopy({
    "./assets": "./assets"
    //add more stuff to copy here
  });
  // Collections - single element responses should be placed here and not in _data folder
  // Fact
  eleventyConfig.addCollection('fact', async collection => {
    const response = await axios({
      method: 'get',
      url: 'https://catfact.ninja/fact'
    })
    .then(response => {
      console.log(response.data);
      return response.data
    })
    .catch(error => {
    })
    return response ? response : []
  });
  // Activity
  eleventyConfig.addCollection('activity', async collection => {
    const response = await axios({
      method: 'get',
      url: 'https://www.boredapi.com/api/activity'
    })
    .then(response => {
      console.log(response.data);
      return response.data
    })
    .catch(error => {
    })
    return response ? response : []
  });
  // Filters
  eleventyConfig.addFilter("getRandom", function(items) {
    let selected = items[Math.floor(Math.random() * items.length)];
    return selected;
  });
  // Serverless
  eleventyConfig.addPlugin(EleventyServerlessBundlerPlugin, {
    name: "onrequest",
    functionsDir: "./netlify/functions/",
    copy: [
      { from: ".cache", to: "cache" },
      { from: "assets", to: "assets" }
    ]
  });
  // Return
  return {
    passthroughFileCopy: true,
    dir: {
      input: "src",
      data: "data",
      includes: "includes",
      layouts: "layouts",
      output: "dist"
    }
  }
}
