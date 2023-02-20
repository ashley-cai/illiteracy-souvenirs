let sentences: string[] = ["When are you free to give me a haircut? Please let me know, and remember to bring the hairdressing tools!",
"Excited to see you soon at home during your summer vacation!",
"You still remember my birthday, how impressive!",
"Sorry, wrong person. I just got groceries with your mom, I meant to text her.",
"Tomorrow is the Lantern Festival – wishing you a happy holiday, joy in your schoolwork, and excellent grades!",
"Is school busy lately? Please get some rest! If you have time, call me: I miss you! ",
"Grandpa and I prepared a red envelope to celebrate you getting into such a good college. I know you will be successful!",
"I saw on the news today that the Golden Gate was packed with demonstrators.",
"There have been a lot of reports about a pandemic in the US recently, are you guys quarantined? Are you allowed to go outside?",
"I forgot the bed sheet you gave me in the car, just give it to me next time."
]

let answerSentences: string[] = ["你什么时候有空可以给我剪头发？请告诉我，记得带理发工具", 
"盼你暑假早日回家相聚!",
"你还记得外婆生日，真了不起！",
"对不起。我发错了，我刚与你妈到大华99买菜，短信是发给你妈的。",
"明天就是元宵节了，祝你节日块乐，开心学习，成绩优异！",
"近耒学习很紧张吗? 请注意休息！有时间多联糸:奶奶想念你！",
"爷爷奶奶准备一亇小红色包恭喜你上那么好的的大学。相信你一定成才！",
"今天看新闻，金门大桥挤满了示威游行的人。",
"最近有关美国的疫情报道很多，你们现在要居家吗？能不能外出？",
"你给我的床单放在车上忘了拿，下次再给我即可。"
]

let exceptionWords: string[] = ["at", "your", "a","when","you","to","please","me","and","the"," ",".","?","!",",","my","happy","in",
"please","the","i","a","be","to","her","him","with","how","still","just","about","is","if","have","see","will",":","i","it","been",
"gave","in","saw","on","that","some", "red", "give","sorry"]

let guessedWords: string[] = []

let words: string[];
let lowercaseWords: string[];
let redactedWords: string[];
let sentenceObject: HTMLElement;

let numRedactedWords: number = 0;

//Randomly picks a sentence from the list of sentences and initializes/displays it
function initializeSentence(){
    //temporary
    let num = Math.floor(Math.random() * (sentences.length));
    let str = sentences[num]

    //split sentence into separate pieces and store in 2 lists - nonredacted and redacted
    words = str.match(/\w+|\s+|[^\s\w]+/g)!
    lowercaseWords = stringArrayLowercase(words!)
    redactedWords = redactSentence(words!)

    //get printable version of redacted sentence and display
    sentenceObject = document.getElementById("sentence")!
    sentenceObject!.innerHTML = sentenceFromList(redactedWords);

    let answerModal = document.getElementById("answer-modal")!
    answerModal.innerHTML = "<a id='answer-link' href='https://translate.google.com/?sl=zh-CN&tl=en&text=" + 
    answerSentences[num] + "&op=translate'>" + answerSentences[num] + "</a>"
}

//Returns printable version of sentence from array of string
function sentenceFromList(arr: string[]){
    let str = '';
    for (let i = 0; i < arr.length; ++i) {
        str += arr[i]
    }
    return str
}

//takes in array of strings and returns the same in lowercase
function stringArrayLowercase(arr: string[]) {
    let lowercaseArr: string[] = [];
    for (let i = 0; i < arr.length; ++i) {
        lowercaseArr.push(arr[i].toLowerCase())
    }
    return lowercaseArr
}

//returns sentence with redacted words -- used by initialize sentence
function redactSentence(words: string[]) {
    let redactedWords: string[] = []
    for (let i = 0; i < words.length; ++i) {
        if (!exceptionWords.includes(words[i].toLowerCase())) {
            redactedWords.push(redactedGenerator(words[i]))
            numRedactedWords++;
        }
        else {
            redactedWords.push(words[i])
        }
    }
    return redactedWords
}

//returns redacted string based on given length -- used by redactSentence
function redactedGenerator(str: string) {
    return "<span class='redacted'>" + str + "</span>";
}

//Handles guesses from the guess input text box, unredacts if there is a match
function guess() {
    let formObject = document.getElementById("guess")
    let input = formObject?.value
    formObject!.value = ""

    let index = lowercaseWords.indexOf(input.toLowerCase())
    let index2 = exceptionWords.indexOf(input.toLowerCase())
    let index3 = guessedWords.indexOf(input.toLowerCase())

    if (index != -1) {
        if(index2 === -1 && index3 === -1) {
            emojisplosion({
                emojis: ["💖", "💕", "✨", "🌟", "💝"],
                fontSize: [40,80]
              });
            redactedWords[index] = words[index]
            sentenceObject!.innerHTML = sentenceFromList(redactedWords);
            guessedWords.push(input)
            if (guessedWords.length === numRedactedWords) {
                win();
            }
        }
    } else {
        emojisplosion({
            emojis: ["⛔", "🚫", "🛑", "✋"],
            fontSize: [40,80]
          });
    }
}

function win() {
    emojisplosions({
        emojis: ["💖", "💕", "✨", "🌟", "💝"],
      });
      let formObject = document.getElementById("guess")
      let answerButton = document.getElementById("answer-button")
  
      formObject.style.opacity = "0%";
      answerButton.style.opacity = "0%";
      let arrow = document.getElementById("icon")
      arrow?.style.display = "none"
}

function answerButton() {
    let answer = document.getElementById("answer-modal")
    let formObject = document.getElementById("guess")
    let answerButton = document.getElementById("answer-button")

    answer.style.display = "inline";
    formObject.style.opacity = "0%";
    answerButton.style.opacity = "0%";

    let arrow = document.getElementById("icon")
    arrow?.style.display = "none"
}

function aboutButton() {
    let abtModal = document.getElementById('about-modal')
    abtModal.style.display="inline"
}

function closeAboutModal() {
    let abtModal = document.getElementById('about-modal')
    abtModal.style.display="none"
}

window.onload = function() {
    initializeSentence();
  };