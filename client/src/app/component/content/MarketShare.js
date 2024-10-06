import React from 'react';
import Plot from 'react-plotly.js';

const SharesChart = ({ yearsShare, marketShares, companyName, country }) => {

  return (
    <Plot
      data={[
        {
          x: yearsShare,
          y: marketShares,
          mode: 'lines+markers',
          name: 'Market Share (in Percentage)',
          line: {
            color: 'yellow',
            width: 3,
            shape: 'spline',
            smoothing: 1.3,
          },
          marker: {
            symbol: 'circle',
            size: 10,
            color: 'yellow',
            line: {
              width: 2,
              color: 'DarkSlateGrey',
            },
          },
          hovertemplate: '<b>Year:</b> %{x}<br><b>Market Share:</b> %{y}<extra></extra>',
        },
      ]}
      layout={{
        title: {
          text: `Market Share for ${companyName} in ${country} (2015-2025)`,
          x: 0.5,
          xanchor: 'center',
          font: {
            size: 20,
            color: 'black',
            family: 'Verdana',
          },
        },
        xaxis: {
          title: {
            text: 'Year',
            font: {
              size: 15,
              color: 'black',
              family: 'Verdana',
            },
          },
          showgrid: true,
          gridwidth: 1,
          gridcolor: 'LightGray',
          tickmode: 'linear',
          dtick: 1,
          zeroline: false,
        },
        yaxis: {
          title: {
            text: 'Percentage',
            font: {
              size: 15,
              color: 'black',
              family: 'Verdana',
            },
          },
          showgrid: true,
          gridwidth: 1,
          gridcolor: 'LightGray',
          zeroline: false,
        },
        width: 900,
        height: 600,
        plot_bgcolor: 'rgba(240, 240, 240, 1)',
        paper_bgcolor: 'rgba(255, 255, 255, 1)',
        hovermode: 'x',
        legend: {
          title: {
            text: 'Legend',
            font: {
              size: 13,
              color: 'black',
              family: 'Verdana',
            },
          },
          orientation: 'h',
          yanchor: 'bottom',
          y: 1.02,
          xanchor: 'right',
          x: 1,
        },
        annotations: [
          {
            x: yearsShare[yearsShare.length - 2],
            y: marketShares[marketShares.length - 2],
            text: 'Most Recent Value',
            showarrow: true,
            arrowhead: 2,
            ax: 0,
            ay: -40,
            font: { size: 12, color: 'black' },
            arrowcolor: 'black',
            arrowsize: 1.5,
          },
          {
            x: yearsShare[yearsShare.length - 1],
            y: marketShares[marketShares.length - 1],
            text: 'Predicted Value',
            showarrow: true,
            arrowhead: 2,
            ax: 0,
            ay: -40,
            font: { size: 12, color: 'red' },
            arrowcolor: 'red',
            arrowsize: 1.5,
          },
        ],
      }}
    />
  );
};

export default SharesChart;

