
module.exports = {
  id: {
    type: String,
    hashKey: true,
    required: true
  },
  promotionId: {
    type: String,
    required: true,
    // index: {
    //   global: true,
    //   name: 'promotionId-index'
    // }
  },
  campaignId: {
    type: String,
    required: true,
    index: {
      global: true,
      name: 'campaignId'
    }
  },
  status: {
    type: String,
    required: true,
    default:'NEW',
    enum:['NEW','DUPLICATE']
  },
  submission: {
    type: Object,
    required: true
  },
};