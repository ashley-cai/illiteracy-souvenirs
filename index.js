"use strict";
let sentences = ["When are you free to give me a haircut? Please let me know, and remember to bring the hairdressing tools!",
    "Excited to see you soon at home during your summer vacation!"];
let answerSentences = ["你什么时候有空可以给我剪头发？请告诉我，记得带理发工具",
    "盼你暑假早日回家相聚!"];
let exceptionWords = ["at", "your", "a", "when", "you", "to", "please", "me", "and", "the", " ", ".", "?", "!", ","];
let words;
let lowercaseWords;
let redactedWords;
let sentenceObject;
//Randomly picks a sentence from the list of sentences and initializes/displays it
function initializeSentence() {
    //temporary
    let num = Math.floor(Math.random() * (sentences.length));
    console.log(num);
    let str = sentences[num];
    //split sentence into separate pieces and store in 2 lists - nonredacted and redacted
    words = str.match(/\w+|\s+|[^\s\w]+/g);
    lowercaseWords = stringArrayLowercase(words);
    redactedWords = redactSentence(words);
    //get printable version of redacted sentence and display
    sentenceObject = document.getElementById("sentence");
    sentenceObject.innerHTML = sentenceFromList(redactedWords);
    let answerModal = document.getElementById("answer-modal");
    answerModal.innerHTML = answerSentences[1];
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
            redactedWords.push(redactedGenerator(words[i]));
        }
        else {
            redactedWords.push(words[i]);
        }
    }
    return redactedWords;
}
//returns redacted string based on given length -- used by redactSentence
function redactedGenerator(str) {
    return "<span class='redacted'>" + str + "</span>";
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
function answerButton() {
    let answer = document.getElementById("answer-modal");
    let formObject = document.getElementById("guess");
    let answerButton = document.getElementById("answer-button");
    answer.style.display = "inline";
    formObject.style.opacity = "0%";
    answerButton.style.opacity = "0%";
}
function aboutButton() {
    let abtModal = document.getElementById('about-modal');
    abtModal.style.display = "inline";
}
function closeAboutModal() {
    let abtModal = document.getElementById('about-modal');
    abtModal.style.display = "none";
}
window.onload = function () {
    initializeSentence();
};
