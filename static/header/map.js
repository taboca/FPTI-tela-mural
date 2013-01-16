/* Grids On The Fly */

$(document).ready(function() {

   register("/main/topright", "clock", "../clock/index.html", iframeTemplate);
   register("/main/topright2", "date", "../clock/date.html", iframeTemplate);
   compile();   

});


