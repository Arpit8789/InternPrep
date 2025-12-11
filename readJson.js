import fs from 'fs';

// read both files separately
const raw1 = fs.readFileSync('DSA_Interview_Problems_330_Complete.json', 'utf-8');
const raw2 = fs.readFileSync('DSA_Advanced_Patterns_260_Problems.json', 'utf-8');

const data1 = JSON.parse(raw1);
const data2 = JSON.parse(raw2);

// helper to extract questions from one data file
function extractQuestions(data) {
  const questions = [];
  for (const [patternKey, patternObj] of Object.entries(data.patterns)) {
    for (const p of patternObj.problems) {
      questions.push({
        title: p.title,
        pattern: patternKey,
        difficulty: p.difficulty,
        leetcodeLink: p.url,
      });
    }
  }
  return questions;
}

const questions1 = extractQuestions(data1);
const questions2 = extractQuestions(data2);

// merge arrays (you can also use concat)
const allQuestions = [...questions1, ...questions2];

fs.writeFileSync('all_dsa_questions.json', JSON.stringify(allQuestions, null, 2), 'utf-8');
console.log('Total questions:', allQuestions.length);
