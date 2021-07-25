const quesHead = document.getElementById("que");
const options = document.getElementById("options");
const startBtn = document.getElementById("startBtn");
const quesCon = document.getElementById("questionCon");
const resCon = document.getElementById("resCon");
const tryAgainBtn = document.getElementById("tryAgainBtn");

let currentQuestionIndex;


const originalPetsQualitiesDb = [
  {"name": "Labrador Retriever", "smallSpace": false, "firstTimer": true , "alone": false, "friendly": true, "friendlyToStrangers": true, 'bigSize': true, "easyToTrain": true, "energy": true},
  {"name": "German Shepherd", "smallSpace": true, "firstTimer": false, "alone": false, "friendly": false, "friendlyToStrangers": true, 'bigSize': true, "easyToTrain": true, "energy": true},
  {"name": "Pomeranian", "smallSpace": true, "firstTimer": true, "alone": false, "friendly": false, "friendlyToStrangers": true, 'bigSize': false, "easyToTrain": true, "energy": true},
  {"name": "Doberman Pinscher", "smallSpace": false, "firstTimer": false, "alone": false, "friendly": false, "friendlyToStrangers": false, 'bigSize': true, "easyToTrain": true, "energy": true},
  {"name": "Great Dane", "smallSpace": false, "firstTimer": false, "alone": false, "friendly": true, "friendlyToStrangers": true, 'bigSize': true, "easyToTrain": true, "energy": true},
  {"name": "Pug", "smallSpace": true, "firstTimer": true, "alone": false, "friendly": true, "friendlyToStrangers": true, 'bigSize': false, "easyToTrain": true, "energy": false},
  {"name": "Siberian Husky", "smallSpace": false, "firstTimer": false, "alone": false, "friendly": true, "friendlyToStrangers": true, 'bigSize': true, "easyToTrain": false, "energy": true},
  {"name": "Beagle", "smallSpace": true, "firstTimer": true, "alone": false, "friendly": true, "friendlyToStrangers": true, 'bigSize': false, "easyToTrain": false, "energy": true},
  {"name": "Boxer", "smallSpace": true, "firstTimer": true, "alone": false, "friendly": false, "friendlyToStrangers": true, 'bigSize': false, "easyToTrain": true, "energy": true},
  {"name": "Bullmastiff", "smallSpace": true, "firstTimer": false, "alone": false, "friendly": true, "friendlyToStrangers": true, 'bigSize': true, "easyToTrain": true, "energy": false},
  {"name": "Rottweiler", "smallSpace": false, "firstTimer": false, "alone": false, "friendly": false, "friendlyToStrangers": true, 'bigSize': true, "easyToTrain": true, "energy": true},
  {"name": "Golden Retriever", "smallSpace": false, "firstTimer": true, "alone": false, "friendly": true, "friendlyToStrangers": true, 'bigSize': true, "easyToTrain": true, "energy": true},
  {"name": "Dachshund", "smallSpace": true, "firstTimer": true, "alone": true, "friendly": true, "friendlyToStrangers": false, 'bigSize': false, "easyToTrain": false, "energy": true},
  {"name": "Lhasa Apso", "smallSpace": true, "firstTimer": true, "alone": true, "friendly": true, "friendlyToStrangers": false, 'bigSize': false, "easyToTrain": true, "energy": true},
  {"name": "Samoyed", "smallSpace": false, "firstTimer": false, "alone": false, "friendly": true, "friendlyToStrangers": true, 'bigSize': true, "easyToTrain": true, "energy": true},
  {"name": "Poodle", "smallSpace": true, "firstTimer": true, "alone": false, "friendly": true, "friendlyToStrangers": true, 'bigSize': true, "easyToTrain": true, "energy": true},
  {"name": "French Bulldog", "smallSpace": true, "firstTimer": true, "alone": false, "friendly": true, "friendlyToStrangers": true, 'bigSize': false, "easyToTrain": true, "energy": false},
  {"name": "Saint Bernard", "smallSpace": true, "firstTimer": false, "alone": false, "friendly": true, "friendlyToStrangers": true, 'bigSize': true, "easyToTrain": false, "energy": true},
  {"name": "Chow Chow", "smallSpace": true, "firstTimer": false, "alone": true, "friendly": false, "friendlyToStrangers": false, 'bigSize': false, "easyToTrain": true, "energy": false},
  {"name": "Dalmatian", "smallSpace": false, "firstTimer": true, "alone": true, "friendly": true, "friendlyToStrangers": true, 'bigSize': true, "easyToTrain": true, "energy": true},
  {"name": "Bulldog", "smallSpace": true, "firstTimer": true, "alone": true, "friendly": false, "friendlyToStrangers": true, 'bigSize': false, "easyToTrain": true, "energy": false},
  {"name": "Pit Bull Terrier", "smallSpace": true, "firstTimer": false, "alone": false, "friendly": false, "friendlyToStrangers": true, 'bigSize': true, "easyToTrain": true, "energy": true}
];

petsQualitiesDB = originalPetsQualitiesDb;

const questions = [
  {que: "Do you need a big size pet?", prop: "bigSize"},
  {que: "Do you want a pet who is able to adjust in home like space (small space)?", prop: "smallSpace"},
  {que: "Are you a going to a first time pet owner?", prop: "firstTimer"},
  {que: "Are you looking for a pet which can be left alone for some time?", prop: "alone"},
  {que: "Are you looking for a pet which will be friendly with others dogs?", prop: "friendly"},
  {que: "Do you want a pet which will be friendly to strangers?", prop: "friendlyToStrangers"},
  {que: "Are you looking for a pet which is easy to train?", prop: "easyToTrain"},
  {que: "Are you looking for a pet with high energy level", prop: "energy"}
];

function takeChance(answer, quality){

  let ans = false;
  if (answer == "yes"){
    ans = true;
  }


  if(equating(quality) && petsQualitiesDB[0][quality] != ans){
    endQuiz();
  }else{
    let to_remove = [];
    for (let pet of petsQualitiesDB){
      if (pet[quality] != ans){
        to_remove.push(pet);
      }
    }


    petsQualitiesDB = petsQualitiesDB.filter(x => !to_remove.includes(x));
  }


  if (petsQualitiesDB.length <= 1){
    return false;
  }else{
    return true;
  }
}

function equating(quality){
  const firstValue = petsQualitiesDB[0][quality];

  for(i = 1; i < petsQualitiesDB.length; i++){
    if(petsQualitiesDB[i][quality] != firstValue){
      return false;
    }
  }
  return true;
}


function start(){
  currentQuestionIndex = 0;

  startBtn.classList.add("hide");
  quesCon.classList.remove("hide");

  setNewQuestion();
};

function setNewQuestion(){
  if(questions.length == currentQuestionIndex){
    endQuiz();
  }else{
    quesHead.innerHTML = questions[currentQuestionIndex].que;

    options.addEventListener("click", selectAnswer);
  }
};

function selectAnswer(e){
  ans = e.target.id;

  if(takeChance(ans, questions[currentQuestionIndex].prop)){
    currentQuestionIndex++;
    setNewQuestion();
  }else{
    endQuiz();
  }
};

function endQuiz(){
  let index = Math.floor(Math.random() * petsQualitiesDB.length);
  resCon.innerHTML = `The pet which best suits you is <b><u> <a href="/pets/pet/${petsQualitiesDB[index].name}">${petsQualitiesDB[index].name}</a></u></b> `;

  quesCon.classList.add("hide");
  tryAgainBtn.classList.remove("hide")
}

startBtn.addEventListener("click", start);
tryAgainBtn.addEventListener("click", () => {
  tryAgainBtn.classList.add("hide");
  start();
  resCon.innerHTML = '';
  petsQualitiesDB = originalPetsQualitiesDb;
});
