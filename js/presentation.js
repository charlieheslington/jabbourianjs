function checkPresentation(file){
	console.log(file)
	$("#test").pptxToHtml({
		pptxFileUrl: "Sample_12.pptx",
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
			console.log(portion.innerText)
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