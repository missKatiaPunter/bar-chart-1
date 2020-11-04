let dataSource = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";
let chartHeight = 600;
let chartWidth = 800;
let padding = 20;

let xScale;
let yScale;

const getData = async() => {
    return (await fetch(dataSource)).json();
}

const svg = d3.select("body")
    .append("svg")
    .attr("width", chartWidth)
    .attr("height", chartHeight)
    .attr('padding', padding)

let createScales = () => {

}

let createAxes = () => {
    let xAxis = d3.axisBottom(xScale)
    let yAxis = d3.axisLeft(yScale)
    svg.append('g')
        .call(xAxis)
        .attr('id', 'x-axis')
        .attr('transform', 'translate(0, ' + (height-padding) + ')')
    svg.append('g')
        .call(yAxis)
        .attr('id', 'y-axis')
        .attr('transform', 'translate(' + padding + ', 0)')
}


getData().then(input => {
    const { data } = input;
    let extent = d3.extent(data, d => d[1]);
    xScale = d3.scaleLinear().domain([0, data.length-1]).range([padding, chartWidth-padding]);
    svg.selectAll("rect")
       .data(data)
       .enter()
       .append("rect")
       .attr('class', 'bar')
       .attr("x", (_, i) => xScale(i))
       .attr("y", (d) => chartHeight - d[1])
       .attr("width", (chartWidth - (2 * padding)) / data.length)
       .attr("height", d => d[1]);
});
