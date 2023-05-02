d3.json("samples.json").then(({ names }) => {
    names.forEach(id => {
      d3.select('select').append('option').text(id);
    });
  
    optionChanged();
  });
  
  const optionChanged = () => {
    let choice = d3.select('select').node().value;
  
    d3.json("samples.json").then(({ metadata, samples }) => {
      let meta = metadata.filter(obj => obj.id == choice)[0];
      let sample = samples.filter(obj => obj.id == choice)[0];
  
      d3.select('.panel-body').html('');
      Object.entries(meta).forEach(([key, val]) => {
        d3.select('.panel-body').append('h5').text(`${key.toUpperCase()}:¨${val}`)
      });
      console.log(sample);
  
      let { otu_ids, otu_labels, sample_values} = sample;
  
      var data = [      {        x: sample_values.slice(0,10).reverse(),        y: otu_ids.slice(0,10).reverse().map(x => `OTU ${x}`),        text: otu_labels.slice(0,10).reverse(),        type: 'bar',        orientation: 'h'      }    ];
            
      Plotly.newPlot('bar', data);
  
      var bubbles = [      {        x: otu_ids,        y: sample_values,        mode: 'markers',        marker: {          color: sample_values,          size: sample_values,          colorscale: 'Viridis'        },        text: otu_labels      }    ];
  
      var layout = {
        xaxis: { title: 'OTU IDs' },
        yaxis: { title: 'Sample Values' }
      };
  
      Plotly.newPlot('bubble', bubbles, layout);
  
      let age = meta.age;
  
      var dataGauge = [      {        domain: { x: [0, 1], y: [0, 1] },
          value: age,
          title: { text: "Belly Button Washing Frequency" },
          type: "indicator",
          mode: "gauge+number",
          gauge: {
            axis: { range: [null, 10] },
            bar: { color: "rgb(68,166,198)" },
            steps: [
              { range: [0, 1], color: "rgb(235, 247, 236)" },
              { range: [1, 2], color: "rgb(210, 240, 206)" },
              { range: [2, 3], color: "rgb(184, 233, 176)" },
              { range: [3, 4], color: "rgb(159, 226, 146)" },
              { range: [4, 5], color: "rgb(133, 219, 117)" },
              { range: [5, 6], color: "rgb(107, 212, 87)" },
              { range: [6, 7], color: "rgb(81, 205, 57)" },
              { range: [7, 8], color: "rgb(55, 198, 28)" },
              { range: [8, 9], color: "rgb(29, 191, 0)" },
              { range: [9, 10], color: "rgb(0, 184, 0)" }
            ],
            threshold: {
                line: { color: "red", width: 4 },
                thickness: 0.75,
                value: age
            }
            }
        }
        ];

        var layoutGauge = { width: 600, height: 450, margin: { t: 0, b: 0 } };
        Plotly.newPlot('gauge', dataGauge, layoutGauge);
    







    
    
});
}
