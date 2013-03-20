var zoomMode = false; 
var targetId = '';
var targetParentId = '';

window.setName = function other(str) { 
	var objs = str.split('/');	
	targetId=objs[2];
	targetParentId=objs[1];
	
} 

$(document).ready(function() {
	$(document).click(function () { 
		if(!zoomMode) { 
			window.parent.zoomTo(targetId,3);
			zoomMode=true;
			zoomScaled();
		} else { 
			window.parent.zoomTo(targetParentId,3);
			zoomMode=false;
			zoomNormal();
		} 
	});
});

