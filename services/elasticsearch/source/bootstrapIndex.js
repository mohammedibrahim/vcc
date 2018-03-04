const constants = require('./constants');

// Products JSON file is mounted here during service build
// in 'elasticdata' volume
const products = require('/elasticdata/products.json');

module.exports = client => {

  // Ping Elastic search, in order to figure out if it's 
  // up and running:
  client.ping({
    requestTimeout: constants.ELASTICSEARCH_PING_TIMEOUT
  }, err => {
    if (err) {
      // 👎 elasticsearch is down!
      throw new Error(err);
    } else {
      // elasticsearch is up  👍
    }
  });

  // Check if the primary index is there
  client.indices.exists({ index: constants.PRIMARY_INDEX }).then(exists => {

    // If primary index not found, bulk index all products
    if (!exists) {
      client.bulk({
        body: products,
        index: constants.PRIMARY_INDEX,
        type: constants.PRIMARY_TYPE
      }).then(res => {
        // successfully indexed products 👍
      }).catch(err => {
        // failed to index products 👎
        // not throwing error here, to keep everything up
        // but search results will return empty array
      });
    } else {
      // ℹ️  mamasandpapas index exists
      // do nothing
    }
  });
}