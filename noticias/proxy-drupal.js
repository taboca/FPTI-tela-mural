
doFilter = function () { 

 var title   = $(this).find('title').text();
 var link = $(this).find('description').text();
 $('#temp').html(link);
 var plainDesc = $('#temp').text();	
 var desc = plainDesc.split('slide')[0];
 var lines = desc.split('\n');
 desc = lines[0].split('Body:')[1]; 
 var descFull='';
 for(var k=1; k<lines.length;k++) { 
	descFull+=lines[k];
 }   
 var slides = plainDesc.split('slide')[1];
 var src = 'http'+slides.split('http')[1];
	
 return {'title':title, 'desc': descFull, 'src':src};

}

