function checkPresentation(file){
	console.log(file)
	$("#test").pptxToHtml({
	pptxFileUrl: "Sample_12.pptx",

});
	$("#test").ready(function(){
		console.log("here")
	});
	waitForElement("slide",function(){
    	console.log("done");
		console.log(document.getElementById("test").innerHtml);
		console.log($("#test"));
		var slides;
		slides = document.getElementById("test")
		slides = slides.getElementsByClassName("slides")
		console.log(slides)
	});


}

function waitForElement(elementId, callBack){
  window.setTimeout(function(){
    var element = document.getElementsByClassName(elementId);
    if(element){
      callBack(elementId, element);
    }else{
      waitForElement(elementId, callBack);
    }
  },500)
}