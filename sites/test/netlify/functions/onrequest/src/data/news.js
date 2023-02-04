const
Cache = require("@11ty/eleventy-cache-assets"),
axios = require("axios").default

// THIS COLLECTION IS CACHED! Should not change on every request

module.exports = async function() {

  let options = {};
  options.type = "json"; // we’ll parse JSON for you

  if (process.env.ELEVENTY_SERVERLESS) {
    // Infinite duration (until the next build)
    options.duration = "*";
    // Instead of ".cache" default because files/directories
    // that start with a dot are not bundled by default
    options.directory = "cache";
  } else {
    options.duration = "1d";
    options.directory = ".cache";
  }

  let source = "https://saurav.tech/NewsAPI/everything/cnn.json";

  /* This returns a promise */
  return Cache(source, options);

};

// CODE NOT WORKING

// const { AssetCache } = require("@11ty/eleventy-cache-assets"),
// axios = require("axios").default
//
// // THIS COLLECTION IS CACHED! Should not change on every request
//
// module.exports = async function() {
//   // Pass in your unique custom cache key
//   // (normally this would be tied to your API URL)
//   let asset = new AssetCache("news");
//
//   // check if the cache is fresh
//   if(asset.isCacheValid("3d")) {
//     // return cached data.
//     return asset.getCachedValue(); // a promise
//   }
//
//   let options = {};
//
//   if(process.env.ELEVENTY_SERVERLESS) {
//     // Instead of ".cache" default because files/directories
//     // that start with a dot are not bundled by default
//     options.directory = "cache";
//   }
//
//   // do some expensive operation here, this is simplified for brevity
//   const getJSON = async (options) => {
//     const response = await axios({
//       method: 'get',
//       url: 'https://saurav.tech/NewsAPI/everything/cnn.json'
//     })
//     .then(response => {
//       console.log(response.data.articles);
//       return response.data.articles
//     })
//     .catch(error => {
//     })
//     return response ? response : []
//   }
//
//   const news = await getJSON(options);
//
//   await asset.save(news, "json");
//
//   return news;
// };
