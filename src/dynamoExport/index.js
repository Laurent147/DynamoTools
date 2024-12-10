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
const readline = require('../utils/readfile');
const writeFile = require("../utils/writefile");
// const campaignSchema = require('./schemas/campaign-schema');
const pageSchema = require('./schemas/page-schema');

const DATA_DIR = './data'

const dataFile = path.join(__dirname, DATA_DIR, 'pageIds_test.txt')
const extractFile = path.join(__dirname, DATA_DIR, 'extract.csv');
const logFile = path.join(__dirname, DATA_DIR, 'extract-log.txt');

const globalAWSConfig = {
    credentials: {
        accessKeyId: env.AWS_ACCESS_KEY_ID_PROD,
        secretAccessKey: env.AWS_SECRET_ACCESS_KEY_PROD
    },
    region: env.AWS_REGION_PROD
};

const TABLE_NAME = env.PROD_PAGE_TABLE;

const findAttribute = async (stringObj, regExpPattern) => {
  const reg = new RegExp(regExpPattern, 'g');
  const matches = [...stringObj.matchAll(reg)];
  if (matches?.length) {
    if (matches.length === 1) {
      return matches[0][1];
    }
    const vals = [];
    for (let match of matches) {
      return vals.push(match[1]);
    }
  } else {
    console.log('There were no matches');
    return null;
  }
}

const main = async (id) => {
  const dyn = new DynQueryClass(pageSchema, TABLE_NAME, globalAWSConfig);
  const key = 'id';

  const wf = new writeFile({
    extractFile,
    logFile,
    headers: ['id', 'campaignId','url', 'name', 'sourceUrl', 'status', 'published', 'updatedAt', 'lastUpdatedBy', 'createdAt', 'createdBy' ],
    isCSV: true
  });

  readline(dataFile, async (line) => {
    console.log('line: ', line);
    const results = await dyn.findItemById(key, line);
    if (results && results?.length > 0) {
      for (const res of results) {
        const regExpPattern = '"sourceUrl":"([^"]*)"'
        const attr = await findAttribute(JSON.stringify(res), regExpPattern);
        // console.log('Results: ', {id: res.id, campaignId: res.campaignId, attr});
        if (!!attr) {
          wf.writeToCSV([res.id, res.campaignId, res.url, res.name, attr, res.status, res.published, res.updatedAt, res.lastUpdatedBy, res.createdAt, res.createdBy]);
        }
      }
    }
  });
}

main();