"use strict";
let sentences = ["When are you free to give me a haircut? Please let me know, and remember to bring the hairdressing tools!"];
let exceptionWords = ["a", "when", "you", "to", "please", "me", "and", "the", " ", ".", "?", "!", ","];
let words;
let lowercaseWords;
let redactedWords;
let sentenceObject;
//Randomly picks a sentence from the list of sentences and initializes/displays it
function initializeSentence() {
    //temporary
    let str = sentences[0];
    //split sentence into separate pieces and store in 2 lists - nonredacted and redacted
    words = str.match(/\w+|\s+|[^\s\w]+/g);
    lowercaseWords = stringArrayLowercase(words);
    redactedWords = redactSentence(words);
    //get printable version of redacted sentence and display
    sentenceObject = document.getElementById("sentence");
    sentenceObject.innerHTML = sentenceFromList(redactedWords);
    console.log(words);
}
//Returns printable version of sentence from array of string
function sentenceFromList(arr) {
    let str = '';
    for (let i = 0; i < arr.length; ++i) {
        str += arr[i];
    }
    return str;
}
//takes in array of strings and returns the same in lowercase
function stringArrayLowercase(arr) {
    let lowercaseArr = [];
    for (let i = 0; i < arr.length; ++i) {
        lowercaseArr.push(arr[i].toLowerCase());
    }
    return lowercaseArr;
}
//returns sentence with redacted words -- used by initialize sentence
function redactSentence(words) {
    let redactedWords = [];
    for (let i = 0; i < words.length; ++i) {
        if (!exceptionWords.includes(words[i].toLowerCase())) {
            redactedWords.push(redactedGenerator(words[i].length));
        }
        else {
            redactedWords.push(words[i]);
        }
    }
    return redactedWords;
}
//returns redacted string based on given length -- used by redactSentence
function redactedGenerator(length) {
    let str = '';
    for (let i = 0; i < length; ++i) {
        str += '█';
    }
    return str;
}
//Handles guesses from the guess input text box, unredacts if there is a match
function guess() {
    var _a;
    let formObject = document.getElementById("guess");
    let input = (_a = document.getElementById("guess")) === null || _a === void 0 ? void 0 : _a.value;
    formObject.value = "";
    let index = lowercaseWords.indexOf(input.toLowerCase());
    if (index != -1) {
        redactedWords[index] = words[index];
        sentenceObject.innerHTML = sentenceFromList(redactedWords);
    }
}
window.onload = function () {
    initializeSentence();
};
