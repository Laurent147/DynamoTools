const path = require("path");
const ProgressBar = require("progress");
const readline = require("../utils/readfile");
const writeFile = require("../utils/writefile");
const config = require("./config");

const {
  extractFolder,
  logFileName,
} = config;

const dupeCVIds = [];

const format1000s = (num) => num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

const logSummary = (start, counter1, counter2) => {
  const periodMs = new Date() - start;
  
  const time = `${parseInt((periodMs / 1000) /  3600)}:${parseInt((periodMs / 1000) /  60)}:${parseInt((periodMs % 60000)/1000)}-${periodMs - parseInt(periodMs / 1000) * 1000}`
  const used = process.memoryUsage().heapUsed / 1024 / 1024;
  

  console.log(`Used ~ ${Math.round(used * 100) / 100} MB of memory`);
  console.log(`Took ${time}`);
  console.log(`Extracted ${format1000s(counter2)} / ${format1000s(counter1)} after excluding condition`);
  console.log("-----------------------------------------------------");
}

const processData = async (data, wf, bar) => {
  data.sort((a,b) => Number(b.createdAt) - Number(a.createdAt));

  for(const cv of data) {
    bar.tick();
    if ('NO_PROMOTION' != cv.promotionType) {
      await wf.writeLine(`${JSON.stringify({campaignId: cv.campaignId, promotionType: cv.promotionType, createdAt: new Date(Number(cv.createdAt))})}`);
    }
  }
}

processFiles = async () => {
  
  const extractFile = path.join(__dirname, extractFolder,`campaign-version-${new Date().getTime()}.js`);
  const logFile = path.join(__dirname, extractFolder,logFileName);
  const wf = new writeFile({
    extractFile,
    logFile
  });

  const dataFile = require('./data/campaign-version-dupes');

  if (typeof dataFile === 'undefined') return;

  let totalRow = dataFile.length;

  const starttotal = new Date();
  await wf.writeLine('const dupeCampaignVersions = [');

  const start = new Date();
  
  console.log(`\nProcess started`);
  console.log(`--> ${format1000s(totalRow)} records in file`);

  const bar = new ProgressBar('Processing [:bar] :percent :etas', {
  complete: '=',
  incomplete: ' ',
  width: 20,
  total: totalRow,
  });

  await processData(dataFile, wf, bar);

  await wf.writeLine(']\n\nmodule.exports = dupeCampaignVersions;');
  console.log(`Process ended - dupes: ${dupeCVIds.length} / ${totalRow}`)

  logSummary(starttotal, totalRow, totalRow);
}

processFiles();
