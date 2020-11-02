let dataSource = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";

const getData = async() => {
    return (await fetch(dataSource)).json();
}

const svg = d3.select("body")
    .append("svg")
    .attr("width", 800)
    .attr("height", 600)

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
       .attr("x", (d, i) => i * 11)
       .attr("y", 0)
       .attr("width", 10)
       .attr("height", 100);
});
