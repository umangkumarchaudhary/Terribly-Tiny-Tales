## Terrible-Tiny-Tale Task
This project is a web application that fetches a text file from a remote server, analyzes the frequency of words in the text, and displays a histogram of the top 20 most occurring words. It also provides an option to export the data as a CSV file.


## Components Used in this Project


- `App.js`: The main component that handles data fetching, word frequency analysis, and rendering the histogram.

- `App.css`: CSS file for styling the application.



## the libraries and plugins used in the code:

`React`: This is the JavaScript library for building user interfaces.

`file-saver`: This is a library that allows you to save files on the client-side. It is used to save the generated CSV file.

`chart.js`: This is a popular JavaScript charting library that provides various types of charts, including bar charts. It is used to create and display the bar chart.

`chartjs-adapter-date-fns`: This is a plugin for Chart.js that enables the use of date-fns library for parsing and formatting dates. It is used to adapt the chart to work with date values.


## Apart from these libraries and plugins, the code also imports specific components and elements from the Chart.js library:

`BarController`: It is a controller for bar charts in Chart.js.
`BarElement`: It represents a single bar in a bar chart.
`CategoryScale`: It is a scale type for categorical data.
`LinearScale`: It is a scale type for linear data.
`Title`: It represents the title of a chart.

## Code Explanation
The `App function` is defined, which is the main component of the React application.

Inside the `App function`, the `useState hook` is used to create a state variable histogramData and a function `setHistogramData` to update its value. The initial value of `histogramData` is an empty array [].

The `fetchData` function is defined. It makes a `GET` request to 'https://www.terriblytinytales.com/test.txt' to fetch a text file. When the response is received, the text is split into words using a regular expression (/\W+/). The frequency of each word is calculated and stored in the frequency object. The words are then sorted by frequency in descending order, and the top 20 words are selected. Finally, the data is converted into a chart format, and the `histogramData` state is updated with the chart data.

The `exportData function` is defined. It converts the `histogramData` into `CSV` format, creates a Blob object with the CSV data, and triggers the file download using saveAs from 'file-saver'.

A `chartRef` is created using `React.createRef()`. This ref will be used to reference the <canvas> element where the chart will be rendered.

The `useEffect` hook is used to run the chart creation logic whenever the histogramData or chartRef changes. Inside the hook, a new Chart object is created with the specified chart configuration and rendered on the <canvas> element.

The render function returns JSX elements that make up the UI of the app. It contains a <button> element with a click event handler that triggers the fetchData function when clicked. If the histogramData is not empty, it renders a <canvas> element for the chart and a <button> element with a click event handler that triggers the exportData function.

Finally, the App component is exported as the default export.

## output

![Screenshot (532)](https://github.com/umangkumarchaudhary/Terribly-Tiny-Tales/assets/88194464/dfc03a9b-0318-4652-a16b-b8052d88b152)
![Screenshot (533)](https://github.com/umangkumarchaudhary/Terribly-Tiny-Tales/assets/88194464/bb870f1b-ee8d-4690-9f73-1789ed9072ca)
