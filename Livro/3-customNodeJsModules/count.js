const wc = require('./word-count');
const sentence = 'Where there is much light, there is also much shadow.';
const wordCount = wc(sentence);
console.log(wordCount);
for (let i in wordCount) {
  console.log(wordCount[i] + ' x ' + i);
}