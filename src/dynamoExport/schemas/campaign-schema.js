const {
  PromotionTypeEnum,
  Publish,
  PublishJobStatus,
  CollectionIndex
} = require('../enums/index');

const artistSchema = {
  canopusId: String,
  name: String,
  partyId: String
};

const artistSub = {
  type: Object,
  schema: artistSchema
};

const publishJobsSchema = {
  eventID: String,
  namespace: String,
  eventListener: String,
  eventStartTime: Date,
  status: {
    type: String,
    enum: [
      PublishJobStatus.COMPLETED,
      PublishJobStatus.FAILED,
      PublishJobStatus.NOT_STARTED,
      PublishJobStatus.PROCESSING
    ]
  }
};

const publishJobsSub = {
  type: Object,
  schema: publishJobsSchema
};

module.exports = {
  id: {
    type: String,
    hashKey: true,
    required: true,
    locked: true
  },
  createdDate: {
    type: Date
  },
  createdBy: {
    type: String
  },
  published: {
    type: String,
    enum: [
      Publish.ARCHIVED,
      Publish.DRAFT,
      Publish.PUBLISHED
    ]
  },
  modelId: {
    type: String,
  },
  lastUpdatedBy: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  unpublished: {
    type: Boolean
  },
  /**
   * below comprise "data" attribute
   */
  artist: {
    type: Object,
    required: true,
    schema: artistSchema
  },
  backgroundConfig: {
    type: String,
    get: (value) => {
      if (value && value.length > 0) {
        return JSON.parse(value);
      }
    }
  },
  backgroundImageAsset: {
    type: String,
  },
  backgroundImageUrl: {
    type: String,
  },
  backgroundVideoAsset: {
    type: String,
  },
  backgroundVideoUrl: {
    type: String,
  },
  css: {
    type: String,
  },
  description: {
    type: String,
  },
  endDate: {
    type: Date
  },
  endDateTimezone: {
    type: String
  },
  favIconAsset: {
    type: String,
  },
  favIconImageId: {
    type: String,
  },
  favIconUrl: {
    type: String,
  },
  featuredArtists: {
    type: Array,
    required: false,
    schema: [artistSub]
  },
  lastUpdated: {
    type: Date
  },
  launchDate: {
    type: Date
  },
  launchDateTimezone: {
    type: String
  },
  legalLinks: {
    type: String
  },
  metaImageAsset: {
    type: String,
  },
  metaImageId: {
    type: String,
  },
  metaImageUrl: {
    type: String,
  },
  metaTitle: {
    type: String,
  },
  path: {
    type: Array,
    required: false,
    schema: [{
      type: Object,
      schema: {
        url: {
          type: String,
          required: false
        }
      }
    }]
  },
  promotionType: {
    type: String,
    enum: [
      PromotionTypeEnum.NO_PROMOTION,
      PromotionTypeEnum.SWEEPSTAKES,
      PromotionTypeEnum.SURPRISE_AND_DELIGHT
    ]
  },
  publishJobs: {
    type: Array,
    required: false,
    schema: [publishJobsSub]
  },
  router: {
    type: String,
    // get: (value) => {
    //   if(value && value.length > 0) {
    //     try {
    //        return JSON.parse(value);
    //     } catch (err) {
    //       console.log(err);
    //       return value;
    //     }
    //   }
    // }
  },
  slug: {
    type: String,
    required: true,
    index: {
      name: CollectionIndex.SLUG_GSI,
      global: true,
      project: ['id', 'router']
    }
  },
  // teams: {
  //   type: Array,
  //   required: true,
  //   schema: ['team'],
  //   refType: true // This is required when schema is a reference to another model
  // },
  territory: {
    type: String,
    // get: (value) => {
    //   if(value && value.length > 0){
    //     return JSON.parse(value);
    //   }
    // }
  },
  themeObject: {
    type: String,
    // get: (value) => {
    //   if(value && value.length > 0){
    //     return JSON.parse(value);
    //   }
    // }
  },
  widgets: {
    type: Array,
    schema: [String]
  },
  clonedFrom: {
    type: String
  },
  templateType: {
    type: String
  },
  templateOption: {
    type: String
  },
  version: {
    type: Number
  },
};
