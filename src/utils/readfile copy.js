import events from 'events';
import fs from 'fs';
import readline from 'readline';

export async function processLineByLine(filePath, cb) {
  const start = new Date();
  try {
    const rl = readline.createInterface({
      input: fs.createReadStream(filePath),
      crlfDelay: Infinity
    });

    return new Promise((res, rej) => {
      rl.on('line', async (line) => {
        rl.input.pause();
        try {
          if (cb) await cb(line);
        } catch (err) {
          console.log(err);
        }
        rl.input.resume();
      });
  
      rl.input.on('end', ()=>{
        return res();
      })

      rl.input.on('error', () => {
        return rej();
      })
      // await events.once(rl, 'close');
    })

  } catch (err) {
    console.error(err);
  }
};

export async function processLineByLine2(filePath, cb) {
  const start = new Date();
  try {
    const rl = readline.createInterface({
      input: fs.createReadStream(filePath),
      crlfDelay: Infinity
    });

    return new Promise((res, rej) => {
      rl.on('line', async (line) => {
        rl.input.pause();
        try {
          if (cb) await cb(line);
        } catch (err) {
          console.log(err);
        }
        rl.input.resume();
      });
  
      rl.input.on('end', ()=>{
        return res();
      })

      rl.input.on('error', () => {
        return rej();
      })
      // await events.once(rl, 'close');
    })

  } catch (err) {
    console.error(err);
  }
};

export async function mainLine(inputFilePath) {
  const readStream = fs.createReadStream(inputFilePath,
    { encoding: 'utf8', highWaterMark: 1024 });

  for await (const chunk of readStream) {
    console.log('>>> ' + chunk);
  }
  console.log('### DONE ###');
}