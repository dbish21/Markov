/** 
 * Command-line tool to generate Markov text.
 * Usage: node makeText.js [method] [path]
 * Method can be either 'file' or 'url'
 * Path can be either a file path or URL depending on method
 */

const fs = require("fs");
const markov = require("./markov");
const axios = require("axios");
const process = require("process");

/** 
 * Make Markov machine from text and generate text from it.
 * @param {string} text - Input text to generate Markov chains
 */
function generateText(text) {
  let mm = new markov.MarkovMachine(text);
  console.log(mm.makeText());
}

/** 
 * Read file and generate text from it.
 * @param {string} path - Path to text file to read
 * @throws Will exit process with status 1 if file cannot be read
 */
function makeText(path) {
  fs.readFile(path, "utf8", function cb(err, data) {
    if (err) {
      console.error(`Cannot read file: ${path}: ${err}`);
      process.exit(1);
    } else {
      generateText(data);
    }
  });
}

/** 
 * Read URL and make text from it.
 * @param {string} url - URL to fetch text from
 * @throws Will exit process with status 1 if URL cannot be accessed
 */
async function makeURLText(url) {
  let resp;

  try {
    resp = await axios.get(url);
  } catch (err) {
    console.error(`Cannot read URL: ${url}: ${err}`);
    process.exit(1);
  }
  generateText(resp.data)
}

/** 
 * Interpret command line arguments to decide what to do.
 * Examples:
 *   node makeText.js file path/to/file.txt
 *   node makeText.js url http://example.com/text
 */
let [method, path] = process.argv.slice(2);

if (method === "file") {
  makeText(path);
}

else if (method === "url") {
  makeURLText(path);
}

else {
  console.error(`Unknown method: ${method}`);
  process.exit(1);
}