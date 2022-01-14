import React from "react";

// Importing Plotly
import Plotly from "plotly.js-basic-dist-min";
import createPlotlyComponent from "react-plotly.js/factory";
const Plot = createPlotlyComponent(Plotly);

export default function PlotComponent({ data, title }) {
  return (
    <div className='col-md-4 text-center'>
      <div className='plot p-3'>
        <h1 className='title text-info'>{title}</h1>
        {data && (
          <Plot
            data={[
              {
                y: data,
                type: "line",
                marker: { color: "red" },
              },
            ]}
          />
        )}
      </div>
    </div>
  );
}
