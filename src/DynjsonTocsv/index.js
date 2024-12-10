const readline = require("../utils/readfile");
const writeFile = require("../utils/writefile");
const ProgressBar = require("progress");
const config = require("./config");
const path = require("path");

const {
  aggregatedExport,
  files,
  sourceFolder,
  extractFolder,
  logFileName,
  patterns,
  conditionalToExclude,
  postProcess
} = config;

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
  const logFile = path.join(__dirname, extractFolder,logFileName);
  let wf;

  if (aggregatedExport) {
    const extractFile = path.join(__dirname, extractFolder,'Aggregated_Export.csv');
    wf = new writeFile({
      extractFile,
      logFile,
      headers: patterns.map(el => el[0]),
      isCSV: true
    });
  }

  for (let filename of files) {
    const start = new Date();
    const dataFile = path.join(__dirname, sourceFolder, filename);

    console.log(`\nProcess started for ${filename}\nCounting number of records:`);
    let counter = 0;
    await readline(dataFile, (line) => {
      counter += 1;
    });   
    console.log(`--> ${format1000s(counter)} records in file`);
    
    const bar = new ProgressBar('Processing [:bar] :percent :etas', {
      complete: '=',
      incomplete: ' ',
      width: 20,
      total: counter,
    });

    if (!aggregatedExport) {
      const extractFile = path.join(__dirname, extractFolder,`${filename}.csv`);
      wf = new writeFile({
        extractFile,
        logFile,
        headers: patterns.map(el => el[0]),
        isCSV: true
      });
    }
    
    let counter2 =0;
    await readline(dataFile, async (line) => {
      let data = extractData(line);
      bar.tick();
      if (conditionalToExclude && conditionalToExclude(data)) return; 
      if (postProcess) {
        data = postProcess(data);
      }
      await wf.writeToCSV(data);
      counter2 += 1;
    });

    logSummary(start, counter, counter2);
  }
}

processFiles();
