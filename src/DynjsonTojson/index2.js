const path = require("path");
const ProgressBar = require("progress");
const readline = require("../utils/readfile");
const writeFile = require("../utils/writefile");
const config = require("./config");

const {
  files,
  sourceFolder,
  extractFolder,
  logFileName,
  patterns,
  conditionalToExclude
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
  await data.sort((a,b) => {
    const campA = a.campaignId;
    const campB = b.campaignId
    return campA.localeCompare(campB);
  });

  let curId = '';
  curArr = [];
  for(const cv of data) {
    bar.tick();
    if (curId != cv.campaignId) {

      checkDupe(curId, curArr, wf);
      curId = cv.campaignId;
      curArr = [];
    }
    curArr.push(cv);
  }

  wf.logs.write(`Processing last curId ${curId}\n`);
  checkDupe(curId, curArr, wf);

}

const checkDupe = async (curId, curArr, wf) => {
  if (curArr.length){
    curArr.sort((a,b) => Number(b.version) - Number(a.version));
    let hasDupe = false;
    let prevVal = '';
    for(const val of curArr) {
      if(prevVal === Number(val.version)) {
        hasDupe = true;
        break;
      }
      prevVal = Number(val.version);
    }

    if (hasDupe) {
      dupeCVIds.push(curId);
      await wf.writeLine(`${JSON.stringify(curArr[0])},`);
    } else {
      wf.logs.write(`No dupes: ${curId}\n`);
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

  const dataFile = require('./data/campaign-version-sorted');

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
