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
			window.parent.parent.zoomTo(targetId,3);
			zoomMode=true;
		} else { 
			window.parent.parent.zoomTo(targetParentId,3);
			zoomMode=false;
		} 
	});
});

