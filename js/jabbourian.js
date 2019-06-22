function checkTheText(){
  bannedWords = ['was', 'would', 'is', 'be', 'being', 'are', 'have', 'has', 'had' , 'can', 'do', 'could', 'should'];
  wrongFlag = false;
  console.log("Essay:")
  text = document.getElementById("essay").textContent;
  console.log(text);
  var words = text.split(' ');
  newText = "";
  for (word in words){
    console.log(words[word]);
    if (bannedWords.includes(words[word]) || ingWord(words[word]) || lyWord(words[word])){
      wrongFlag = true;
      newText = newText + "<div class='red'> " + words[word] + " </div>";
    }
    else{
      newText = newText + " " + words[word];
    }
  }
  document.getElementById("essay").innerHTML = newText;
  if (wrongFlag == true){
    document.getElementById("jabbour").src = "img/jabbour_sad.png";
  } else{
    document.getElementById("jabbour").src = "img/jabbour.png";
  }
}

function ingWord(word){
  if (word.substr(-3) == 'ing'){
    return true;
  }
  return false;
}
function lyWord(word){
  if (word.substr(-2) == 'ly'){
    return true;
  }
  return false;
}

function myFunction(){
  quotes = ['The Oxford English Dictionary - now with 90% less words', '\"I don\'t care if the essay dies, only if the essay lies\"', ]
}
