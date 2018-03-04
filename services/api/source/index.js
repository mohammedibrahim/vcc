const restify = require('restify');
const constants = require('./constants');
const MicroservicesKit = require('./microserviceskit');


/**
 * Config:
 */
const VERSION = require('./package.json').version;

/**
 * Create REST server:
 */
const server = restify.createServer({ name: constants.SERVER_NAME });

/**
 * Search results API handler
 * @description upon completion of handler function in order to move to next 
 * function in the route functions chain
 */
const searchResults = (req, res, next) => {
  // Get search queue:
  const searchQueue = MicroservicesKit.amqpKit.getQueue(constants.SEARCH_QUEUE);

  // Send search event to RabbitMQ via Microserviceskit, elasticsearch is listening
  // on the other end.
  searchQueue.sendEvent(constants.SEARCH_EVENT, {
    // include the search keyword
    keyword: req.params.keyword 
  }, { persistent: true })
    .then(payload => {
      // Send the status code coming from ES, and the data payload (as is)
      // no need to do any transformations at the moment
      res.send(payload.status, payload.data);

      // Mark completed, release the response.
      next();
    })
    .catch(err => {
      // 👎  failed to send search event to elasticsearch!
      // falling back silently to empty results
      res.send(200, []);
      next();
    });

}


// API routes:
server.get({
  path: constants.SEARCH_ROUTE,
  version: require('./package.json').version
}, searchResults);

server.opts({
  path: constants.SEARCH_ROUTE,
  version: require('./package.json').version
}, searchResults);

/**
 * Spin up the REST server
 */
server.listen(constants.PORT, () => {
  console.log(`
      ----------------------------------------
            API IS UP  👍
      ----------------------------------------
          👉  Server name: ${server.name}
          👉  Server URL: ${server.url}
      ----------------------------------------
    `);
});