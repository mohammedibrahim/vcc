const elasticsearch = require('elasticsearch');
const MSK = require('microservice-kit');
const constants = require('./constants');
const bootstrapIndex = require('./bootstrapIndex');

/**
 * GENERAL NOTE:
 * This file could be better organized and splitted.
 * 
 * However, since this microservice is doing only one thing: (searching products)
 * and not much cases/configs, so I'm leaving everything here.
 */

// Initiate Elasticsearch client
const elasticclient = new elasticsearch.Client({

  /**
   * Elasticsearch host
   */
  host: `${constants.ELASTICSEARCH_HOST}:${constants.ELASTICSEARCH_PORT}`,

  /**
   * Elasticsearch logger
   */
  log: constants.ELASTICSEARCH_LOG_TYPE
});

/**
 * Index products in elasticsearch
 */
bootstrapIndex(elasticclient);

/**
 * Unlike (api) service, not separating 
 * microserviceskit functionality here
 * since it's really the main functionality 
 * here in this service.
 */
const elasticMSK = new MSK({
  type: constants.SERVICE_NAME,
  config: null,
  amqp: {
    url: constants.RABBIT_URL,
    queues: constants.QUEUES_LIST
  }
});

/**
 * Initialize microserviceskit for Elasticsearch
 */
elasticMSK.init()
  .then(() => {
    // microservice kit is up for Elasticsearch 👍

    // Get main queue
    const searchQueue = elasticMSK.amqpKit.getQueue(constants.SEARCH_QUEUE);

    // 📶 Start listening on SEARCH_EVENT
    searchQueue.consumeEvent(constants.SEARCH_EVENT, (data, callback, progress, routingKey) => {

      // Incoming search keyword (for now, exclusively from api service)
      const keyword = data.keyword;

      // Run search query
      elasticclient.search({
        index: constants.PRIMARY_INDEX,
        type: constants.PRIMARY_TYPE,
        body: {
          query: {
            bool: {
              should: [
                {
                  // Match multiple fields, with fuzziness 
                  //for typo and and misspelling
                  multi_match: {
                    query: keyword,
                    
                    // https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-multi-match-query.html#type-best-fields
                    type: 'best_fields',
                    
                    // https://www.elastic.co/guide/en/elasticsearch/reference/6.2/common-options.html#fuzziness
                    fuzziness: constants.ELASTICSEARCH_FUZZINESS_LEVEL,
                    
                    fields: [
                      `${constants.PRODUCTS_NAME_FIELD}${constants.MATCH_PHONETIC ? '.phonetic^2' : '^4'}`,
                      constants.PRODUCTS_DESCRIPTION_FIELD
                    ]
                  }
                },
                {
                  multi_match: {
                    query: keyword,
                    
                    // https://www.elastic.co/guide/en/elasticsearch/reference/current/query-dsl-multi-match-query.html#type-best-fields
                    type: 'best_fields',
                    
                    fields: [
                      constants.PRODUCTS_SKU_FIELD, 
                      constants.PRODUCTS_EDI_REF_FIELD
                    ]
                  }
                }
              ]
            }
          },
          sort: [
            // Sorting with both isInStock availability and score, so 
            // products with best score, and are in stock are shown on top
            // and products out of stock are tailing the results
            { isInStock: { order: constants.PRODUCTS_IS_IN_STOCK_SORTING } },
            { _score: { order: constants.PRODUCTS_SCORE_SORTING } }
          ]
        }
      }).then(

        // If results are found, return the hits, with the 
        // default status code
        res => callback(null, { data: res.hits.hits, status: constants.DEFAULT_STATUS_CODE }), 
        
        // If something went wrong, return error message, with proper 
        // status code
        err => callback(null, { data: { error: err.message }, status: err.status })
      );
    });
  })
  .catch(err => {
    // 👎  failure in initializing microservices kit!
    throw new Error(err);
  });