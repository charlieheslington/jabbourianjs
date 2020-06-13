function checkText(text){
    //HTML DEPENDANT CODE//
    var start = document.getElementById("start");
    start.style.display = "none";
    var end = document.getElementById("end");
    end.style.display = "block";
    //HTML DEPENDANT CODE //
    var errors = 0;
    jjs = jabbourianJS(text);
    result = jjs[0];
    score = jjs[1];
    //HTML DEPENDANT CODE//
    resultBox = document.getElementById("result")
    resultBox.innerHTML = result;
    scoreBox = document.getElementById("score");
    scoreBox.innerHTML = "This has a JabbourScore of: " + score + "/20";
    //HTML DEPENDANT CODE//
}

function checkDOCX(file){
    if(file == null){
        showWarning(502);
        return -1;   
    }
    var extension = file.name.split('.').pop().toLowerCase();
    htmlRender = "";
    if (extension !== "docx"){
        showWarning(501);
        return -1;
    } else{
        //HTML DEPENDANT CODE//
        var start = document.getElementById("start");
        start.style.display = "none";
        var end = document.getElementById("end");
        end.style.display = "block";
        //HTML DEPENDANT CODE //
        var reader = new FileReader();
        reader.onload = function(e) {
            var arrayBuffer = reader.result;
            var parsedFile = mammoth.convertToHtml({arrayBuffer: reader.result}).then(
                function (htmlResult) {
                    var parser = new DOMParser();
                    htmlRender = parser.parseFromString(htmlResult.value,"text/html");
                }.bind(this)).then(function(){analyseDOCX();});
        }.bind(this);
        reader.readAsArrayBuffer(file);
    }
}
function analyseDOCX(){
    console.log(htmlRender);
    //Essay Structure Checking //
    structureErrors = 0;
    var headings = htmlRender.getElementsByTagName("h1");
    var headingArray = new Array();
    for (var i = 0; i < headings.length; i++){
        if (headings[i].innerText.match(/executive summary/i)){ //headingArray[0]
            console.log("Found Executive Summary");
            headingArray[0] = true;
        }
        else if (headings[i].innerText.match(/problem statement/i)){ //headingArray[1]
            console.log("Found Problem Statement");
            headingArray[1] = true;
        }
        else if (headings[i].innerText.match(/background/i)){ //headingArray[2]
            console.log("Found Background");
            headingArray[2] = true;
        }
        else if (headings[i].innerText.match(/assumptions/i)){ //headingArray[3]
            console.log("Found Assumptions");
            headingArray[3] = true;
        }
        else if (headings[i].innerText.match(/techniques and tools/i) || headings[i].innerText.match(/tools and techniques/i)){ //headingArray[4]
            console.log("Found Techniques and Tools");
            headingArray[4] = true;
        }
        else if (headings[i].innerText.match(/problem solution/i)){ //headingArray[5]
            console.log("Found Problem Solution");
            headingArray[5] = true;
        }
        else if (headings[i].innerText.match(/risk assessment/i)){ //headingArray[6]
            console.log("Found Risk Assessment");
            headingArray[6] = true;
        }
        else if (headings[i].innerText.match(/references/i)){ //headingArray[7]
            console.log("Found References");
            headingArray[7] = true;
        }
    }
    //Essay Structure Checker //
    //Jabbourian Checker //
    var paragraphs = htmlRender.getElementsByTagName("p");
    //console.log(htmlRender.html.body);
    var el = document.createElement('html');
    bodyHTML = htmlRender.getElementsByTagName("body")[0];
    documentElements = bodyHTML.children;
    var outputResult = ""
    var outputErrors = 0;
    var paragraphsCount = 0;
    var firstHeading = false;
    /*for (var i = 0; i < paragraphs.length; i++){
        var jjs = jabbourianJS(paragraphs[i].innerText);
        outputResult = outputResult + jjs[0] + "<br />";
        outputErrors = outputErrors + jjs[1];
    }*/

    //Scores the tuple of JB score and 
    var newScoreArr = 0;
    var totalLength = 0.0;
    scoreLengthArray = new Array();
    for (var i = 0; i < documentElements.length; i++){
        if((documentElements[i].nodeName != "H1")){
            var jjs = jabbourianJS(documentElements[i].innerText);
            totalLength += jjs[2]
            scoreLengthArray[i] = [jjs[0], jjs[2]]
            outputResult = outputResult + jjs[0] + "<br />";
            if (firstHeading == true){
                outputErrors = outputErrors + jjs[1];
                paragraphsCount++;
            }
        } else{
            outputResult = outputResult + "<br/>" + documentElements[i].innerText + "<br/><hr/>";
            firstHeading = true;
        }
    }
    for(let y = 0; y < scoreLengthArray.length; y++){
        newScoreArr += scoreLengthArray[0] * (scoreLengthArray[1]/totalLength)
    }
    outputErrors = outputErrors / paragraphsCount;

    //Testing Code Start//
    console.log("New Score outputResult")
    console.log(newScoreArr)

    console.log("Old Score output")
    console.log(outputErrors)
    //Testing Code End//

    //Jabbourian Checker //
    //HTML DEPENDANT CODE//

    resultBox = document.getElementById("result")
    resultBox.innerHTML = outputResult;
    scoreBox = document.getElementById("score");
    scoreBox.innerHTML = "This Document's JabbourScore: " + Math.round(outputErrors) + "/20";
    structureBox = document.getElementById("structureBox");
    if (headingArray[0] != true){
        structureBox.innerHTML = structureBox.innerHTML + "<div class= \"alert alert-danger\">This essay is missing an Executive Summary section</div>"
    }
    if (headingArray[1] != true){
        structureBox.innerHTML = structureBox.innerHTML + "<div class= \"alert alert-danger\">This essay is missing a Problem Statment section</div>"
    }
    if (headingArray[2] != true){
        structureBox.innerHTML = structureBox.innerHTML + "<div class= \"alert alert-danger\">This essay is missing a Background section</div>"
    }
    if (headingArray[3] != true){
        structureBox.innerHTML = structureBox.innerHTML + "<div class= \"alert alert-danger\">This essay is missing an Assumptions section</div>"
    }
    if (headingArray[4] != true){
        structureBox.innerHTML = structureBox.innerHTML + "<div class= \"alert alert-danger\">This essay is missing a Techniques and Tools section</div>"
    }
    if (headingArray[5] != true){
        structureBox.innerHTML = structureBox.innerHTML + "<div class= \"alert alert-danger\">This essay is missing a Problem Solution section</div>"
    }
    if (headingArray[6] != true){
        structureBox.innerHTML = structureBox.innerHTML + "<div class= \"alert alert-danger\">This essay is missing a Risk Assessment section</div>"
    }
    if (headingArray[7] != true){
        structureBox.innerHTML = structureBox.innerHTML + "<div class= \"alert alert-danger\">This essay is missing a References section</div>"
    }
    //HTML DEPENDANT CODE//


}

function jabbourianJS(text){
    textArray = text.split(/([.,"'\s!?])/g);
    lyArray = new Array();
    ingArray = new Array();
    appostArray = new Array();
    endPrepositionArray = new Array();
    sentanceStartArray = new Array();
    avoidSweepingArray = new Array();
    weakVerbArray = new Array();
    cwsArray = new Array();
    noArray = new Array();
    quantArray = new Array();
    /*Errors for each infraction*/
    errors = 0;
    lyErrors = 0;
    ingErrors = 0;
    appostErrors = 0;
    prepositionErrors= 0;
    sentStartError = 0;
    sweepingError = 0;
    weakVerbError = 0;
    cwsError = 0;
    noError = 0;
    quantError = 0;

    for(var i = 0; i < textArray.length; i++){
        if(textArray[i].match(/ly$/)){
            lyArray[i] = true;
            lyErrors++;
            errors++;
        }
        else if(textArray[i].match(/ing$/)){
            ingArray[i] = true;
            ingErrors++;
            errors++;
        }
        else if(textArray[i] == "'"){
            appostArray[i] = true;
            appostErrors++;
            errors++;
        }
        else if(textArray[i] ==  "."){
            if(["about", "by", "during", "except", "from", "in", "into", "like", "minus", "near","of", "off", "on", "onto", "over", "past", "since", "than", "to", "under", "until", "upon", "with", "without"].indexOf(textArray[i-1]) > -1){
                endPrepositionArray[i-1] = true;
                prepositionErrors++;
                errors++;
            };
            if(["and", "but", "or"].indexOf(textArray[i+2]) > -1){
                sentanceStartArray[i+1] = true;
                sentStartError++;
                errors++;
            };
        }
        else if(["always", "never", "any", "every", "all", "none"].indexOf(textArray[i]) > -1){
            avoidSweepingArray[i] = true;
            sweepingError++;
            errors++;
        }
        else if(["be", "have", "can", "do"].indexOf(textArray[i]) > -1){
            weakVerbArray[i] = true;
            weakVerbError++;
            errors++;
        }
        else if(["could", "would", "should"].indexOf(textArray[i]) > -1){
            cwsArray[i] = true;
            cwsError++;
            errors++;
        }
        else if(["no"].indexOf(textArray[i]) > -1){
            noArray[i] = true;
            noError++;
            errors++;
        }
        else if(["few", "some", "many", "most"].indexOf(textArray[i]) > -1){
            quantArray[i] = true;
            quantError++;
            errors++;
        }   
    }
    calculateJabScore(lyErrors, ingErrors, appostErrors, prepositionErrors, sentStartError, sweepingError, weakVerbError, cwsError, noError, quantError, length);

    if(errors == 0){
        jabbourScore = 20;
    } else{
        jabbourScore = Math.round(((1-((errors*25) / (textArray.length/2))) * 100)/5);
    }
    if (jabbourScore < 0){
        jabbourScore = 0;
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
        else if(noArray[i] == true){
            resultOutput = resultOutput + "<span style=\"text-decoration: green wavy underline;\" onmouseover=\"showWarning(9)\">" + textArray[i] + "</span>";
        }
        else if(quantArray[i] == true){
            resultOutput = resultOutput + "<span style=\"text-decoration: green wavy underline;\" onmouseover=\"showWarning(10)\">" + textArray[i] + "</span>";
        }
        else if(textArray[i].match(/\n$/)){
            resultOutput = resultOutput + "<br/>";
        }
        else{
            resultOutput = resultOutput + textArray[i];
        }
    }
    return [resultOutput, jabbourScore, textArray.length];
}

function calculateJabScore(lyErrors, ingErrors, appostErrors, prepositionErrors, sentStartError, sweepingError, weakVerbError, cwsError, noError, quantError, length){
    /*
        Calculate the JS score using more percise method:
            Allocate weights to each of the scores
                
                ly- 17
                ing- 17
                appost- .5 
                prep- .5
                sentStart- .5
                sweeping- 1.5
                weak verb- 2.0
                cws error-.5
                no Error-.5
                quantError- 1.0

    */

    //These are the weights of the errors. 
    lyWeight = 1.5;
    ingWeight = 1.5;
    appostWeight = .5;
    prepWeight = .5;
    sentStartWeight = .5;
    sweepingWeight = 1.5;
    weakVerbWeight = 2.0
    cwsWeight = .5;
    noWeight = .5;
    quantWeight= 1.0;

    //Error Cap- Max an error can deduct dependent on lenght. 
    //You calculate avg number of sentences and then deduct how much 
    avgWordsInSentence = 20.0;

    weakVerbError =  Math.ceiling(length/avgWordsInSentence); //Math.round(length/avgWordsInSentence) is expected number of sentences

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
        case 9:
            warning.innerHTML = "Note that 'no' equals zero, and that zero is singular. 'No computer left behind' is correct. 'No computers left behind' is incorrect";
            break;
        case 10:
            warning.innerHTML = "Use quantitative adverbs like 'few', 'some', 'many',and 'most' with care. They refer to plurality any way you count them. 'Most' equals at least 50 percent";
            break;
        case 501:
            warning.innerHTML = "Jabbourian.JS can only parse \".docx\" files. Please convert to this format or use the template!";
            break;
        case 502:
            warning.innerHTML = "You need to upload a file first!";
            break;
            
    }
    warning.style.display = "block";
}


