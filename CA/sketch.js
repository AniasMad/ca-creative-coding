let barCharts = [];
let data;
let cleanData=[];
let numRows;

function preload(){
    data = loadTable("data/combined.csv", "csv", "header");
}

function setup(){
    background(50)
    createCanvas(1200,1200)
    angleMode(DEGREES)
    noLoop();

    numRows = data.rows.length;
    for(let i=0;i<numRows;i++){
        cleanData.push(data.rows[i].obj)
    }
    console.log(cleanData)

    let barChart01 = {
        data: cleanData,
        yValue: "Total",
        xValue: "Age_Group",
        chartWidth: 400,
        chartHeight: 300,
        xPos: 50,
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
        yValue: "Total",
        xValue: "Age_Group",
        chartWidth: 400,
        chartHeight: 300,
        xPos: 600,
        yPos: 400,
        axisLineColour: "fff",
        barWidth: 20,
        labelTextSize:15,
        labelPadding:10,
        labelColour: "fff",
        tickNum: 5,
        tickLength: 10,
        tickColour: "fff",
        vertLabelPadding: 20,
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
        yValue: ["Male", "Female"],
        xValue: "Age_Group",
        chartWidth: 400,
        chartHeight: 300,
        xPos: 50,
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

    barCharts.push(new BarChart(barChart01));
    barCharts.push(new HorizontalBarChart(horizontalBarChart02));
    barCharts.push(new StackedBarChart(stackedBarChart03));
}

function draw() {
    background(50);
    barCharts.forEach(bar => bar.render())
}

