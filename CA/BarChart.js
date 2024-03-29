class BarChart{
    constructor(obj = ["data", ["yValue"], "xValue", 200, 200, 0, 0, "#000000", // Declaration of default values, 
    10, 10, 10, "#000000", 45, 5, 5, "#000000", 10, false,  0, 1, ["#000000", "#fff"], //if user doesn't input something then the default will be used 
    "#2e2e2e", "Sample title", 10, 10, "#000000", "normal", 0]){ 
        this.data = obj.data; // what data is being imported
        this.yValue = obj.yValue; // vertical label data
        this.xValue = obj.xValue; // horizontal label data
        this.chartWidth=obj.chartWidth; // width of the chart
        this.chartHeight=obj.chartHeight; // height of the chart
        this.xPos = obj.xPos; // position of the chart on main canvas by X
        this.yPos = obj.yPos; // position of the chart on main canvas by Y
        this.axisLineColour = obj.axisLineColour; // Colour of main axis lines
        this.barWidth = obj.barWidth; // width of the bar
        this.labelTextSize = obj.labelTextSize; // Size of the label text both vertical and horizontal
        this.labelPadding = obj.labelPadding; // Padding of labels relative to chart
        this.labelColour = obj.labelColour; // colour of labels
        this.labelRotation = obj.labelRotation; // rotation of labels
        this.tickNum = obj.tickNum; // defines the amount of ticks
        this.tickLength = obj.tickLength; // length of vertical ticks
        this.tickColour = obj.tickColour; // colour of vertical ticks
        this.vertLabelPadding = obj.vertLabelPadding;
        this.rounding = obj.rounding; // do vertical values get rounded
        this.roundingDecimal = obj.roundingDecimal; // amount of decimals shown
        this.lineWeight = obj.lineWeight; // stroke weight
        this.colours = obj.colours; // defines an array of colours for the chart
        this.backgroundLine = obj.backgroundLine; // defines the colour for background lines
        this.title = obj.title; // defines the title of the chart
        this.titleSize = obj.titleSize; // defines the size of the font for title
        this.titlePadding = obj.titlePadding; // defines the padding for title
        this.titleColour = obj.titleColour; // defines the colour for text of title
        this.chartType = obj.chartType;
        this.dataStart = obj.dataStart;
    }

    render(){
        push ();
        translate (this.xPos,this.yPos);
        strokeWeight(this.lineWeight);
        let gap = (this.chartWidth - (this.data.length * this.barWidth))/(this.data.length +1); // Calculate the gap
        let labels = this.data.map(d => d[this.xValue]); // Map the horizontal labels into array

        let allValues = [];
        let allValuesCalc =[];

        
        for(let i=0; i<this.yValue.length; i++)
        {
            allValues.push(max(this.data.map((row) => +row[this.yValue[i]])));
        }
        if (this.chartType == "stacked")
        {
            allValuesCalc = allValues.reduce((e, x) => e + x, 0);
        }
        else {
            allValuesCalc = max(allValues);
        }
        
        let tickValue;
        let scale = this.chartHeight/allValuesCalc;
        
        let tickGap = this.chartHeight/this.tickNum;
        if (this.chartType == "100%")
        {
            tickValue = 100/this.tickNum;
        } else
        {
            tickValue = allValuesCalc/this.tickNum; // tickValue is vertical elements (numbers)
        }   
        
        // ------- This loop draws background lines -------

        for (let i=1; i<=this.tickNum; i++) {
            stroke(this.backgroundLine); // draw background lines
            line(0,-i*tickGap,this.chartWidth,-i*tickGap);
        }

        // ------- This draws axis lines -------

        stroke(this.axisLineColour);
        line (0,0,0,-this.chartHeight);
        line (0,0,this.chartWidth,0);

        // ------- This renders the title -------

        noStroke();
        fill(this.titleColour);
        textStyle(BOLD);
        textAlign(CENTER);
        textSize(this.titleSize);
        text(this.title,this.chartWidth/2,-this.chartHeight-this.titlePadding);
        textStyle(NORMAL);

        // ------- this loop draws horizontal elements -------
        push();
        translate(gap,0);
        for(let i=0; i<this.data.length; i++){
            let row = this.data[i];
            push();
            for(let j=0;j<this.yValue.length; j++)
            {
                if (this.chartType == "stacked")
                {
                    fill(this.colours[j % this.colours.length]); // colour change
                    rect (0,0,this.barWidth, -row[this.yValue[j]]*scale); // render rectangle
                    translate(0,-row[this.yValue[j]]*scale);
                }
                else if (this.chartType == "100%")
                {
                    let sumValue = 0;
                    for(let q=0; q<this.yValue.length; q++)
                    {
                        sumValue += +row[this.yValue[q]];
                    }
                    fill(this.colours[j % this.colours.length]); // colour change
                    if(sumValue != 0)
                    {
                        let scaleValue = this.chartHeight/sumValue;
                        rect(0,0,this.barWidth, scaleValue*-row[this.yValue[j]]); // render rectangle
                        translate(0,-row[this.yValue[j]]*scaleValue);
                    }
                }
                else
                {
                    fill(this.colours[j % this.colours.length]); // colour change
                    rect (0,0,this.barWidth, -row[this.yValue[j]]*scale); // render rectangle
                    translate(this.barWidth,0);
                }
            }
            pop();
            
            noStroke();

            fill(this.labelColour); // text colour
            textSize(this.labelTextSize);
            textAlign(LEFT, CENTER);
            push();
            angleMode(DEGREES);
            translate(this.barWidth/2, this.labelPadding);
            rotate(this.labelRotation);
            text(labels[i], 0, 0);
            pop();
            translate(gap+this.barWidth,0); // move to next bar
        }
        pop();
        
        // ------- this draws vertical elements -------

        for(let i=0; i<=this.tickNum; i++)
        {
            stroke(this.tickColour); // draw ticks
            line(0,-i*tickGap,-this.tickLength,-i*tickGap);
            noStroke();
            
            fill(this.labelColour); // draw labels
            textSize(this.labelTextSize);
            textAlign(RIGHT, CENTER);

            if(this.rounding == true) {
                let labelVert = tickValue*i;
                if (this.chartType == "100%") {
                    text(labelVert.toFixed(this.roundingDecimal)+"%",-this.tickLength-this.vertLabelPadding,-i*tickGap); // "toFixed" rounds the number with the specific amount of decimals
                }
                else 
                {
                    text(labelVert.toFixed(this.roundingDecimal),-this.tickLength-this.vertLabelPadding,-i*tickGap); // "toFixed" rounds the number with the specific amount of decimals
                }
            }
            else
            {
                if (this.chartType == "100%")
                {
                    text(tickValue*i+"%",-this.tickLength,-i*tickGap);
                }
                else
                {
                    text(tickValue*i,-this.tickLength,-i*tickGap);
                }
                
            }
        }
        pop();
    }
}