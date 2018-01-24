var jsonData = [{
    "Index": "1",
    "Key": "HEXSA_Q1",
    "Text": "You are open to contract structure that reflects an evolutionary agile development approach, in which requirement and solution evolve over the period.",
    "Group": "Organization Culture"
}, {
    "Index": "2",
    "Key": "HEXSA_Q2",
    "Text": "The working software is considered one of the primary success criteria for any project.",
    "Group": "Organization Culture"
}, {
    "Index": "3",
    "Key": "HEXSA_Q3",
    "Text": "You practice participative decision making and team involvement in execution to find creative solutions.",
    "Group": "Organization Culture"
}, {
    "Index": "4",
    "Key": "HEXSA_Q12",
    "Text": "You have software development environment that uses configuration and automation tools to deliver working software.",
    "Group": "Organization Culture"
}, {
    "Index": "5",
    "Key": "HEXSA_Q15",
    "Text": "You treat self-organizing team as a partner to the management and the customer.",
    "Group": "Organization Culture"
}, {
    "Index": "6",
    "Key": "HEXSA_Q21",
    "Text": "You follow the practice of reporting metrics (such as burn-down /up charts, velocity, Earned Values etc.) to track progress.",
    "Group": "Organization Culture"
}, {
    "Index": "7",
    "Key": "HEXSA_Q20",
    "Text": "You do not mandate heavy (detailed) documentation for the development process.",
    "Group": "Organization Culture"
}, {
    "Index": "8",
    "Key": "HEXSA_Q9",
    "Text": "You follow incremental-iterative approach to develop and deliver a working increment in time boxed iteration.",
    "Group": "People"
}, {
    "Index": "9",
    "Key": "HEXSA_Q4",
    "Text": "You practice self-organization of teams and volunteering of tasks for project execution.",
    "Group": "People"
}, {
    "Index": "10",
    "Key": "HEXSA_Q13",
    "Text": "Your  employees are competent and disciplined to work as a self-organizing team without management's interference.",
    "Group": "People"
}, {
    "Index": "11",
    "Key": "HEXSA_Q14",
    "Text": "You follow the practice of inspection, design improvement and refactoring in every iteration.",
    "Group": "People"
}, {
    "Index": "12",
    "Key": "HEXSA_Q22",
    "Text": "Your team works in open work culture that fosters team collaboration, communication and decisions making. ",
    "Group": "People"
}, {
    "Index": "13",
    "Key": "HEXSA_Q26",
    "Text": "You have dedicated development team with a single point of contact from business to actively manage product backlog.",
    "Group": "People"
}, {
    "Index": "14",
    "Key": "HEXSA_Q7",
    "Text": "You can start a project without knowing all the business requirements upfront.",
    "Group": "Agile Management"
}, {
    "Index": "15",
    "Key": "HEXSA_Q8",
    "Text": "Customer has full right to change the requirements throughout the product development cycle in order to meet business needs. ",
    "Group": "Agile Management"
}, {
    "Index": "16",
    "Key": "HEXSA_Q10",
    "Text": "You plan the project at multiple levels (iterations, releases, portfolio and program) rather than having one plan for the whole project.",
    "Group": "Agile Management"
}, {
    "Index": "17",
    "Key": "HEXSA_Q23",
    "Text": "You encourage constant customer interaction throughout the development process to get their feedbacks.",
    "Group": "Agile Management"
}, {
    "Index": "18",
    "Key": "HEXSA_Q25",
    "Text": "You plan work in collaboration with customer based on the business value.",
    "Group": "Agile Management"
}, {
    "Index": "19",
    "Key": "HEXSA_Q27",
    "Text": "Entire team does the project estimation, taking feedbacks from business representatives.",
    "Group": "Agile Management"
}, {
    "Index": "20",
    "Key": "HEXSA_Q28",
    "Text": "You follow collaborative software development (eg: paired programming).",
    "Group": "Agile Management"
}, {
    "Index": "21",
    "Key": "HEXSA_Q16",
    "Text": "You have all unit test cases automated.",
    "Group": "Software Process"
}, {
    "Index": "22",
    "Key": "HEXSA_Q6",
    "Text": "You practice relative sizing using methods such as planning poker to estimate the scope of work. ",
    "Group": "Software Process"
}, {
    "Index": "23",
    "Key": "HEXSA_Q11",
    "Text": "You design, develop and refactor incrementally in multiple iterations as the requirements gets elaborated.",
    "Group": "Software Process"
}, {
    "Index": "24",
    "Key": "HEXSA_Q17",
    "Text": "Your team performs testing activities in parallel to development without having a separate testing phase.",
    "Group": "Software Process"
}, {
    "Index": "25",
    "Key": "HEXSA_Q19",
    "Text": "You proactively perform risk assessment and apply necessary mitigation techniques throughout the project lifecycle.",
    "Group": "Software Process"
}, {
    "Index": "26",
    "Key": "HEXSA_Q31",
    "Text": "Project teams use high technology collaboration tools for tracking progress.",
    "Group": "Software Process"
}, {
    "Index": "27",
    "Key": "HEXSA_Q32",
    "Text": "Policies and procedures show that there is no need for a high level of documentations as part of the process.",
    "Group": "Software Process"
}, {
    "Index": "28",
    "Key": "HEXSA_Q5",
    "Text": "You have a mechanism for persistent knowledge sharing among project team members through tools such as Wikis, Blogs, etc.",
    "Group": "Tools & Infrastructure"
}, {
    "Index": "29",
    "Key": "HEXSA_Q18",
    "Text": "You have the requisite tools and processes to support continuous integration and regular delivery of working software.",
    "Group": "Tools & Infrastructure"
}, {
    "Index": "30",
    "Key": "HEXSA_Q24",
    "Text": "You have processes and tools for planning, status tracking, metrics generation and reporting; that are accessible to customer and project stakeholders.",
    "Group": "Tools & Infrastructure"
}, {
    "Index": "31",
    "Key": "HEXSA_Q29",
    "Text": "You have invested in test automation tool suites and engage development team to learn and adapt test-driven development.",
    "Group": "Tools & Infrastructure"
}, {
    "Index": "32",
    "Key": "HEXSA_Q30",
    "Text": "You have well-defined agile process and estimation tools/templates for recording, scheduling and budgeting project.",
    "Group": "Tools & Infrastructure"
}]


var result = jsonData.reduce(function (r, a) {
    r[a.Group] = r[a.Group] || [];
    r[a.Group].push(a);
    return r;
}, Object.create(null));


var tabList = Object.keys(result);
var defaultActiveTab = tabList[0];
console.log(result);

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
