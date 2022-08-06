// In the exam set this file name for npm start script in package.json  

// eg : "start": "node vowelCount.js"

// 8.(a)Write an npm script having a function vowelCount() that takes a string as input and counts number of occurrences of each vowels in the string. (Hint: run the program through npm start)
//For. Eg. Input   :  vowelCount('Le Tour de France') 
// Output:  a, e, i, o, and u appear, respectively, 1, 3, 0, 1, 1 times


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