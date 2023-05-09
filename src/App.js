import React, { useState } from 'react';
import { saveAs } from 'file-saver';
import { BarController, BarElement, CategoryScale, LinearScale, Title } from 'chart.js';
import { Chart } from 'chart.js';
import 'chartjs-adapter-date-fns';

import './App.css';

Chart.register(BarController, BarElement, CategoryScale, LinearScale, Title);


function App() {
  const [histogramData, setHistogramData] = useState([]);

  const fetchData = () => {
    fetch('https://www.terriblytinytales.com/test.txt')
      .then(response => response.text())
      .then(text => {
        const words = text.split(/\W+/); // Split text into words
        const frequency = {};
        for (const word of words) {
          if (word in frequency) {
            frequency[word] += 1;
          } else {
            frequency[word] = 1;
          }
        }
        const sortedWords = Object.keys(frequency).sort((a, b) => frequency[b] - frequency[a]); // Sort words by frequency of occurrence
        const topWords = sortedWords.slice(0, 20); // Select top 20 most occurring words
        const data = topWords.map(word => ({ x: word, y: frequency[word] })); // Convert data to chart format
        setHistogramData(data); // Update state with histogram data
      });
  };

  const exportData = () => {
    const csvData = 'Word,Frequency\n' + histogramData.map(d => `${d.x},${d.y}`).join('\n'); // Convert data to CSV format
    const blob = new Blob([csvData], { type: 'text/csv;charset=utf-8' });
    saveAs(blob, 'histogram.csv'); // Download CSV file
  };

  const chartRef = React.createRef();

  React.useEffect(() => {
    if (histogramData.length > 0) {
      
    const canvas = chartRef.current;
    const context = canvas.getContext('2d');
    let myChart;

    if (myChart) {
      myChart.destroy();
      myChart = null;
    }
    
    myChart = new Chart(context, {
        type: 'bar',
        data: {
          labels: histogramData.map(d => d.x),
          datasets: [
            {
              label: 'Word Frequency',
              data: histogramData.map(d => d.y),
              backgroundColor: 'rgba(255, 99, 132, 0.2)',
              borderColor: 'rgba(255, 99, 132, 1)',
              borderWidth: 1,
            },
          ],
        },
        options: {
          title: {
            display: true,
            text: '20 Most Occurring Words',
            fontSize: 20,
          },
          scales: {
            yAxes: [
              {
                ticks: {
                  beginAtZero: true,
                  precision: 0,
                },
              },
            ],
          },
        },
      });
    }
  }, [histogramData, chartRef]);

  return (
    <div className="App">
      <button className="submit-btn" onClick={fetchData}>Submit</button>
      {histogramData.length > 0 && (
        <>
          <canvas ref={chartRef} />
          <button onClick={exportData}>Export</button>
        </>
      )}
    </div>
  );
}

export default App;
