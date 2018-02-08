var WEBASSESSMENTURL = "http://hexopus.hexaware.com/agileassessmentweb/assessment";
var WEBAPIURL = "https://hexopus.hexaware.com/agileassessmentapi/api/assessment/GetQuestionList";
var WEBACTONURL = "https://hexaware.com/agile-assessment/agileacton.html";
var ISLOCALSTORAGEALLOWED = false;

function stringtrim(s) {
    if (s != null) {
        //var s1 = $.trim(s);
        var s1 = s.trim();
        return s1;
        //return rtrim(ltrim(s));
    }
    else {
        return s;
    }
}

function validatelocalstorage() {
    var result = 1;
    if (typeof (Storage) !== "undefined") {
        result = 1;
    }
    else {
        result = 2; //local storage not working
    }
    if (result == 1) {
        try {
            localStorage.getItem("CurrentAgileAssessment");
        }
        catch (ex) {
            result = 3;
        }
    }
    return result;
}
function validatehtml5()
{
    var test_canvas = document.createElement("canvas") //try and create sample canvas element
    var canvascheck = (test_canvas.getContext) ? true : false //check if object supports getContext() method, a method of the canvas element
    return canvascheck
}

/*
$(document).ready(function () {
    var result = validatelocalstorage();
    ISLOCALSTORAGEALLOWED = false;
    if (result == 1) {
        var ishtml5support = validatehtml5();
        if(ishtml5support)
        {
            ISLOCALSTORAGEALLOWED = true;
        }
        else
        {
            $.dialog({
                "body": $('<div style="color:#ef3438; font-family: Segoe UI Semibold; line-height:20px; padding:10px;"/>').text("This browser does not support HTML5 features.").append($('<br/>')).append($('<span/>').text("Recommended to use the upgraded version of same browser or try using a different browser.")).append($('<br/>')).append($('<span/>').text("For support contact corporatemarketing@hexaware.com")),
                "title": null,
                "show": true,
                "modal": true,
                "closeX": false,
                "closeOnEscape": false,
                "closeOnMaskClick": false
            });
        }
    }
    else if (result == 2) {
        $.dialog({
            "body": $('<div style="color:#ef3438; font-family: Segoe UI Semibold; line-height:20px; padding:10px;"/>').text("This browser is not support local storage.").append($('<br/>')).append($('<span/>').text("Recommended to use the upgraded version of same browser or please enable local storage settings on the browser and try again.")).append($('<br/>')).append($('<span/>').text("For support contact corporatemarketing@hexaware.com")),
            "title": null,
            "show": true,
            "modal": true,
            "closeX": false,
            "closeOnEscape": false,
            "closeOnMaskClick": false
        });
    }
    else {
        $.dialog({
            "body": $('<div style="color:#ef3438; font-family: Segoe UI Semibold; line-height:20px; padding:10px;"/>').text("An error occurred while loading your browser local storage resource.").append($('<br/>')).append($('<span/>').text("Please check local storage settings on the browser and clean the complete browser cache and try again.")).append($('<br/>')).append($('<span/>').text("For support contact corporatemarketing@hexaware.com")),
            "title": null,
            "show": true,
            "modal": true,
            "closeX": false,
            "closeOnEscape": false,
            "closeOnMaskClick": false
        });
    }
});*/
