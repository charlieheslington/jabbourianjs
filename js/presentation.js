function checkPresentation(file){
	console.log(file)
	$("#test").pptxToHtml({
		pptxFileUrl: "Week_7_Presentation.pptx",
	});
	waitForElement("slide",function(){
    	console.log("done");
		console.log(document.getElementById("test").innerHtml);
		console.log($("#test"));
		let slides;
		elementToEdit = document.getElementById("test");
		slides = elementToEdit.getElementsByClassName("slide");
		modifySlides(slides);
	});

}

function modifySlides(toMod){
	let i;
	for (i = 0; i < toMod.length; i++){
		let slide;
		slide = $(toMod[i]).find("span");
		let y;
		console.log(i) 
		for(y = 0; y < slide.length; y++){
			portion = slide[y];
			if (portion.innerText.trim() != "" && portion.innerText.trim() != "●" ) {
				console.log(portion.innerText);
				var jsResults = jabbourianJS(portion.innerText);
				//$(slide[y]) = jsResults[0]
				console.log(jsResults[1])
			}
		}
	}
}

function waitForElement(elementId, callBack){
  window.setTimeout(function(){
    let element = document.getElementsByClassName(elementId);
    if(element){
      callBack(elementId, element);
    }else{
      waitForElement(elementId, callBack);
    }
  },500)
}