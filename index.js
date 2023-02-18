"use strict";
let sentences = ["When are you free to give me a haircut? Please let me know, and remember to bring the hairdressing tools!"];
let exceptionWords = ["a", "when", "you", "to", "please", "me", "and", "the", " ", ".", "?", "!",];
//Randomly picks a sentence from the list of sentences and 
function initializeSentence() {
    let str = sentences[0];
    let words = str.match(/\w+|\s+|[^\s\w]+/g);
    let redactedWords = redactSentence(words);
    let sentenceObject = document.getElementById("sentence");
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
//returns sentence with redacted words
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
//returns redacted string based on given length
function redactedGenerator(length) {
    let str = '';
    for (let i = 0; i < length; ++i) {
        str += '█';
    }
    return str;
}
window.onload = function () {
    initializeSentence();
};
