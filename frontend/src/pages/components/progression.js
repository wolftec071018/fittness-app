const d3 = require("d3");
function visualization(w, h) {
  var data = [
    {
      name: "shoulders",
      values: [
        { date: "2021-03-17", measurements: "14" },
        { date: "2021-03-21", measurements: "14" },
        { date: "2021-03-24", measurements: "14.2" },
        { date: "2021-03-28", measurements: "14.5" },
        { date: "2021-03-31", measurements: "14.5" },
        { date: "2021-04-04", measurements: "14.5" },
        { date: "2021-04-08", measurements: "15" },
        { date: "2021-04-12", measurements: "15" },
        { date: "2021-04-16", measurements: "16" },
        { date: "2021-04-20", measurements: "16.5" },
        { date: "2021-04-27", measurements: "16.8" },
        { date: "2021-05-04", measurements: "17" },
        { date: "2021-05-11", measurements: "17.1" },
        { date: "2021-05-13", measurements: "17.5" }
      ]
    },
    {
      name: "chest",
      values: [
        { date: "2021-03-17", measurements: "28" },
        { date: "2021-03-21", measurements: "28" },
        { date: "2021-03-24", measurements: "28" },
        { date: "2021-03-28", measurements: "28" },
        { date: "2021-03-31", measurements: "28.5" },
        { date: "2021-04-04", measurements: "28.5" },
        { date: "2021-04-08", measurements: "29" },
        { date: "2021-04-12", measurements: "29.2" },
        { date: "2021-04-16", measurements: "29.8" },
        { date: "2021-04-20", measurements: "30" },
        { date: "2021-04-27", measurements: "30.1" },
        { date: "2021-05-04", measurements: "30.4" },
        { date: "2021-05-11", measurements: "30.4" },
        { date: "2021-05-13", measurements: "31" }
      ]
    },
    {
      name: "glutes",
      values: [
        { date: "2021-03-17", measurements: "26" },
        { date: "2021-03-21", measurements: "26" },
        { date: "2021-03-24", measurements: "27" },
        { date: "2021-03-28", measurements: "27" },
        { date: "2021-03-31", measurements: "27.5" },
        { date: "2021-04-04", measurements: "27.5" },
        { date: "2021-04-08", measurements: "28.4" },
        { date: "2021-04-12", measurements: "28.8" },
        { date: "2021-04-16", measurements: "29" },
        { date: "2021-04-20", measurements: "30" },
        { date: "2021-04-27", measurements: "31" },
        { date: "2021-05-04", measurements: "31" },
        { date: "2021-05-11", measurements: "32" },
        { date: "2021-05-13", measurements: "32" }
      ]
    }
  ];

  var width = w / 2;
  var height = h / 3;
  var margin = 50;
  var duration = 250;

  var lineOpacity = "0.25";
  var lineOpacityHover = "0.85";
  var otherLinesOpacityHover = "0.1";
  var lineStroke = "1.5px";
  var lineStrokeHover = "2.5px";

  var circleOpacity = "0.85";
  var circleOpacityOnLineHover = "0.25";
  var circleRadius = 3;
  var circleRadiusHover = 6;

  /* Format Data */
  var parseDate = d3.timeParse("%Y-%m-%d");
  data.forEach(function (d) {
    d.values.forEach(function (d) {
      d.date = parseDate(d.date);
      d.measurements = +d.measurements;
    });
  });

  /* Scale */
  var xScale = d3
    .scaleTime()
    .domain(d3.extent(data[0].values, (d) => d.date))
    .range([0, width - margin]);

  var yScale = d3
    .scaleLinear()
    .domain([0, d3.max(data[2].values, (d) => d.measurements)])
    .range([height - margin, 0]);

  var color = d3.scaleOrdinal(d3.schemeCategory10);
  d3.select("#chart").selectAll("svg").remove();
  /* Add SVG */
  var svg = d3
    .select("#chart")
    .append("svg")
    .attr("width", width + margin + "px")
    .attr("height", height + margin + "px")
    .append("g")
    .attr("transform", `translate(${margin}, ${margin})`);

  /* Add line into SVG */
  var line = d3
    .line()
    .x((d) => xScale(d.date))
    .y((d) => yScale(d.measurements));

  let lines = svg.append("g").attr("class", "lines");

  lines
    .selectAll(".line-group")
    .data(data)
    .enter()
    .append("g")
    .attr("class", "line-group")
    .on("mouseover", function (d, i) {
      svg
        .append("text")
        .attr("class", "title-text")
        .style("fill", color(i))
        .text(d.name)
        .attr("text-anchor", "middle")
        .attr("x", (width - margin) / 2)
        .attr("y", 5);
    })
    .on("mouseout", function (d) {
      svg.select(".title-text").remove();
    })
    .append("path")
    .attr("class", "line")
    .attr("d", (d) => line(d.values))
    .style("stroke", (d, i) => color(i))
    .style("opacity", lineOpacity)
    .on("mouseover", function (d) {
      d3.selectAll(".line").style("opacity", otherLinesOpacityHover);
      d3.selectAll(".circle").style("opacity", circleOpacityOnLineHover);
      d3.select(this)
        .style("opacity", lineOpacityHover)
        .style("stroke-width", lineStrokeHover)
        .style("cursor", "pointer");
    })
    .on("mouseout", function (d) {
      d3.selectAll(".line").style("opacity", lineOpacity);
      d3.selectAll(".circle").style("opacity", circleOpacity);
      d3.select(this).style("stroke-width", lineStroke).style("cursor", "none");
    });

  /* Add circles in the line */
  lines
    .selectAll("circle-group")
    .data(data)
    .enter()
    .append("g")
    .style("fill", (d, i) => color(i))
    .selectAll("circle")
    .data((d) => d.values)
    .enter()
    .append("g")
    .attr("class", "circle")
    .on("mouseover", function (d) {
      d3.select(this)
        .style("cursor", "pointer")
        .append("text")
        .attr("class", "text")
        .text(`${d.measurements}`)
        .attr("x", (d) => xScale(d.date) + 5)
        .attr("y", (d) => yScale(d.measurements) - 10);
    })
    .on("mouseout", function (d) {
      d3.select(this)
        .style("cursor", "none")
        .transition()
        .duration(duration)
        .selectAll(".text")
        .remove();
    })
    .append("circle")
    .attr("cx", (d) => xScale(d.date))
    .attr("cy", (d) => yScale(d.measurements))
    .attr("r", circleRadius)
    .style("opacity", circleOpacity)
    .on("mouseover", function (d) {
      d3.select(this)
        .transition()
        .duration(duration)
        .attr("r", circleRadiusHover);
    })
    .on("mouseout", function (d) {
      d3.select(this).transition().duration(duration).attr("r", circleRadius);
    });

  /* Add Axis into SVG */
  var xAxis = d3.axisBottom(xScale).ticks(5);
  var yAxis = d3.axisLeft(yScale).ticks(5);

  svg
    .append("g")
    .attr("class", "x axis")
    .attr("transform", `translate(0, ${height - margin})`)
    .call(xAxis);

  svg
    .append("g")
    .attr("class", "y axis")
    .call(yAxis)
    .append("text")
    .attr("y", 15)
    .attr("transform", "rotate(-90)")
    .attr("fill", "#000");
  console.log("made viz");
}

export default function viz(w, h) {
  return visualization(w, h);
}