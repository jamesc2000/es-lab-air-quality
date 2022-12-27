<script>
  // Everytime na gusto natin gamitin si chartjs for a component, eto eto mga need i import
  // tas need din sila i-register for some reason di q alam bakit haha
  import { Line } from "svelte-chartjs";

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

  ChartJS.register(
    Filler,  
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
  const ytemps = []; //to change
  
  const testData = {
    labels: xlabels, ytemps,
    datasets: [
      {
        data: [65, 59, 80, 81, 56, 55, 40],
        label: 'Live Air Quality',
        lineTension: 0.4,
        fill: true,
        backgroundColor: 'rgb(19, 248, 0, 0.3)',
        borderColor: 'rgb(35, 26, 136, 1)',
        borderCapStyle: 'butt',
        //borderDash: [],
        //borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgb(35, 26, 136)',
        pointBackgroundColor: 'rgb(8, 143, 143)',
        pointBorderWidth: 5,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgb(0, 0, 0)',
        pointHoverBorderColor: 'rgb(111, 143, 175)',
        pointHoverBorderWidth: 2,
        pointRadius: 2,
        pointHitRadius: 10,
        
        
      }
    ]
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
  <Line height="200" width="350" data={testData} options={{ responsive: true }} />
</div>
</section>

<style>
.chartContainer{
background-color: rgb(255, 255, 255);
border-radius: 15px;
padding: 25px;
}

</style>