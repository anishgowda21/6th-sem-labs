// In the exam set this file name for npm start script in package.json  

// eg : "start": "node vowelCount.js"



function vowelCount(str) {
    let vowels = ['a', 'e', 'i', 'o', 'u'];
    let count = {};
    for (let i = 0; i < str.length; i++) {
        if (vowels.includes(str[i])) {
            if (count[str[i]]) {
                count[str[i]]++;
            } else {
                count[str[i]] = 1;
            }
        }
    }
    return count;
}

let text = 'Le Tour de France';
let count = vowelCount(text);

console.log("Vowel Frequency in '" + text + "' is: " + JSON.stringify(count));