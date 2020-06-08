function checkEssay(text){
    //HTML DEPENDANT CODE//
    var start = document.getElementById("start");
    start.style.display = "none";
    var end = document.getElementById("end");
    end.style.display = "block";
    //HTML DEPENDANT CODE //
    textArray = text.split(/([.,'\s!?])/g);
    lyArray = new Array();
    ingArray = new Array();
    appostArray = new Array();
    endPrepositionArray = new Array();
    sentanceStartArray = new Array();
    avoidSweepingArray = new Array();
    weakVerbArray = new Array();
    cwsArray = new Array();
    for(var i = 0; i < textArray.length; i++){
        if(textArray[i].match(/ly$/)){
            lyArray[i] = true;
        }
        else if(textArray[i].match(/ing$/)){
            ingArray[i] = true;
        }
        else if(textArray[i] == "'"){
            appostArray[i] = true;
        }
        else if(textArray[i] ==  "."){
            if(["about", "by", "during", "except", "from", "in", "into", "like", "minus", "near","of", "off", "on", "onto", "over", "past", "since", "than", "to", "under", "until", "upon", "with", "without"].indexOf(textArray[i-1]) > -1){
                endPrepositionArray[i-1] = true;
                console.log("Broken rule at word: " + textArray[i-1]);
            };
            if(["and", "but", "or"].indexOf(textArray[i+2]) > -1){
                sentanceStartArray[i+1] = true;
                console.log("Broken rule at word: " + textArray[i-1]);
            };
        }
        else if(["always", "never", "any", "every", "all", "none"].indexOf(textArray[i]) > -1){
            avoidSweepingArray[i] = true;
        }
        else if(["be", "have", "can", "do"].indexOf(textArray[i]) > -1){
            weakVerbArray[i] = true;
        }
        else if(["could", "would", "should"].indexOf(textArray[i]) > -1){
            cwsArray[i] = true;
        };
        
    }
    resultOutput = "";
    for(var i = 0; i < textArray.length; i++){
        if(lyArray[i] == true){
            resultOutput = resultOutput + "<span style=\"text-decoration: red wavy underline;\" onmouseover=\"showWarning(1)\">" + textArray[i] + "</span>";
        } 
        else if(ingArray[i] == true){
            resultOutput = resultOutput + "<span style=\"text-decoration: red wavy underline;\" onmouseover=\"showWarning(2)\">" + textArray[i] + "</span>";
        }
        else if(appostArray[i] == true){
            resultOutput = resultOutput + "<span style=\"text-decoration: red wavy underline;\" onmouseover=\"showWarning(3)\">" + textArray[i] + "</span>";
        }
        else if(endPrepositionArray[i] == true){
            resultOutput = resultOutput + "<span style=\"text-decoration: blue wavy underline;\" onmouseover=\"showWarning(4)\">" + textArray[i] + "</span>";
        }
        else if(sentanceStartArray[i] == true){
            resultOutput = resultOutput + "<span style=\"text-decoration: blue wavy underline;\" onmouseover=\"showWarning(5)\">" + textArray[i] + "</span>";
        }
        else if(avoidSweepingArray[i] == true){
            resultOutput = resultOutput + "<span style=\"text-decoration: blue wavy underline;\" onmouseover=\"showWarning(6)\">" + textArray[i] + "</span>";
        }
        else if(weakVerbArray[i] == true){
            resultOutput = resultOutput + "<span style=\"text-decoration: blue wavy underline;\" onmouseover=\"showWarning(7)\">" + textArray[i] + "</span>";
        }
        else if(cwsArray[i] == true){
            resultOutput = resultOutput + "<span style=\"text-decoration: blue wavy underline;\" onmouseover=\"showWarning(8)\">" + textArray[i] + "</span>";
        }
        else{
            resultOutput = resultOutput + textArray[i];
        }
    }
    //HTML DEPENDANT CODE//
    resultBox = document.getElementById("result")
    resultBox.innerHTML = resultOutput;
    //HTML DEPENDANT CODE//


    //console.log("out: " + textArray[0] + " -- is ly: " + lyArray[0]);
    //console.log("out: " + textArray[2] + " -- is ing: " + ingArray[2]);
}

function showWarning(error){
    warning = document.getElementById("violation");
    switch (error){
        case 1:
            warning.innerHTML = "Avoid adjectives that end with ly. For that matter, avoid adjectives altogether";
            break;
        case 2:
            warning.innerHTML = "Avoid use of -ing words";
            break;
        case 3:
            warning.innerHTML = "Avoid using quotation marks. Use your own words to cite a reference";
            break;
        case 4:
            warning.innerHTML = "Do not end a sentence with a preposition";
            break;
        case 5:
            warning.innerHTML = "Do not start a sentence with the words 'and', 'but' or 'because'";
            break;
        case 6:
            warning.innerHTML = "Avoid statements with sweeping categorical adverbs like 'always', 'never', 'any', 'every', 'all' and 'none'.They may undermine the credibility of an entire report if a reader can disprove one of them";
            break;
        case 7:
            warning.innerHTML = "Avoid weak verbs 'be', 'have', 'can, or 'do'. Use verbs that describestate and action";
            break;
        case 8:
            warning.innerHTML = "Do not use 'could', 'would', or 'should' .Use 'must' or 'shall' to describe a requirement";
            break;
            
    }
    warning.style.display = "block";
}


