let barCharts = [];
let data;
let data2;
let cleanData=[];
let cleanData2=[];
let numRows;
let numRows2;

function preload(){
    data = loadTable("data/dataCA.csv", "csv", "header");
    data2 = loadTable("data/dependencies.csv", "csv", "header");
}

function setup(){
    background(50)
    createCanvas(1200,2000)
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
        yValue: "Population with a GP Visit Card (Number)",
        xValue: "Year",
        chartWidth: 400,
        chartHeight: 300,
        xPos: 100,
        yPos: 400,
        axisLineColour: "fff",
        barWidth: 20,
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
        colours: ["#7d3ddb", "#6035cc", "#402e99"],
        backgroundLine: "#616161",
        title: "Bar Chart",
        titleSize: 20,
        titlePadding: 10,
        titleColour: "fff"
    };

    let horizontalBarChart02 = {
        data: cleanData,
        yValue: "Population with a GP Visit Card (Number)",
        xValue: "Year",
        chartWidth: 400,
        chartHeight: 300,
        xPos: 650,
        yPos: 400,
        axisLineColour: "fff",
        barWidth: 20,
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
        colours: ["#7d3ddb", "#6035cc", "#402e99"],
        backgroundLine: "#616161",
        title: "Horizontal Bar Chart",
        titleSize: 20,
        titlePadding: 10,
        titleColour: "fff"
    };

    let stackedBarChart03 = {
        data: cleanData,
        yValue: ["Population with a GP Visit Card (Number)", "Population with a Medical Card (Number)"],
        xValue: "Year",
        chartWidth: 400,
        chartHeight: 300,
        xPos: 100,
        yPos: 900,
        axisLineColour: "fff",
        barWidth: 20,
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
        colours: ["#38138f", "#309bb0"],
        backgroundLine: "#616161",
        title: "Stacked Bar Chart",
        titleSize: 20,
        titlePadding: 10,
        titleColour: "fff"
    };

    let barChart1004 = {
        data: cleanData,
        yValue: ["Population with a GP Visit Card (Number)", "Population with a Medical Card (Number)"],
        xValue: "Year",
        chartWidth: 400,
        chartHeight: 300,
        xPos: 650,
        yPos: 900,
        axisLineColour: "fff",
        barWidth: 20,
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
        colours: ["#38138f", "#309bb0"],
        backgroundLine: "#616161",
        title: "100% Stacked Bar Chart",
        titleSize: 20,
        titlePadding: 10,
        titleColour: "fff"
    };

    let lineChart05 = {
        data: cleanData2,
        yValue: ["Young and old age dependency"],
        xValue: "Countries",
        chartWidth: 400,
        chartHeight: 300,
        xPos: 100,
        yPos: 1400,
        axisLineColour: "fff",
        barWidth: 20,
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
        colours: ["#69fcff", "#309bb0"],
        backgroundLine: "#616161",
        title: "Scatter Plot",
        titleSize: 20,
        titlePadding: 10,
        titleColour: "fff"
    };

    barCharts.push(new BarChart(barChart01));
    barCharts.push(new HorizontalBarChart(horizontalBarChart02));
    barCharts.push(new StackedBarChart(stackedBarChart03));
    barCharts.push(new BarChart100(barChart1004));
    barCharts.push(new ScatterPlot(lineChart05));
}

function draw() {
    background(50);
    barCharts.forEach(bar => bar.render())
}

