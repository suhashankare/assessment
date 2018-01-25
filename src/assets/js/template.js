var WEBASSESSMENTURL = "http://hexopus.hexaware.com/agileassessmentweb/assessment";
var WEBAPIURL = "https://hexopus.hexaware.com/agileassessmentapi/api/assessment/GetQuestionList";
var WEBACTONURL = "https://hexaware.com/agile-assessment/agileacton.html";
var ISLOCALSTORAGEALLOWED = false;



/*

$.ajax({
    url: WEBAPIURL,
    type: 'GET',
    dataType: 'json',
    success: function (data) {
        result(data);
        tabList = Object.keys(result(data));
        defaultActiveTab = tabList[0];
    },
    error: function () {

    }
});
*/

var agileAssessments = new HEX.AgileAssessments();

agileAssessments.init();

var tabList = agileAssessments.tabList();
var defaultActiveTab = agileAssessments.setDefaultView();
var result = agileAssessments.constructData();

var seDefaultTabActive = function(activeTabName){
    if(activeTabName === defaultActiveTab ){
        return 'active';
    }
};

_.templateSettings = {
    evaluate:    /\{\{(.+?)\}\}/g,
    interpolate: /\{\{=(.+?)\}\}/g,
    escape:      /\{\{-(.+?)\}\}/g
};

// Set the HTML template
var tabListCompileWithTemplate = _.template($('#tablist').html());
var tabDataCompileWithTemplate = _.template($('#tablistWrapper').html());

// render the template using hte data
$('.tabListConainer').html(tabListCompileWithTemplate(tabList));
$('.tabListDataContainer').html(tabDataCompileWithTemplate(result));
