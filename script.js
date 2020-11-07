let dataSource = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";
let chartHeight = 600;
let chartWidth = 800;
let padding = 50; //the value to be used to create edges within the svg

// Sets the global variables for scales as they depend on data

let xScale; 
let yScale;

// Returns a promise after calling the data URL

const getData = async() => {
    return (await fetch(dataSource)).json();
}

// Appends the empty svg to the body of the document

const svg = d3.select("body")
    .append("svg")
    .attr("width", chartWidth)
    .attr("height", chartHeight)

// Appends the tooltip div to the body of the document

const tooltip = d3.select('body')
    .append('div')
    .attr('id', 'tooltip') //sets the tooltip id to pass the first tooltip test
    .style("visibility", "hidden") //makes tooltip invisible on page load

const createAxes = () => {
    let xAxis = d3.axisBottom(xScale).ticks(5); //Sets exactly 5 x-axis ticks
    let yAxis = d3.axisLeft(yScale);
    svg.append('g')
        .call(xAxis)
        .attr('id', 'x-axis')
        .attr('transform', 'translate(' + [0,chartHeight-padding] + ')') //moves the x axis down
    svg.append('g')
        .call(yAxis)
        .attr('id', 'y-axis')
        .attr('transform', 'translate(' + padding + ', 0)')
}

//Creates y-axis legend only as legends are not in the FCC task

const createLegend = () => {
    svg.append('text')
        .attr('transform', 'rotate(-90)')
        .attr('x', -240)
        .attr('y', 80)
        .text('Gross Domestic Product, $');
}

//Resolves the data promise and builds the bar chart

getData().then(input => {
    const { data } = input; //gets the array of data from the object returned from the API call - input.data
    let xExtent = d3.extent(data, d => new Date(d[0])); //gets the min and max of the date data
    xScale = d3.scaleTime().domain(xExtent).range([padding, chartWidth-padding]); //xScale according to date extent
    yScale = d3.scaleLinear().domain([0, d3.max(data,d=>d[1])]).range([chartHeight-padding, padding]);
    createAxes();
    createLegend();
    svg.selectAll("rect")
       .data(data) //binds the data to svg
       .enter()
       .append("rect")
       .attr('class', 'bar') //Adds css class bar to rectangles to pass the FCC test
       .attr('data-date', (d, i)  => data[i][0])//Creates the data-date attribute to pass test
       .attr('data-gdp', (d, i) => data[i][1])//Creates the data-gdp attribute to pass test
       .attr("x", (d) => xScale(new Date(d[0]))) //Sets the rect x-coord according to xScale
       .attr("y", (d) => yScale(d[1]))
       .attr("width", 2)
       .attr("height", d => chartHeight - padding - yScale(d[1]))
       .on('mouseover', (_, i) => {
           tooltip.style("visibility", "visible") //Sets tooltip div to be visible on mouse over rect
                .html(`Period: ${i[0]}`) //Sets the html of the tooltip div to date data 
                .attr('data-date', i[0]) //Creates the data-date attribute to pass the second tooltip test
       })
       .on("mouseout", () => tooltip.style("visibility", "hidden")); //Sets tooltip div to be invisible when mouse out
});
