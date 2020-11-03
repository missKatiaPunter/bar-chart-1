let dataSource = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";
let chartHeight = 600;
let chartWidth = 800;
const scale = d3.scaleLinear();

const getData = async() => {
    return (await fetch(dataSource)).json();
}

const svg = d3.select("body")
    .append("svg")
    .attr("width", chartWidth)
    .attr("height", chartHeight)

let createScales = () => {

}

let createAxes = () => {
    let xAxis = d3.axisBottom(xAxisScale)
    let yAxis = d3.axisLeft(yAxisScale)
    svg.append('g')
        .call(xAxis)
        .attr('id', 'x-axis')
        .attr('transform', 'translate(0, ' + (height-padding) + ')')
    svg.append('g')
        .call(yAxis)
        .attr('id', 'y-axis')
        .attr('transform', 'translate(' + padding + ', 0)')
}


getData().then(data => {
    console.log(data.data.length)
    svg.selectAll("rect")
       .data(data.data)
       .enter()
       .append("rect")
       .attr('class', 'bar')
       .attr("x", (_, i) => i * 11)
       .attr("y", (d) => chartHeight - d[1])
       .attr("width", 10)
       .attr("height", d => d[1]);
});
