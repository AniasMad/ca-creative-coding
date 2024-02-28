class LineChart{
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
        this.colour = obj.colour; // defines an array of colours for the chart
        this.backgroundLine = obj.backgroundLine; // defines the colour for background lines
        this.title = obj.title; // defines the title of the chart
        this.titleSize = obj.titleSize; // defines the size of the font for title
        this.titlePadding = obj.titlePadding; // defines the padding for title
        this.titleColour = obj.titleColour; // defines the colour for text of title
    }

    render(){
        push ();
        translate (this.xPos,this.yPos);
        strokeWeight(this.lineWeight);
        let gap = (this.chartWidth - (this.data.length * this.barWidth))/(this.data.length +1) // Calculate the gap
        let labels = this.data.map(d => d[this.xValue]) // Map the horizontal labels into array

        let allValues = [];
        let allValuesCalc =[];

        for(let i=0; i<this.yValue.length; i++)
        {
            allValues.push(max(this.data.map((row) => +row[this.yValue[i]])));
        }
        allValuesCalc = allValues.reduce((e, x) => e + x, 0);

        let scale = this.chartHeight/allValuesCalc;
        
        let tickGap = this.chartHeight/this.tickNum;
        
        let tickValue = allValuesCalc/this.tickNum; // tickValue is vertical elements (numbers)

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
        
        beginShape();
        vertex(0,0);
        push();
        translate(gap, 0);
        
        for(let i=0; i<this.data.length; i++){
            stroke(this.colour)
            fill(this.colour); // colour change
            // vertex((this.barWidth+gap)*i,-this.data[i][this.yValue]*scale); // render circle
            vertex((this.barWidth+gap)*i,-this.data[i][this.yValue]*scale); // render circle
            console.log(scale)
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
        stroke(this.colour);
        fill(this.colour);
        strokeWeight(this.lineWeight);
        vertex(this.chartWidth,0);
        endShape(CLOSE);
        
        // ------- this draws vertical elements -------

        for(let i=0; i<=this.tickNum; i++)
        {
            stroke(this.tickColour); // draw ticks
            strokeWeight(1);
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