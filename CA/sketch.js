let barCharts = [];
let data;
let data2;
let cleanData=[];
let cleanData2=[];
let numRows;
let numRows2;

function preload(){
    data = loadTable("data/dependencygender.csv", "csv", "header");
    data2 = loadTable("data/dependencies.csv", "csv", "header");
}

function setup(){
    background(50)
    createCanvas(1500,2000)
    angleMode(DEGREES)
    noLoop();

    numRows = data.rows.length;
    for(let i=0;i<numRows;i++){
        cleanData.push(data.rows[i].obj)
    }
    numRows2 = data2.rows.length;
    for(let i=0;i<numRows2;i++){
        cleanData2.push(data2.rows[i].obj)
    }

    let barChart01 = {
        data: cleanData,
        yValue: ["Male","Female"],
        xValue: "County and City",
        chartWidth: 500,
        chartHeight: 300,
        xPos: 100,
        yPos: 400,
        axisLineColour: "fff",
        barWidth: 7,
        labelTextSize:15,
        labelPadding:10,
        labelColour: "fff",
        labelRotation: 45,
        tickNum: 5,
        tickLength: 10,
        tickColour: "fff",
        vertLabelPadding: 4,
        rounding: true,
        roundingDecimal: 1,
        lineWeight: 1,
        colours: ["#30ffee", "#3f14ff"],
        backgroundLine: "#616161",
        title: "Depencency by Gender",
        titleSize: 20,
        titlePadding: 10,
        titleColour: "fff",
        chartType: ""
    };

    let horizontalBarChart02 = {
        data: cleanData,
        yValue: ["Male","Female"],
        xValue: "County and City",
        chartWidth: 500,
        chartHeight: 300,
        xPos: 800,
        yPos: 400,
        axisLineColour: "fff",
        barWidth: 7,
        labelTextSize:15,
        labelPadding:10,
        labelColour: "fff",
        tickNum: 5,
        tickLength: 10,
        tickColour: "fff",
        horizLabelPadding: 20,
        rounding: true,
        roundingDecimal: 1,
        lineWeight: 1,
        colours: ["#30ffee", "#3f14ff"],
        backgroundLine: "#616161",
        title: "Depencency by Gender (%)",
        titleSize: 20,
        titlePadding: 10,
        titleColour: "fff",
        chartType: "100%"
    };

    let stackedBarChart03 = {
        data: cleanData,
        yValue: ["Male","Female"],
        xValue: "County and City",
        chartWidth: 500,
        chartHeight: 300,
        xPos: 100,
        yPos: 900,
        axisLineColour: "fff",
        barWidth: 15,
        labelTextSize:15,
        labelPadding:10,
        labelColour: "fff",
        labelRotation: 45,
        tickNum: 5,
        tickLength: 10,
        tickColour: "fff",
        vertLabelPadding: 5,
        rounding: true,
        roundingDecimal: 1,
        lineWeight: 1,
        colours: ["#30ffee", "#3f14ff"],
        backgroundLine: "#616161",
        title: "Depencency by Age",
        titleSize: 20,
        titlePadding: 10,
        titleColour: "fff",
        chartType: "stacked"
    };

    let barChart1004 = {
        data: cleanData2,
        yValue: ["Young age dependency (0-14)", "Old age dependency (65 & over)"],
        xValue: "Countries",
        chartWidth: 500,
        chartHeight: 300,
        xPos: 800,
        yPos: 900,
        axisLineColour: "fff",
        barWidth: 11,
        labelTextSize:15,
        labelPadding:10,
        labelColour: "fff",
        labelRotation: 90,
        tickNum: 5,
        tickLength: 10,
        tickColour: "fff",
        vertLabelPadding: 5,
        rounding: true,
        roundingDecimal: 1,
        lineWeight: 1,
        colours: ["#30ffee", "#3f14ff"],
        backgroundLine: "#616161",
        title: "Dependency by Age (%)",
        titleSize: 20,
        titlePadding: 10,
        titleColour: "fff",
        chartType: "100%"
    };

    let scatterplot = {
        data: cleanData2,
        yValue: ["Young age dependency (0-14)", "Old age dependency (65 & over)"],
        xValue: "Countries",
        chartWidth: 700,
        chartHeight: 300,
        xPos: 350,
        yPos: 1400,
        axisLineColour: "fff",
        barWidth: 7,
        labelTextSize:15,
        labelPadding:10,
        labelColour: "fff",
        labelRotation: 90,
        tickNum: 5,
        tickLength: 10,
        tickColour: "fff",
        vertLabelPadding: 5,
        rounding: true,
        roundingDecimal: 1,
        lineWeight: 1,
        colours: ["#30ffee", "#3f14ff"],
        backgroundLine: "#616161",
        title: "Dependency by Country",
        titleSize: 20,
        titlePadding: 10,
        titleColour: "fff"
    };

    barCharts.push(new BarChart(barChart01));
    barCharts.push(new HorizontalBarChart(horizontalBarChart02));
    barCharts.push(new BarChart(stackedBarChart03));
    barCharts.push(new BarChart(barChart1004));
    barCharts.push(new ScatterPlot(scatterplot));
}

function draw() {
    background(50);
    barCharts.forEach(bar => bar.render())
}

