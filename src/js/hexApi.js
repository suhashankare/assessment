var HEX = HEX || {};

HEX.AgileAssessments = function(){} || {};

$.extend(HEX.AgileAssessments.prototype,{
    dataSet : [],

    ajaxRequest : function(){
        return $.ajax({
            url: this.ajaxRequestUrl() || WEBAPIURL,
            type: 'GET',
            dataType: 'json'
        });
    },

    ajaxRequestUrl: function (){
        return arguments[0];
    },

    constructData : function () {
        console.log(this.dataSet);
        return this.dataSet.reduce(function (r, a) {
            r[a.Group] = r[a.Group] || [];
            r[a.Group].push(a);
            return r;
        }, Object.create(null));
    },

    promise:function(){
        $.when(this.ajaxRequest()).done(function (response) {
            console.log(response);
            this.dataSet = response;
        });
    },

    init:function(){
        this.promise();
        this.constructData();
        console.log(this.dataSet)
        this.setDefaultView();
        this.tabList();
    },

    setDefaultView : function(){
        return Object.keys(arguments[0])
    },

    tabList : function(){
      return Object.keys(arguments[0])
    }

});

