doFilter = function ()  { 

 var title = $(this).find('title').text();
 var image = $(this).find('img').attr('src');
 var link = $(this).find('description').text();
 $('#temp').html(link);
 var plainText = $('#temp').text();
 var src = 'http://fotos.mixar.com.br'+image;
 return {'title':title, 'description': plainText, 'src':src};

} 
