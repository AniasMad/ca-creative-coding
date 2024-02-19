class StackedBarChart{
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
        this.labelRotation = obj.labelRotation; // rotation of labels
        this.tickNum = obj.tickNum; // defines the amount of ticks
        this.tickLength = obj.tickLength; // length of vertical ticks
        this.tickColour = obj.tickColour; // colour of vertical ticks
        this.vertLabelPadding = obj.vertLabelPadding;
        this.rounding = obj.rounding; // do vertical values get rounded
        this.roundingDecimal = obj.roundingDecimal; // amount of decimals shown
        this.lineWeight = obj.lineWeight; // stroke weight
        this.colours = obj.colours;
        this.backgroundLine = obj.backgroundLine;
        this.title = obj.title;
        this.titleSize = obj.titleSize;
        this.titlePadding = obj.titlePadding;
        this.titleColour = obj.titleColour;
    }

    render(){
        push ();
        translate (this.xPos,this.yPos);
        strokeWeight(this.lineWeight);
        let gap = (this.chartWidth - (this.data.length * this.barWidth))/(this.data.length +1)
        let labels = this.data.map(d => d[this.xValue])
        let scale = this.chartHeight/max(this.data.map(d => d[this.yValue]));
        

        let tickGap = this.chartHeight/this.tickNum;
        let tickValue = max(this.data.map(d => d[this.yValue]))/this.tickNum; // tickValue is vertical elements (numbers)

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
        push()
        translate(gap,0);
        for(let i=0; i<this.data.length; i++){
            
            fill(this.colours[i % this.colours.length]);

            rect (0,0,this.barWidth, -this.data[i][this.yValue]*scale);
            noStroke();

            fill(this.labelColour);
            textSize(this.labelTextSize);
            textAlign(LEFT, CENTER);
            push();
            angleMode(DEGREES);
            translate(this.barWidth/2, this.labelPadding);
            rotate(this.labelRotation);
            text(labels[i], 0, 0);
            pop();
            translate(gap+this.barWidth,0)
        }
        pop()

        push();

        translate(gap,0);
        for (let i=0;i<this.data.length; i++)
        {
            for(let j=0;j<this.xValue.length; j++)
            {
                
            }
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
                text(labelVert.toFixed(this.roundingDecimal),-this.tickLength-this.vertLabelPadding,-i*tickGap); // "toFixed" rounds the number with the specific amount of decimals
            }
            else
            {
                text(tickValue*i,-this.tickLength,-i*tickGap);
            }
        }
        pop();
    }
}