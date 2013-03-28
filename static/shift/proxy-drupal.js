
var backupList = ["http://172.25.59.21/sites/default/files/midia-02.png","http://172.25.59.21/sites/default/files/midia-03.png"];

doFilter = function (that) { 

 var link = $(that).find('description').text();
 $('#temp').html(link);

 var titleAll   = $(that).find('title').text();
 var title = titleAll.split(' ')[0]; 

 var docDate=new Date();
 var docDateString = title.split("/");
 var docDay = docDateString[0];
 var docMonth = docDateString[1];
 var docYear = docDateString[2];
 docDate.setFullYear(parseInt(docYear),parseInt(docMonth-1),parseInt(docDay));
 var today = new Date();

 var src = '';

 var matchClass = $("#temp").text();

 if (docDate>=today) {
    src = ($('#temp img').attr('src'));
 } else {
    var rPick = parseInt(Math.random()); 
    src = backupList[rPick]; //'http://172.25.59.21/sites/default/files/midia-03.png';

 } 
 return {'title':title, 'subtitle': matchClass, 'body': matchClass, 'src':src};

}

