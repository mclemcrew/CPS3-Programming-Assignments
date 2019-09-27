const parse = require('csv-parse')
const fs = require('fs');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
const { mean,std } = require('mathjs')
const csvWriter = createCsvWriter({
  path: 'features.csv',
  header: [
    {id: 'mean_X', title: 'Mean (X)'},
    {id: 'std_X', title: 'STD (X)'},
    {id: 'mean_Y', title: 'Mean (Y)'},
    {id: 'std_Y', title: 'STD (Y)'},
    {id: 'mean_Z', title: 'Mean (Z)'},
    {id: 'std_Z', title: 'STD (Z)'},
    {id: 'activity', title: 'Activity'},
  ]
});

const path = 'new-data/';
let dataStream = [];

let workingArray = [];
let intermediateArrays = [];
let featureArray = [];

let count = 0;
let indexNum = 0;
let oldIndexNum = 0;
let done = false;

let xArray = [];
let yArray = [];
let zArray = [];
let activity;
let files = [];

fs.readdirSync(path).forEach(file => {
  files.push(file);
});

  console.log(files);
  workingArray = [];
  intermediateArrays = [];
  featureArray = [];
  count = 0;
  indexNum = 0;
  oldIndexNum = 0;

fs.createReadStream(path + 'G7NZCJ008056297-Michael-left-hand_wash-soap-2019-09-24-08-21-41.csv')
  .pipe(parse())
  .on('data', (row) => {
    workingArray.push(row);
  })
  .on('end', () => {
    while(!done) {
      console.log('----------------------------------');
      console.log(files[1]);
      // console.log(workingArray[indexNum][0]);
      intermediateArrays[count] = workingArray.filter((item) => {
        return parseInt(item[0])<=(parseInt(workingArray[indexNum][0])+1000);
      });
      // console.log(intermediateArrays[count][intermediateArrays[count].length-1][0]);
      
      let tempValue = intermediateArrays[count][intermediateArrays[count].length-1][0];

      for(var i = 0; i < workingArray.length; i++) {
        if(workingArray[i][0] == tempValue) {
          indexNum = i;
        }
     }

      try {
        if(workingArray[indexNum+1][0]!=undefined) {
          // console.log("We're good here.")
        }
      } catch (error) {
        done = true;
        continue;
      }

      // TODO  
      // Make sure that you fix the ID number
      xArray = [];
      yArray = [];
      zArray = [];
      
      console.log(oldIndexNum);
      for(let j=oldIndexNum;j< intermediateArrays[count].length;j++) {
        xArray.push(intermediateArrays[count][j][1]);
        yArray.push(intermediateArrays[count][j][2]);
        zArray.push(intermediateArrays[count][j][3]);
      }

      // console.log(xArray);

      dataStream.push({
        mean_X: mean(xArray),
        std_X: std(xArray),
        mean_Y: mean(yArray),
        std_Y: std(yArray),
        mean_Z: mean(zArray),
        std_Z: std(zArray),
        activity: activity
      })
      // console.log(workingArray[indexNum][0]);
      count = count + 1;
      indexNum = indexNum + 1;
      oldIndexNum = indexNum;
      // console.log(count);
      // console.log(indexNum);
    }
    csvWriter
      .writeRecords(dataStream)
      .then(()=> console.log('The CSV file was written successfully'));
      // console.log(dataStream);
  });
