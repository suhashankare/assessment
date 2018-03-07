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
var url = 'http://localhost:3000/assets/assessMentData.json';
var totalCunt = null;


    $.ajax({
        url: url,
        type: 'GET',
        dataType: 'json',
        complete: function(){
            $(".loading").fadeOut();
        },
        success: function (data) {
            totalCunt  = data.length;
            groupedData = result(data);
            tabList = Object.keys(groupedData);
            defaultActiveTab = tabList[0];



            var tabDataCompileWithTemplate = null;
            var containerWrapper = $('.container-fluid');

            if(containerWrapper.data('custome-path') === 'sta'){
                // Set the HTML template
                var tabListCompileWithTemplate = _.template($('#tablist').html());
                tabDataCompileWithTemplate = _.template($('#tablistWrapperForAccordion').html());
                // render the template using hte data
                $('.tabListConainer').html(tabListCompileWithTemplate(tabList));
                $('.tabListDataContainer').html(tabDataCompileWithTemplate(groupedData));

            }

            if(containerWrapper.data('custome-path') === 'lta'){
                // Set the HTML template
                var compile = null;
                var getTemplate = null;
                for(var i = 0; tabList.length > i;i++){
                    var tabListName = tabList[i];
                    var mapData = {data:{name:tabList[i],dataList:groupedData[tabList[i]]}};
                    getTemplate = _.template($('#tablistWrapperlta').html());

                    $('#'+tabListName.toLowerCase().replace(/( & )| /g,'-')+'-container').html(getTemplate(mapData));
                }

            }
            tabList = $('.tab-pane').map(function(i, el) {return $(el).attr('id');}).get();
            selectionData = _.zipObject(tabList, _.zipWith(tabList, function(){return []}));

        },
        error: function () {

        }
    });

function getData(dataObj, targetedData){
    return dataObj[targetedData];
}