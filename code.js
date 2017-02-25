$(document).ready(function(){
    $("#click").click(function(){
        $("#demo").hide();
    });

    $("#dblClick").dblclick( function(){
        $("#demo").show();
    });

    $(document).keydown( function(){
        $("#demo").toggle();
    });

    $("#hover").hover( function(){
        $("#demo").fadeToggle();
    });

    $("#mouseDown").mousedown( function(){
        $("#demo").slideToggle();
    });

});

function changeColor(){
    $("#changeMe").css("color", "blue");
}

function changeBackgroundColor(){
    $("#changeMe").css("background-color", "lightblue");
}

function changeFontType(){
    $("#changeMe").css("font-family", "Arial");
}

function changefontStyle(){
    $("#changeMe").css("font-style", "italic");
}

function changeBorder(){
    $("#changeMe").css("border-style", "solid");
}
