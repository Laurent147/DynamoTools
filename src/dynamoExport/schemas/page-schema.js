const { Publish, PagesStatus } = require('../enums/index');

module.exports = {
  id: {
    type: String,
    hashKey: true,
    required: true,
    locked: true
  },
  name: {
    type: String,
    required: true
  },
  published: {
    type: String,
    enum: [
      'draft',
      'published',
      'archived'
    ]
  },
  modelId: {
    type: String,
  },
  status: {
    type: String,
    enum: [ 'ACTIVE', 'DELETED' ],
    default: 'ACTIVE',
    required: true
  },
  createdDate: {
    type: Date
  },
  createdBy: {
    type: String
  },
  lastUpdated: {
    type: Date
  },
  lastUpdatedBy: {
    type: String
  },
  /**
  * below comprise "data" attribute
  */
  campaignId: {
    type: String,
    required: true
  },
  url: {
    type: String
  },
  blocks: {
    type: String,
    required: true,
    get: (value) => {
      if (value && value.length > 0) {
        return JSON.parse(value);
      }
    }
  },
  version: {
    type: Number
  },
};
