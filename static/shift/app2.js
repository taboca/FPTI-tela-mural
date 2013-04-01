
    var strId = ["midia","onibus","mapa","agenda"];

    function setThumb(expression) {
        $('.inner').removeClass('highlight');
        var choice = 'midia';
        for(var l in strId) { 
            var item = strId[l];
            if(expression.indexOf(item)>-1) { 
                choice = item;
            } 
        } 
        $('#'+choice).addClass('highlight');
    } 


