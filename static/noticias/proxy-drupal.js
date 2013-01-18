
doFilter = function (that) { 

 var title   = $(that).find('title').text();
 var link = $(that).find('description').text();
 $('#temp').html(link);
 var plainDesc = $('#temp').text();	
 var desc = plainDesc.split('slide')[0];
 var lines = desc.split('\n');
 desc = lines[0].split('Body:')[1]; 

 var descFull='';

 for(var k=1; k<lines.length;k++) { 
	descFull+=lines[k];
 }   

 var src='';

 if(plainDesc.indexOf('slide')>-1) { 
    var slides = plainDesc.split('slide')[1];
    src = 'http'+slides.split('http')[1];
 } 
	
 return {'title':title, 'subtitle':desc, 'body': descFull, 'src':src};

}

