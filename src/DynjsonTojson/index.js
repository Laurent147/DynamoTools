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
// const promoId = '5f5a6c83-7937-4eda-858d-f2e3ba59fa46';
const extractData = (line) => {
  const record = [];
  for (let [key, pattern] of patterns) { 
    const res = line.match(pattern);
    let val = null;
    if (res && res.length >= 2) val = res[1];

    record.push(val);
  }
  return record;
}

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

processFiles = async () => {
  
  const extractFile = path.join(__dirname, extractFolder,`campaign-version-${new Date().getTime()}.js`);
  const logFile = path.join(__dirname, extractFolder,logFileName);
  const wf = new writeFile({
    extractFile,
    logFile
  });
  let totalRow = 0;
  let totalExtracted = 0;
  const starttotal = new Date();
  await wf.writeLine('const campaignVersions = [');

  // const excludeValues = require('./ETL_export/hackers');
  // const keep =new Map();
  let totalEntries = 0;
  for (let filename of files) {
    const start = new Date();
    const dataFile = path.join(__dirname, sourceFolder, filename);
    
    
    console.log(`\nProcess started for ${filename}\nCounting number of records:`);
    let counter = 0;
    await readline(dataFile, (line) => {
      counter += 1;
    });   
    console.log(`--> ${format1000s(counter)} records in file`);
    totalRow += counter;

    const bar = new ProgressBar('Processing [:bar] :percent :etas', {
    complete: '=',
    incomplete: ' ',
    width: 20,
    total: counter,
    });
    
    let counter2 =0;
    await readline(dataFile, async (line) => {
      const data = extractData(line);
      bar.tick();
      if (conditionalToExclude && conditionalToExclude(data, excludeValues, keep)) return;
      counter2 += 1;

      let pageIds = [];
      try {
        let cleaned = data[8].replace(/\\/g,'');
        cleaned = cleaned.replace(/\\/g,'');
        const router = JSON.parse(cleaned);

        if (router?.routes && router.routes.length) {
          for (const route of router.routes) {
            if (route?.default) {
              pageIds.push(route.default);
            }
          }
        }
      } catch (err) {
        console.log(err);
        wf.logs.write(`couldn\'t parse router for record id: ${data[0]}\n`);
      }

      const ESJsonData = {
        id: data[0],
        campaignId: data[1],
        version: data[2],
        createdAt: data[3],
        name: data[4],
        published: data[5],
        unpublished: data[6],
        promotionType: data[7],
        routes: pageIds.length ? pageIds : null
      }
      // const ESJsonStr = JSON.stringify(ESJsonData);
      // for( let i= 0; i < +ESJsonData.weight; i++) {
      //   await wf.writeLine(line);
      // }
      await wf.writeLine(`${JSON.stringify(ESJsonData)},`);
      totalEntries += +ESJsonData.weight;
    });

    
    logSummary(start, counter, counter2);
    totalExtracted += counter2;
  }

  await wf.writeLine(']');
  logSummary(starttotal, totalRow, totalExtracted);

  // console.log('keep map size', keep.size);
  // keep.forEach((val, key, map) => {
  //   console.log(`${JSON.stringify(val)},`);
  // })
}

processFiles();
