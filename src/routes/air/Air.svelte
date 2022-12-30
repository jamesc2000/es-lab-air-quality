<script>
  // Everytime na gusto natin gamitin si chartjs for a component, eto eto mga need i import
  // tas need din sila i-register for some reason di q alam bakit haha
  import { Line } from "svelte-chartjs";
  import annotationPlugin from 'chartjs-plugin-annotation';
  import {
    Chart as ChartJS,
    Filler,
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale,
  } from 'chart.js';
	import Chart from "svelte-chartjs/Chart.svelte";

  ChartJS.register(
    Filler,
    annotationPlugin,  
    Title,
    Tooltip,
    Legend,
    LineElement,
    LinearScale,
    PointElement,
    CategoryScale
  );

  // Etong testData parang mock data lang cinopy paste q lang dito haha
  // https://codesandbox.io/s/github/SauravKanchan/svelte-chartjs/tree/master/sandboxes/line

  const xlabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July' , 'August']; //to change
  const ylabels = []; //to change
  
  const chartData = {
    labels: xlabels, ylabels,
    datasets: [{
             data: [65, 59, 80, 81, 56, 55, 40],
             label: 'Live Air Quality',
             lineTension: 0.4,
             fill: true,
             backgroundColor: 'rgb(40, 67, 135, 0.3)',
             borderColor: 'rgb(35, 26, 136, 1)',
             borderCapStyle: 'butt',
             //borderDash: [],
             //borderDashOffset: 0.0,
             borderJoinStyle: 'miter',
             pointBorderColor: 'rgb(35, 26, 136)',
             pointBackgroundColor: 'rgb(40, 67, 135)',
             pointBorderWidth: 5,
             pointHoverRadius: 5,
             pointHoverBackgroundColor: 'rgb(0, 0, 0)',
             pointHoverBorderColor: 'rgb(111, 143, 175)',
             pointHoverBorderWidth: 2,
             pointRadius: 2,
             pointHitRadius: 10,  
           }]
  }

  const options = {
  responsive: true,
  plugins: {
    autocolors: true,
    annotation: {
      annotations: {
        line1: {
          label1:{
            type: 'label',
            backgroundColor: 'rgba(245,245,245)',
            content: ['wqq']
          },
          type: 'line',
          yMin: 50,
          yMax: 50,
          borderColor: 'rgb(255, 99, 132)',
          borderWidth: 2,
        }

      }
      
    }
  }
}
</script>

<svelte:head>
	<title>Air Quality Monitoring</title>
	<meta name="description" content="Air Qulaity Monitoring" />
</svelte:head>

<section>
    <div class = "chartContainer">
  <!-- Yung Line component, eto na yung mismong chart mismo, kumbaga -->
  <!-- wrapper siya nung mga canvas canvas eme. Dito ang need nalang niya -->
  <!-- na parameters is yung "data" and "options" -->
  <Line height="200" width="350" data={chartData} options={options} />
</div>
</section>

<style>
.chartContainer{
background-color: rgb(255, 255, 255);
border-radius: 15px;
padding: 25px;
}

</style>