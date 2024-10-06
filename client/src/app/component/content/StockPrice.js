import React from 'react';
import Plot from 'react-plotly.js';

const StockChart = ({ yearsStock, stockPrices, companyName, country }) => {
  // Function to format numbers into billions or millions
  const formatValue = (val) => {
    if (val >= 1e9) {
      return `$${(val / 1e9).toFixed(2)}B`; // Convert to billions
    } else if (val >= 1e6) {
      return `$${(val / 1e6).toFixed(2)}M`; // Convert to millions
    } else {
      return `$${val.toFixed(2)}`; // Keep as is for smaller values
    }
  };

  return (
    <Plot
      data={[
        {
          x: yearsStock,
          y: stockPrices,
          mode: 'lines+markers',
          name: 'Stock Price (in USD)',
          line: {
            color: 'blue',
            width: 3,
            shape: 'spline',
            smoothing: 1.3,
          },
          marker: {
            symbol: 'circle',
            size: 10,
            color: 'blue',
            line: {
              width: 2,
              color: 'DarkSlateGrey',
            },
          },
          hovertemplate: '<b>Year:</b> %{x}<br><b>Stock Price:</b> %{customdata}<extra></extra>',
          customdata: stockPrices.map(formatValue),
        },
      ]}
      layout={{
        title: {
          text: `Stock Price for ${companyName} in ${country} (2015-2025)`,
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
            text: 'Value',
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
            x: yearsStock[yearsStock.length - 2],
            y: stockPrices[stockPrices.length - 2],
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
            x: yearsStock[yearsStock.length - 1],
            y: stockPrices[stockPrices.length - 1],
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

export default StockChart;

