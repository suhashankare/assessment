var WEBASSESSMENTURL = "http://hexopus.hexaware.com/agileassessmentweb/assessment";
var WEBAPIURL = "https://hexopus.hexaware.com/agileassessmentapi/api/assessment/GetQuestionList";
var WEBACTONURL = "https://hexaware.com/agile-assessment/agileacton.html";
var ISLOCALSTORAGEALLOWED = false;


var tabList;
var defaultActiveTab;
var result = function(data){
    return data.reduce(function (r, a) {
        r[a.Group] = r[a.Group] || [];
        r[a.Group].push(a);
        return r;
    }, Object.create(null));
};
var groupedData;

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

    $.ajax({
    url: WEBAPIURL,
    type: 'GET',
    dataType: 'json',
    complete: function(){
        $(".loading").fadeOut();
    },
    success: function (data) {
        groupedData = result(data);
        tabList = Object.keys(groupedData);
        defaultActiveTab = tabList[0];

        // Set the HTML template
        var tabListCompileWithTemplate = _.template($('#tablist').html());
        var tabDataCompileWithTemplate = _.template($('#tablistWrapper').html());

        // render the template using hte data
        $('.tabListConainer').html(tabListCompileWithTemplate(tabList));
        $('.tabListDataContainer').html(tabDataCompileWithTemplate(groupedData));
    },
    error: function () {

    }
});





