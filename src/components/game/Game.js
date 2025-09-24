import { useEffect } from 'react';
import ApexCharts from 'apexcharts';
import background from "../../assets/wait.png";

const GameScreen = () => {
  useEffect(() => {
    const options = {
      series: [76, 67, 61, 90],
      chart: {
        height: 390,
        type: 'radialBar',
      },
      plotOptions: {
        radialBar: {
          offsetY: 0,
          startAngle: 0,
          endAngle: 270,
          hollow: {
            margin: 5,
            size: '30%',
            background: 'transparent',
            image: undefined,
          },
          dataLabels: {
            name: {
              show: false,
            },
            value: {
              show: false,
            }
          },
          barLabels: {
            enabled: true,
            useSeriesColors: true,
            offsetX: -8,
            fontSize: '16px',
            formatter: function(seriesName, opts) {
              return seriesName + ":  " + opts.w.globals.series[opts.seriesIndex]
            },
          },
        }
      },
      colors: ['#1ab7ea', '#0084ff', '#39539E', '#0077B5'],
      labels: ['Vi','M', 'F', 'L'],
      responsive: [{
        breakpoint: 480,
        options: {
          legend: {
            show: false
          }
        }
      }]
    };

    const chart = new ApexCharts(document.querySelector("#chart"), options);
    chart.render();

    return () => chart.destroy(); // cleanup on unmount
  }, []);

  return (
    <div
      style={{
        height: '100vh',
        width: '100vw',
        backgroundImage: `url(${background})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div id="chart"></div>
    </div>
  );
};

export default GameScreen;
