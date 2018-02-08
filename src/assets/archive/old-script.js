/*LOCAL VARIABLES*/
        var QuestionList = [];
        var AnswerList = [];
        var CurrentQuestionIndex = 1;
        var CurrentActiveTab = "Organization Culture";

        /*EVENTS*/
        $(document).ready(function () {
            //var a = $(window).width();
            //var a1 = $(document).width();
            //alert(a + 'x' + a1);
            clearQuestionAnswerStyle();
            clearTabStyle();
            clearSubmitButtonStyle();

            if (ISLOCALSTORAGEALLOWED) {
                var resultdata = localStorage.getItem("CurrentAgileAssessment");
                if (resultdata != null) {
                    var arrdata = resultdata.split('|');
                    if (arrdata == null || arrdata.length < 4) {
                        location.href = "Index.html";
                    }
                    try {
                        var resultacton = localStorage.getItem("AgileAssessmentActOn");
                        if (resultacton != null) {
                            var url = WEBACTONURL + "?";
                            url = url + "n=" + arrdata[1];
                            url = url + "&c=" + arrdata[0];
                            url = url + "&e=" + arrdata[2];
                            url = url + "&p=" + arrdata[3];
                            $("#idiframemarket").attr("src", url);
                            localStorage.removeItem("AgileAssessmentActOn");
                        }
                    }
                    catch (err) {
                    }
                    //Load questions
                    GetQuestions();
                    //Modal box to show questions are loading. This will be closed when webapi call is success
                    /*$.dialog({
                        "body": $('<div/>').text("Please wait as assessment questions are being loaded...").append($('<br/>')).append($('<br/>')).append($('<img/>').attr('src', 'images/spiffygif_30x30.gif').attr('style', 'display:block; padding-left:45%;')),
                        "title": null,
                        "show": true,
                        "modal": true,
                        "closeX": false,
                        "closeOnEscape": false,
                        "closeOnMaskClick": false
                    });*/
                }
                else {
                    location.href = "Index.html";
                }
            }

        });

        $("li[data-type='clicktab']").click(function () {
            //addGroupNametoTabDataAttribute();
            var currenttabgroup = $(this).data("group");
            $(this).addClass('active').siblings().removeClass('active');
            switch ($(this).index()) {
                case 0:
                    $(".tabtriangledown").css("left", "8.5%");
                    break;
                case 1:
                    $(".tabtriangledown").css("left", "28.5%");
                    break;
                case 2:
                    $(".tabtriangledown").css("left", "48.5%");
                    break;
                case 3:
                    $(".tabtriangledown").css("left", "68.5%");
                    break;
                case 4:
                    $(".tabtriangledown").css("left", "88.5%");
                    break;
                default:
                    $(".tabtriangledown").css("left", "8.5% ");
            }
            //This will be used for tab completion status styling.
            var iprevioustabindex = CurrentQuestionIndex;
            //Only for Tab click
            updateCurrentQuestionIndexOnTabClick(currenttabgroup);
            UpdateQuestionText();
            //updateQuestionCountText();

            applyQuestionAnswerStyle();
            applyTabActiveStyle();

            var currenttabgroup = getTabGroupNamebyCurrentQuestionIndex();
            var previoustabgroup = getTabGroupNamebyQuestionIndex(iprevioustabindex);
            if (currenttabgroup != previoustabgroup) {
                applyPreviousTabCompletionStatusStyle(iprevioustabindex);
                createQuestionButtonLinksforActiveTab();
                //applyQuestionButtonLinkStyleOnTabClick();
                //updateTabVisitedByTabGroup(currenttabgroup);
            }
            //applyQuestionButtonLinkStyleOnTabClick();
            applyQuestionButtonLinkStyle();

        });

        $("span[data-type='clickprev']").click(function () {
            if (parseInt(CurrentQuestionIndex) > 1) {
                //This will be used for tab completion status styling.
                var iprevioustabindex = CurrentQuestionIndex;

                CurrentQuestionIndex = parseInt(CurrentQuestionIndex) - 1;
                UpdateQuestionText();
                //updateQuestionCountText();
                applyQuestionAnswerStyle();
                applyTabActiveStyle();

                var currenttabgroup = getTabGroupNamebyCurrentQuestionIndex();
                var previoustabgroup = getTabGroupNamebyQuestionIndex(iprevioustabindex);
                if (currenttabgroup != previoustabgroup) {
                    applyPreviousTabCompletionStatusStyle(iprevioustabindex);
                    createQuestionButtonLinksforActiveTab();
                    //updateTabVisitedByTabGroup(currenttabgroup);
                }
                applyQuestionButtonLinkStyle();
            }
        });

        $("span[data-type='clicknext']").click(function () {
            var questioncount = QuestionList.length;
            if (parseInt(CurrentQuestionIndex) < questioncount) {
                //This will be used for tab completion status styling.
                var iprevioustabindex = CurrentQuestionIndex;

                CurrentQuestionIndex = parseInt(CurrentQuestionIndex) + 1;
                UpdateQuestionText();
                //updateQuestionCountText();
                applyQuestionAnswerStyle();
                applyTabActiveStyle();
                var currenttabgroup = getTabGroupNamebyCurrentQuestionIndex();
                var previoustabgroup = getTabGroupNamebyQuestionIndex(iprevioustabindex);
                if (currenttabgroup != previoustabgroup) {
                    applyPreviousTabCompletionStatusStyle(iprevioustabindex);
                    createQuestionButtonLinksforActiveTab();
                    //updateTabVisitedByTabGroup(currenttabgroup);
                }
                applyQuestionButtonLinkStyle();
                //applyQuestionButtonStyleByQuestionIndex(iprevioustabindex);
            }

        });

        $("li[data-type='clickanswer']").click(function () {
            var selectedanswer = $(this).data("value");
            updateAnswertoAnswerCollection(selectedanswer);
            applyQuestionAnswerStyle();
            applyQuestionButtonStyleOnAnswerClick();
            // applyQuestionButtonStyleByQuestionIndex(CurrentQuestionIndex);
            updateProgressStatus();
            applyTabCompletionStatusOnAnswerclick();
            updateSubmitButtonStyle();
            //Offline storage call
            composeOfflinestorage();
        });

        //$("span[data-type='clickinstruction']").click(function () {
        //    var data = "";

        //});


        /*VALIDATION*/
        function validateAssessment() {
            localStorage.setItem("CurrentAgileAssessmentSubmitClicked", "1");
            var pending = getPendingQuestions();
            if (parseInt(pending) > 0) {
                var data = "You missed " + pending + " questions. Please complete the assessment.";

                /*$.dialog({
                    "body": data,
                    "title": null,
                    "show": true,
                    "modal": true,
                    "closeX": false,
                    "closeOnEscape": false,
                    "closeOnMaskClick": false,
                    "footer": "<button class=\"dialog-button\" data-dialog-action=\"hide\" onClick=\"validateAssessmentClose();\">Close</button>"
                });*/
                return false;
                //return true;
            }
            else {
                /*$.dialog({
                    "body": $('<div/>').text("Please wait as your assessment is getting processed...").append($('<br/>')).append($('<br/>')).append($('<img/>').attr('src', 'images/spiffygif_30x30.gif').attr('style', 'display:block; padding-left:45%;')),
                    "title": null,
                    "show": true,
                    "modal": true,
                    "closeX": false,
                    "closeOnEscape": false,
                    "closeOnMaskClick": false
                });*/
                return true;
            }
        }

        function validateAssessmentClose() {
            localStorage.removeItem("CurrentAgileAssessmentSubmitClicked");
        }

        /*UPDATES FUNCTIONS*/
        function UpdateQuestionText() {
            var temptext;
            var iquestionindex;
            $.each(QuestionList, function (key, value) {
                if (value.index == CurrentQuestionIndex) {
                    temptext = value.text;
                }
            });
            //below same as updateQuestionCountText()
            var currenttabgroup = getTabGroupNamebyCurrentQuestionIndex();
            var count = 0;
            var questiontabindex = 0;
            if (currenttabgroup != null) {
                $.each(QuestionList, function (key, value) {
                    if (value.group == currenttabgroup) {
                        count++;
                        if (parseInt(value.index) <= parseInt(CurrentQuestionIndex)) {
                            questiontabindex++;
                        }
                    }
                });
            }
            var questiondisplay = questiontabindex + ") " + temptext;
            $("#idquestiontext").text(questiondisplay);
            $("#idcurrentquestiontext").text(questiontabindex + "/" + count);

            if(CurrentQuestionIndex=="1")
            {
                $("span[data-type='clickprev']").css("visibility","hidden");
                $("span[data-type='clicknext']").css("visibility","visible");
            }
            else if (parseInt(CurrentQuestionIndex) == QuestionList.length)
            {
                $("span[data-type='clickprev']").css("visibility", "visible");
                $("span[data-type='clicknext']").css("visibility", "hidden");
            }
            else
            {
                $("span[data-type='clickprev']").css("visibility", "visible");
                $("span[data-type='clicknext']").css("visibility", "visible");
            }

            $("#idquestiontabtitle").text(currenttabgroup);
        }
        //function updateQuestionCountText() {
            //var currenttabgroup = getTabGroupNamebyCurrentQuestionIndex();
            //var count = 0;
            //var questiontabindex = 0;
            //if (currenttabgroup != null) {
            //    $.each(QuestionList, function (key, value) {
            //        if (value.group == currenttabgroup) {
            //            count++;
            //            if (parseInt(value.index) <= parseInt(CurrentQuestionIndex)) {
            //                questiontabindex++;
            //            }
            //        }
            //    });
            //}
            //$("#idcurrentquestiontext").text(questiontabindex + "/" + count);
        //}
        function updateProgressStatus() {
            if (AnswerList != null && AnswerList.length > 0) {
                var questioncount;
                if (QuestionList != null && QuestionList.length > 0) {
                    questioncount = QuestionList.length;
                }
                else {
                    questioncount = AnswerList.length;
                }
                var answered = 0;
                $.each(AnswerList, function (key, data) {
                    if (data.value != null && data.value.length > 0) {
                        answered++;
                    }
                });
                var progressbarvalue = Math.round((parseInt(answered) / parseInt(questioncount)) * 100);
                $("#idprogressbar").text(progressbarvalue + "%");
                $("#idprogressmeter").animate({ 'value': progressbarvalue }, 500);
            }
        }
        function updateCurrentQuestionIndexOnTabClick(currenttabgroup) {
            var questionindex = 0;
            if (currenttabgroup != null) {
                $.each(QuestionList, function (key, value) {
                    if (value.group == currenttabgroup && questionindex == 0) {
                        questionindex = value.index;
                    }
                });
                CurrentQuestionIndex = questionindex;
            }
        }
        //Update Answer to collection: on answer click
        function updateAnswertoAnswerCollection(value) {
            var i = 0;
            for (i = 0; i < AnswerList.length; i++) {
                if (AnswerList[i].index == CurrentQuestionIndex) {
                    AnswerList[i].value = value;
                    break;
                }
            }
        }


        /*ONLOAD*/
        function GetQuestions() {
            //jQuery.support.cors = true;
            $.ajax({
                url: WEBAPIURL,
                type: 'GET',
                dataType: 'json',
                success: function (data) {
                    PushtoQuestionCollection(data);
                    addGroupNametoTabDataAttribute();
                    //Retain values from offline storage
                    retainOfflineAnswers();
                    createQuestionButtonLinksforActiveTab();
                    retainStyle();
                   // $('.dialog-container').dialog('hide');
                },
                error: function () {
                    //alert("Error loading question");
                   // $('.dialog-container').dialog('hide');
                  /*  $.dialog({
                        "body": $('<div/>').text('The server encountered an internal error and was unable to process your  request.').append($('<br/>')).append($('<span>Please refresh the screen and try again.</span>')).append($('<br/>')).append($('<span>If the problem persists please contact corporatemarketing@hexaware.com.</span>')),
                        "title": null,
                        "show": true,
                        "modal": true,
                        "closeX": false,
                        "closeOnEscape": false,
                        "closeOnMaskClick": false
                    });*/
                }
            });
        }
        function PushtoQuestionCollection(data) {
            var qlist = [];
            var alist = [];
            if (data != null) {
                var ilength = data.length;
                if (ilength >= 0) {
                    $.each(data, function (key, value) {
                        var obj = new questionobj(value.Index, value.Key, value.Group, value.Text);
                        qlist.push(obj);
                        var objans = new answerobj(value.Index, value.Key, "");
                        alist.push(objans);
                    });
                }
            }
            QuestionList = qlist;
            AnswerList = alist;
        }
        function questionobj(index, key, group, text) {
            this.index = index;
            this.key = key;
            this.group = group;
            this.text = text;
        }
        function answerobj(index, key, value) {
            this.index = index;
            this.key = key;
            this.value = value;
        }
        function addGroupNametoTabDataAttribute() {
            if (QuestionList != null) {
                var tabnames = "";
                var tabgroupsarr = [];
                $.each(QuestionList, function (i, value) {
                    if (value.group != null) {
                        if (i == 0) {
                            tabgroupsarr.push(value.group);
                            tabnames = value.group;
                        }
                        else {
                            if (tabnames.search(value.group) == -1) {
                                tabgroupsarr.push(value.group);
                                tabnames = tabnames + value.group;
                            }
                        }
                    }
                });
                if (tabgroupsarr.length == 5) {
                    $("#liOrganize1").data("group", tabgroupsarr[0]);
                    $("#liPeople1").data("group", tabgroupsarr[1]);
                    $("#liAgile1").data("group", tabgroupsarr[2]);
                    $("#liSoft1").data("group", tabgroupsarr[3]);
                    $("#liTools1").data("group", tabgroupsarr[4]);
                }

            }
        }

        /*GET FUNCTIONS*/
        //Used to apply styles on question toggle
        function getAnswerbyCurrentIndex() {
            var result;
            var i = 0;
            for (i = 0; i < AnswerList.length; i++) {
                if (AnswerList[i].index == CurrentQuestionIndex) {
                    result = AnswerList[i].value;
                    break;
                }
            }
            return result;
        }
        //Tab related
        function getPreviousTabCompletionStatus(previousquestionindex) {
            var Iscomplete = false;
            if (parseInt(previousquestionindex) > 0) {
                var previoustabgroup = "";
                $.each(QuestionList, function (key, value) {
                    if (value.index == previousquestionindex) {
                        previoustabgroup = value.group;
                    }
                });
                var istart = 0;
                var icount = 0;
                if (previoustabgroup != "") {
                    var istart = getTabStartIndex(previoustabgroup);
                    var iend = getTabEndIndex(previoustabgroup);
                    if (istart > 0 && iend > 0) {
                        var i = 0;
                        //var iend = parseInt(istart) + parseInt(icount);
                        Iscomplete = true;
                        for (i = (parseInt(istart) - 1) ; i < (parseInt(iend)) ; i++) {
                            if (AnswerList[i].value == null || AnswerList[i].value == "") {
                                Iscomplete = false;
                            }
                        }
                    }
                }
            }
            return Iscomplete;
        }
        function getTabGroupNamebyCurrentQuestionIndex() {
            var currenttabgroup = "";
            if (CurrentQuestionIndex > 0) {
                $.each(QuestionList, function (key, value) {
                    if (value.index == CurrentQuestionIndex) {
                        currenttabgroup = value.group;
                    }
                });
            }
            return currenttabgroup;
        }
        function getTabGroupNamebyQuestionIndex(questionindex) {
            var currenttabgroup = "";
            if (questionindex != null && parseInt(questionindex) > 0) {
                if (CurrentQuestionIndex > 0) {
                    $.each(QuestionList, function (key, value) {
                        if (value.index == questionindex) {
                            currenttabgroup = value.group;
                        }
                    });
                }
            }
            return currenttabgroup;
        }
        function getTabQuestionCountByTabName(currenttabgroup) {
            var count = 0;
            if (currenttabgroup != null) {
                $.each(QuestionList, function (key, value) {
                    if (value.group == currenttabgroup) {
                        count++;
                    }
                });
            }
            return count;
        }
        function getTabStartIndex(currenttabgroup) {
            var istart = 0;
            var icount = 0;
            if (currenttabgroup != "") {
                $.each(QuestionList, function (key, value) {
                    if (value.group == currenttabgroup) {
                        //Set start index only once.
                        if (istart == 0) {
                            istart = value.index;
                        }
                    }
                });
            }
            return istart;
        }
        function getTabEndIndex(currenttabgroup) {
            var iend = 0;
            if (currenttabgroup != "") {
                $.each(QuestionList, function (key, value) {
                    if (value.group == currenttabgroup) {
                        //Set start index only once.
                        iend = value.index;
                    }
                });
            }
            return iend;
        }
        function getPendingQuestions()
        {
            var pending = "0";
            if (AnswerList != null && AnswerList.length > 0) {
                $.each(AnswerList, function (key, answer) {
                    if (answer.value == null || answer.value == "") {
                        pending++;
                    }
                });
            }
            return pending;
        }
        /*APPLY STYLES*/
        function clearSubmitButtonStyle() {
            $(".submitbuttoncontainer").hide();
        }
        function updateSubmitButtonStyle() {
            //$(".submitbuttoncontainer").show(); // this is temp line to show button and should be removed
            if (AnswerList != null && AnswerList.length > 0) {
                var iscomplete = "1";
                $.each(AnswerList, function (key, answer) {
                    if (answer.value == null || answer.value == "") {
                        iscomplete = "0";
                    }
                });
                if (iscomplete == "1") {
                    $(".submitbuttoncontainer").show();
                }
            }
        }

        function clearQuestionAnswerStyle() {
            $("li[data-type='clickanswer']").removeClass('answerSA');
            $("li[data-type='clickanswer']").removeClass('answerA');
            $("li[data-type='clickanswer']").removeClass('answerN');
            $("li[data-type='clickanswer']").removeClass('answerD');
            $("li[data-type='clickanswer']").removeClass('answerSD');
        }
        function applyQuestionAnswerStyle() {
            clearQuestionAnswerStyle();
            var result = getAnswerbyCurrentIndex();
            switch (result) {
                case "5 - Strongly Agree":
                    $("li[data-value='" + result + "']").addClass('answerSA');
                    break;
                case "4 - Agree":
                    $("li[data-value='" + result + "']").addClass('answerA');
                    break;
                case "3 - Neutral":
                    $("li[data-value='" + result + "']").addClass('answerN');
                    break;
                case "2 - Disagree":
                    $("li[data-value='" + result + "']").addClass('answerD');
                    break;
                case "1 - Strongly Disagree":
                    $("li[data-value='" + result + "']").addClass('answerSD');
                default:

            }
        }
        function applyQuestionButtonStyleByQuestionIndex(questionindex) {
            var complete = 0;
            if (questionindex > 0) {

                $.each(AnswerList, function (key, answer) {
                    if (answer.index == questionindex) {
                        if (answer.value != null && answer.value != "") {
                            complete = 1;
                        }
                    }
                });

                if (complete == 1) {
                    $("li[data-type='questionbutton'][data-index='" + questionindex + "']").addClass("complete");
                    $("li[data-type='questionbutton'][data-index='" + questionindex + "']").removeClass("incomplete");
                }
                else {
                    $("li[data-type='questionbutton'][data-index='" + questionindex + "']").removeClass("complete");
                    $("li[data-type='questionbutton'][data-index='" + questionindex + "']").addClass("incomplete");
                }
            }
        }
        //Called only on answer click
        function applyQuestionButtonStyleOnAnswerClick() {
            $("li[data-type='questionbutton'][data-index='" + CurrentQuestionIndex + "']").addClass("complete");
            $("li[data-type='questionbutton'][data-index='" + CurrentQuestionIndex + "']").removeClass("incomplete");
        }
        //Tab Styles
        function clearTabStyle() {
            $('#liOrganize1 .icon-checkmark').hide();
            $("#liOrganize1 .icon-cross").hide();
            $('#liPeople1 .icon-checkmark').hide();
            $("#liPeople1 .icon-cross").hide();
            $('#liAgile1 .icon-checkmark').hide();
            $("#liAgile1 .icon-cross").hide();
            $('#liSoft1 .icon-checkmark').hide();
            $("#liSoft1 .icon-cross").hide();
            $('#liTools1 .icon-checkmark').hide();
            $("#liTools1 .icon-cross").hide();
        }
        function applyTabActiveStyle() {
            var currenttabgroup = getTabGroupNamebyCurrentQuestionIndex();
            var tabindex = 0;
            if (currenttabgroup != "") {
                $("li[data-type='clicktab']").each(function (i, value) {
                    if ($(value).data("group") == currenttabgroup) {
                        $(value).addClass("active");
                        tabindex = i;
                    }
                    else {
                        $(value).removeClass("active");
                    }
                });
            }
            switch (tabindex) {
                case 0:
                    $(".tabtriangledown").css("left", "8.5%");
                    break;
                case 1:
                    $(".tabtriangledown").css("left", "28.5%");
                    break;
                case 2:
                    $(".tabtriangledown").css("left", "48.5%");
                    break;
                case 3:
                    $(".tabtriangledown").css("left", "68.5%");
                    break;
                case 4:
                    $(".tabtriangledown").css("left", "88.5%");
                    break;
                default:
                    $(".tabtriangledown").css("left", "8.5% ");
            }
        }
        function applyPreviousTabCompletionStatusStyle(previousquestionindex) {
            if (parseInt(previousquestionindex) > 0) {
                var previoustabgroup = "";
                $.each(QuestionList, function (key, value) {
                    if (value.index == previousquestionindex) {
                        previoustabgroup = value.group;
                    }
                });
                if (previoustabgroup != "") {
                    var Iscomplete = getPreviousTabCompletionStatus(previousquestionindex);
                    if (Iscomplete == true) {
                        $("li[data-group='" + previoustabgroup + "'] .icon-checkmark").show();
                        $("li[data-group='" + previoustabgroup + "'] .icon-cross").hide();
                        //$("li[data-group='" + previoustabgroup + "']").children('.icon-checkmark').show();
                        //$("li[data-group='" + previoustabgroup + "']").children('.icon-cross').hide();
                    }
                    else {
                        $("li[data-group='" + previoustabgroup + "'] .icon-checkmark").hide();
                        $("li[data-group='" + previoustabgroup + "'] .icon-cross").show();
                        //$("li[data-group='" + previoustabgroup + "']").children('.icon-checkmark').hide();
                        //$("li[data-group='" + previoustabgroup + "']").children('.icon-cross').show();
                    }
                }
            }
        }
        function applyTabCompletionStatusStyleOnLoad() {
            var currenttabgroup = getTabGroupNamebyCurrentQuestionIndex();
            if (currenttabgroup != null) {
                $("li[data-type='clicktab']").each(function (i, tab) {
                    var tabgroup = $(tab).data("group");
                    if (tabgroup == currenttabgroup) {
                        $(tab).addClass("active");
                    }
                    else {
                        $(tab).removeClass("active");
                    }
                    if (tabgroup != "") {
                        var pending = 0;
                        var questioncount = 0;
                        var istart = getTabStartIndex(tabgroup);
                        var iend = getTabEndIndex(tabgroup);
                        if (istart > 0 && iend > 0) {
                            var i = 0;
                            for (i = (parseInt(istart) - 1) ; i < (parseInt(iend)) ; i++) {
                                if (AnswerList[i].value == null || AnswerList[i].value == "") {
                                    pending++;
                                }
                                questioncount++;
                            }
                        }
                        if (parseInt(pending) == 0) {
                            $("li[data-group='" + tabgroup + "'] .icon-checkmark").show();
                            $("li[data-group='" + tabgroup + "'] .icon-cross").hide();
                        }
                        else if (parseInt(pending) < parseInt(questioncount)) {
                            $("li[data-group='" + tabgroup + "'] .icon-checkmark").hide();
                            $("li[data-group='" + tabgroup + "'] .icon-cross").show();
                        }
                    }
                });
            }
        }
        function applyTabCompletionStatusOnAnswerclick() {
            var currenttabgroup = getTabGroupNamebyCurrentQuestionIndex();
            var Iscomplete = getPreviousTabCompletionStatus(CurrentQuestionIndex);
            if (Iscomplete == true) {
                $("li[data-group='" + currenttabgroup + "'] .icon-checkmark").show();
                $("li[data-group='" + currenttabgroup + "'] .icon-cross").hide();
            }
        }
        function applyQuestionButtonLinkStyle() {
            var currenttabgroup = getTabGroupNamebyCurrentQuestionIndex();
            var iscrossicondisplay = $("li[data-group='" + currenttabgroup + "'] .icon-cross").css("display");
            $("li[data-type='questionbutton']").each(function (i, libutton) {
                var iLIbutton = $(libutton).data("index");
                //map with answer based on index and check if answer is answered.
                $(libutton).removeClass("questionactivebutton");
                $.each(AnswerList, function (key, answer) {
                    if (answer.index == iLIbutton) {

                        if (answer.value != null && answer.value != "") {
                            $(libutton).removeClass("incomplete");
                            $(libutton).addClass("complete");
                        }
                        else {
                            if (iscrossicondisplay != "none") {
                                $(libutton).addClass("incomplete");
                                $(libutton).removeClass("complete");
                            }
                            else {
                                if (parseInt(iLIbutton) < parseInt(CurrentQuestionIndex) && parseInt(answer.index) == parseInt(iLIbutton)) {
                                    //if (answer.value == null || answer.value == "") {
                                    $(libutton).addClass("incomplete");
                                    $(libutton).removeClass("complete");
                                    //}
                                }
                            }
                        }
                    }
                });
                if (iLIbutton == CurrentQuestionIndex) {
                    $(libutton).addClass("questionactivebutton");
                }
            });
        }
        function applyQuestionButtonLinkStyleOnTabClick() {
            var currenttabgroup = getTabGroupNamebyCurrentQuestionIndex();
            var iscrossicondisplay = $("li[data-group='" + currenttabgroup + "'] .icon-cross").css("display");
            $("li[data-type='questionbutton']").each(function (i, libutton) {
                var iLIbutton = $(libutton).data("index");
                //map with answer based on index and check if answer is answered.
                $.each(AnswerList, function (key, answer) {
                    if (answer.index == iLIbutton) {
                        if (answer.value != null && answer.value != "") {
                            $(libutton).removeClass("incomplete");
                            $(libutton).addClass("complete");
                        }
                        else {
                            if (iscrossicondisplay != "none") {
                                $(libutton).addClass("incomplete");
                                $(libutton).removeClass("complete");
                            }
                        }
                    }
                });
            });
        }


        /*DYNAMIC QUESTION BUTTION LIST*/
        function createQuestionButtonLinksforActiveTab() {
            //document.getElementById('idquestionbuttonorganization').innerHTML = '<li data-type="questionlink" data-index=1></li><li data-type="questionlink" data-index=2></li>';
            var currenttabgroup = getTabGroupNamebyCurrentQuestionIndex();
            if (currenttabgroup != "") {
                var istart = getTabStartIndex(currenttabgroup);
                var iend = getTabEndIndex(currenttabgroup);
                //var count = getTabQuestionCountByTabName(currenttabgroup);
                var innerLIhtml = "";
                var i = parseInt(istart);
                for (i; i <= parseInt(iend) ; i++) {
                    innerLIhtml = innerLIhtml + "<li data-type=\"questionbutton\" data-index=" + i + "><a href='#'></a></li>";
                }
                document.getElementById('idquestionbuttonlist').innerHTML = innerLIhtml;
                $("li[data-type='questionbutton']").bind("click", function () {
                    questionButtonListHandler($(this).data("index"));
                });
            }
        }
        function questionButtonListHandler(questionlinkindex) {
            var questionindex = questionlinkindex;//$(this).data("index");
            CurrentQuestionIndex = questionindex;
            UpdateQuestionText();
            //updateQuestionCountText();
            applyQuestionAnswerStyle();
            applyQuestionButtonLinkStyle();
            //applyTabActiveStyle();
        }

        /*OFFLINE STORAGE*/
        function composeOfflinestorage() {
            var offlinedata = localStorage.getItem("CurrentAgileAssessment");
            var str = ""
            if (offlinedata != null || offlinedata != "") {
                var arrexisting = offlinedata.split('|');
                if (arrexisting != null && arrexisting.length >= 4) {
                    for (var i = 0; i <= 3; i++) {
                        if (i > 0) {
                            str = str + "|" + arrexisting[i];
                        }
                        else {
                            str = arrexisting[i];
                        }
                    }
                }
                str = str + "|" + CurrentQuestionIndex;
            }
            else {
                //str = "Apple|Vivek|gvivek@hexaware.com|9892777832|1";
            }
            //var str = "Apple|Vivek|gvivek@hexaware.com|9892777832|1";
            if (AnswerList != null && AnswerList.length > 0) {
                $.each(AnswerList, function (key, answer) {
                    str = str + "|" + answer.index + ":" + answer.key + ":" + answer.value;
                });
            }
            $('#ContentPlaceHolder2_idhiddenAnswer').val(str);
            localStorage.setItem("CurrentAgileAssessment", str);
        }

        function retainOfflineAnswers() {
            var offlinedata = localStorage.getItem("CurrentAgileAssessment");
            if (offlinedata == null || offlinedata == "") {
                return;
            }
            $('#ContentPlaceHolder2_idhiddenAnswer').val(offlinedata);
            var data = offlinedata;
            var arrMain = data.split('|');
            if (arrMain == null || arrMain.length < 4) {
                return;
            }
            for (var i = 5; i < arrMain.length; i++) {
                var arranswer = arrMain[i];
                var arrsingleanswer = arranswer.split(":");
                if (arrsingleanswer.length <= 2) {
                    break;
                }
                else {
                    var answerofflineindex = arrsingleanswer[0];
                    var answerofflinekey = arrsingleanswer[1];
                    var answerofflinevalue = arrsingleanswer[2];
                    if (answerofflinevalue != null && answerofflinevalue.length > 0) {
                        $.each(AnswerList, function (key, answer) {
                            if (answer.index == answerofflineindex) {
                                answer.value = answerofflinevalue;
                            }
                        });
                    }
                }
            }
        }
        function retainStyle() {
            clearQuestionAnswerStyle();
            clearTabStyle();
            clearSubmitButtonStyle();
            UpdateQuestionText();
            //updateQuestionCountText();
            updateProgressStatus();
            applyQuestionAnswerStyle();
            applyTabCompletionStatusStyleOnLoad();
            applyQuestionButtonLinkStyle();
            updateSubmitButtonStyle();
        }
        //function retainStyleForCurrentAnswers() {
        //    if (CurrentQuestionIndex != null && CurrentQuestionIndex > 0) {
        //        $.each(AnswerList, function (key, value) {
        //            if (answer.value != null && answer.value != "") {
        //                //Set current active tab.
        //                CurrentActiveTab = value.group;
        //            }
        //        });
        //    }
        //}

        //function updateCurrentActiveTabByQuestionIndex(questionindex)
        //{
        //    if (questionindex != null && questionindex > 0)
        //    {
        //        $.each(QuestionList, function (key, value) {
        //            if (value.index == questionindex) {
        //                //Set current active tab.
        //                CurrentActiveTab = value.group;
        //            }
        //        });
        //    }
        //}
        //function updateTabVisitedByTabGroup(currenttabgroup) {
        //    $("li[data-type='clicktab'][data-group='" + currenttabgroup + "']").data("visited", "1");
        //}
        //function getTabVisitedByTabGroup(currenttabgroup) {
        //    var isvisited = 0;
        //    isvisited = $("li[data-type='clicktab'][data-group='" + currenttabgroup + "']").data("visited");
        //    return isvisited;
        //}