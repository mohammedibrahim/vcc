module.exports = {
  /**
   * @constant {String} SERVICE_NAME Name of this service, 
   * used by microserviceskit
   */
  SERVICE_NAME: 'elasticsearch',

  /**
   * @constant {String} PRIMARY_INDEX Primary ES index
   */
  PRIMARY_INDEX: 'mamasandpapas',
  
  /**
   * @constant {String} PRIMARY_TYPE Primary ES type
   */
  PRIMARY_TYPE: 'products',
  
  /**
   * @constant {String} ELASTICSEARCH_HOST ES host
   */
  ELASTICSEARCH_HOST: 'elasticsearch',
  
  /**
   * @constant {String} ELASTICSEARCH_PORT ES port
   */
  ELASTICSEARCH_PORT: 9200,
  
  /**
   * @constant {String} ELASTICSEARCH_LOG_TYPE ES log level
   */
  ELASTICSEARCH_LOG_TYPE: 'trace', // logging everything (trace)
  
  /**
   * @constant {String} ELASTICSEARCH_PING_TIMEOUT Time to wait before saying ES is down
   */
  ELASTICSEARCH_PING_TIMEOUT: 3000,
  
  /**
   * @constant {String} ELASTICSEARCH_FUZZINESS_LEVEL Level of search fuzziness
   */
  ELASTICSEARCH_FUZZINESS_LEVEL: 'AUTO',
  
  /**
   * @constant {String} PRODUCTS_NAME_FIELD Field for product name, it was 
   * put here to make migration easier, if it's changed anytime in DB/Index 
   * then this is the only place to refactor
   */
  PRODUCTS_NAME_FIELD: 'name',
  
  /**
   * @constant {String} PRODUCTS_DESCRIPTION_FIELD Field for product description, 
   * it was put here to make migration easier, if it's changed anytime in DB/Index
   * then this is the only place to refactor
   */
  PRODUCTS_DESCRIPTION_FIELD: 'description',
  
  /**
   * @constant {String} PRODUCTS_SKU_FIELD Field for product sku field,
   * it was put here to make migration easier, if it's changed anytime in DB/Index
   * then this is the only place to refactor
   */
  PRODUCTS_SKU_FIELD: 'sku',
  
  /**
   * @constant {String} PRODUCTS_EDI_REF_FIELD Field for product ediRef field,
   * it was put here to make migration easier, if it's changed anytime in DB/Index
   * then this is the only place to refactor
   */
  PRODUCTS_EDI_REF_FIELD: 'ediRef',
  
  /**
   * @constant {String} PRODUCTS_IS_IN_STOCK_SORTING Sorting order for isInStock property
   */
  PRODUCTS_IS_IN_STOCK_SORTING: 'desc',
  
  /**
   * @constant {String} PRODUCTS_SCORE_SORTING Sorting order for score
   */
  PRODUCTS_SCORE_SORTING: 'desc',
  
  /**
   * @constant {String} MATCH_PHONETIC Search using phonetic representations
   */
  MATCH_PHONETIC: false,
  
  /**
   * @constant {String} DEFAULT_STATUS_CODE Default status code for successful searches
   */
  DEFAULT_STATUS_CODE: 200,
  
  /**
   * @constant {String} RABBIT_URL RabbitMQ URL
   */
  RABBIT_URL: process.env.RABBIT_AMQP_URL,
  
  /**
   * @constant {String} SEARCH_QUEUE Search queue name
   */
  SEARCH_QUEUE: 'search',
  
  /**
   * @constant {String} SEARCH_EVENT Search event
   */
  SEARCH_EVENT: 'product-search',
  
  /**
   * @constant {String} QUEUES_LIST Queues list for this service
   */
  QUEUES_LIST: [
    {
      name: 'search',
      key: 'search',
      options: { durable: true }
    }
  ]
};