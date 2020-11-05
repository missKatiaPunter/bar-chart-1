let dataSource = "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/GDP-data.json";
let chartHeight = 600;
let chartWidth = 800;
let padding = 50;

let xScale;
let yScale;

const getData = async() => {
    return (await fetch(dataSource)).json();
}

const svg = d3.select("body")
    .append("svg")
    .attr("width", chartWidth)
    .attr("height", chartHeight)

let createAxes = () => {
    let xAxis = d3.axisBottom(xScale);
    let yAxis = d3.axisLeft(yScale);
    svg.append('g')
        .call(xAxis)
        .attr('id', 'x-axis')
        .attr('transform', 'translate(' + [0,chartHeight-padding] + ')')
    svg.append('g')
        .call(yAxis)
        .attr('id', 'y-axis')
        .attr('transform', 'translate(' + padding + ', 0)')
}

getData().then(input => {
    const { data } = input;
    let xExtent = d3.extent(data, d => new Date(d[0]));
    xScale = d3.scaleTime().domain(xExtent).range([padding, chartWidth-padding]);
    yScale = d3.scaleLinear().domain([0, d3.max(data,d=>d[1])]).range([chartHeight-padding, padding]);
    createAxes();
    svg.selectAll("rect")
       .data(data)
       .enter()
       .append("rect")
       .attr('class', 'bar')
       .attr('data-date', (d, i)  => data[i][0])
       .attr('data-gdp', (d, i) => data[i][1])
       .attr("x", (d) => xScale(new Date(d[0])))
       .attr("y", (d) => yScale(d[1]))
       .attr("width", 2)
       .attr("height", d => chartHeight - padding - yScale(d[1]));
});
