// package imports
const path = require('path');
const dotenv = require('dotenv');
const expand = require('dotenv-expand');
const getEnvironment = () => {
  const flatEnvironment = dotenv.config();
  return expand({ parsed: flatEnvironment.parsed }).parsed;
};
const env = getEnvironment();

// app imports
const DynQueryClass = require('./utils/dynamoClass');
const entrySchema = require('./schemas/entry-schema');
const TABLE_NAME = env.PROD_ENTRY_TABLE;

const globalAWSConfig = {
    credentials: {
        accessKeyId: env.AWS_ACCESS_KEY_ID_PROD,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY_PROD
    },
    region: env.AWS_REGION_PROD
};

const main = async () => {
  const dyn = new DynQueryClass(entrySchema, TABLE_NAME, globalAWSConfig);
  const key = 'campaignId';
  const id = 'dd8fb982fcde446aa9fb87827f92cc4e'
  const index = 'campaignId'

  const results = await dyn.findItemCountByIndex(key, id, index);
  console.log(results);
}

main();