import React, { useState } from "react";

// Importing Plotly
import Plotly from "plotly.js-basic-dist-min";
import createPlotlyComponent from "react-plotly.js/factory";
import FullScreenPlot from "./FullScreenPlot";
const Plot = createPlotlyComponent(Plotly);

export default function PlotComponent({ data, title }) {
  const [myData, setMyData] = useState(data);
  const [open, setOpen] = useState(false);

  useState(() => {
    setMyData(data);
  }, [data]);

  return (
    <div className='plot'>
      {open && <FullScreenPlot data={data} setOpen={setOpen} title={title} />}
      {data && (
        <Plot
          data={[
            {
              y: data,
              type: "line",
              marker: { color: "red" },
            },
          ]}
          layout={{ width: 450, height: 400, title: `${title}` }}
        />
      )}
      <div className='btns'>
        <button className='btn btn-info'>PAUSE</button>
        <button onClick={() => setOpen(true)} className='btn btn-success'>
          FULL SCREEN
        </button>
      </div>
    </div>
  );
}
