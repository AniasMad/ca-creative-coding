class HorizontalBarChart{
    constructor(obj){
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
        this.tickNum = obj.tickNum; // defines the amount of ticks
        this.tickLength = obj.tickLength; // length of vertical ticks
        this.tickColour = obj.tickColour; // colour of vertical ticks
        this.horizLabelPadding = obj.horizLabelPadding;
        this.rounding = obj.rounding; // do vertical values get rounded
        this.roundingDecimal = obj.roundingDecimal; // amount of decimals shown
        this.lineWeight = obj.lineWeight; // stroke weight
        this.colours = obj.colours;
        this.backgroundLine = obj.backgroundLine;
        this.title = obj.title;
        this.titleSize = obj.titleSize;
        this.titlePadding = obj.titlePadding;
        this.titleColour = obj.titleColour;
        this.chartType = obj.chartType;
    }

    render(){
        push ();
        translate (this.xPos,this.yPos);
        strokeWeight(this.lineWeight);
        let gap = (this.chartHeight - (this.data.length * this.barWidth))/(this.data.length +1) // Calculate the gap
        let labels = this.data.map(d => d[this.xValue])
        let allValues = [];
        let allValuesCalc = [];
        
        
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
        let scale = this.chartWidth/allValuesCalc;
        
        let tickGap = this.chartWidth/this.tickNum;
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
            line(i*tickGap,0,i*tickGap,-this.chartHeight);
        }

        // ------- This renders the title -------

        noStroke();
        fill(this.titleColour);
        textStyle(BOLD);
        textAlign(CENTER);
        textSize(this.titleSize);
        text(this.title,this.chartWidth/2,-this.chartHeight-this.titlePadding);
        textStyle(NORMAL);

        // ------- this loop draws vertical elements -------
        push()
        translate(0,-gap);
        for(let i=0; i<this.data.length; i++){
            let row = this.data[i];
            push();
            for(let j=0;j<this.yValue.length; j++)
            {
                if (this.chartType == "stacked")
                {
                    fill(this.colours[j % this.colours.length]); // colour change
                    rect (0,0,row[this.yValue[j]]*scale,-this.barWidth); // render rectangle
                    translate(row[this.yValue[j]]*scale,0);
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
                        let scaleValue = this.chartWidth/sumValue;
                        rect(0,0,row[this.yValue[j]]*scaleValue,-this.barWidth); // render rectangle
                        translate(row[this.yValue[j]]*scaleValue,0);
                    }
                }
                else
                {
                    fill(this.colours[j % this.colours.length]); // colour change
                    rect (0,0,row[this.yValue[j]]*scale,-this.barWidth); // render rectangle
                    translate(0,-this.barWidth);
                }
            }
            pop();
            noStroke();

            fill(this.labelColour);
            textSize(this.labelTextSize);
            textAlign(RIGHT, CENTER);
            // label rendering
            push();
            translate(-this.labelPadding,this.barWidth/-2);
            text(labels[i], 0, 0);
            pop();
            translate(0,-gap-this.barWidth)
        }
        pop()

        // ------- This draws axis lines -------

        stroke(this.axisLineColour);
        line (0,0,0,-this.chartHeight);
        line (0,0,this.chartWidth,0);
        
        // ------- this draws horizontal elements -------

        for(let i=0; i<=this.tickNum; i++)
        {
            stroke(this.tickColour); // draw ticks
            line(i*tickGap,0,i*tickGap,this.tickLength);
            noStroke();
            
            fill(this.labelColour); // draw labels
            textSize(this.labelTextSize);
            textAlign(CENTER,BASELINE);
            
            if(this.rounding == true) {
                let labelHoriz = tickValue*i;
                if (this.chartType == "100%") {
                    text(labelHoriz.toFixed(this.roundingDecimal)+"%",i*tickGap,this.tickLength+this.horizLabelPadding); // "toFixed" rounds the number with the specific amount of decimals
                }
                else 
                {
                    text(labelHoriz.toFixed(this.roundingDecimal),i*tickGap,this.tickLength+this.horizLabelPadding); // "toFixed" rounds the number with the specific amount of decimals
                }
            }
            else
            {
                if (this.chartType == "100%")
                {
                    text(tickValue*i+"%",i*tickGap,this.tickLength+this.horizLabelPadding);
                }
                else
                {
                    text(tickValue*i,i*tickGap,this.tickLength+this.horizLabelPadding);
                }
                
            }
        }
        pop();
    }
}