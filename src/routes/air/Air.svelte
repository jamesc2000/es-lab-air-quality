<script>
	// Everytime na gusto natin gamitin si chartjs for a component, eto eto mga need i import
	// tas need din sila i-register for some reason di q alam bakit haha
	import aq1 from '$lib/images/aq1.png';
	import aq2 from '$lib/images/aq2.png';
	import aq3 from '$lib/images/aq3.png';
	import { Chart } from 'svelte-chartjs';
	import { onMount, onDestroy } from 'svelte';
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
		TimeScale,
		TimeSeriesScale,
		LineController,
		Decimation
	} from 'chart.js';

	import {
		getDatabase,
		onChildAdded,
		orderByKey,
		ref,
		query,
		off,
		limitToLast,
		get
	} from 'firebase/database';
	import { app } from '../../util/initFirebase';
	import { transformData } from './dataHelpers';
	import moment from 'moment';
	import 'chartjs-adapter-moment';
	import { getHourlyData, getDailyData } from './chartActions'

	ChartJS.register(
		Filler,
		annotationPlugin,
		Title,
		Tooltip,
		Legend,
		LineElement,
		LinearScale,
		PointElement,
		TimeScale,
		TimeSeriesScale,
		LineController,
		Decimation
	);

	// Etong testData parang mock data lang cinopy paste q lang dito haha
	// https://codesandbox.io/s/github/SauravKanchan/svelte-chartjs/tree/master/sandboxes/line

	let chart;
	// const xlabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August']; //to change
	// const ylabels = []; //to change

	let mockData = {
		data: [
			{
				x: moment().unix() * 1000,
				y: 0
			}
		]
	};

	function mockDataUpdates() {
		setTimeout(() => {
			chart.data.datasets[0].data.push({
				y: Math.random() * 50,
				x: moment().unix() * 1000
			});
			// mockData.data = temp;
			// console.log(mychart);
			// console.log(chart);
			chart.update();

			console.log('Push data');
			console.log(mockData.data);
			mockDataUpdates();
		}, 5000);
	}

	let chartData = {
		datasets: [
			{
				data: [],
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
				pointRadius: 0,
				pointHitRadius: 10
			}
		]
	};

	const options = {
		responsive: true,
		maintainAspectRatio: false,
		parsing: false,
		scales: {
			x: {
				type: 'time',
				ticks: {
					autoSkip: true,
					maxTicksLimit: 8
				},
				time: {
					round: 'minute',
					unit: 'minute'
				}
			},
			y: {
				title: {
					display: true,
					text: 'Value in ppm'
				}
			}
		},
		plugins: {
			autocolors: true,
			annotation: {
				annotations: {
					line1: {
						type: 'line',
						yMin: 400,
						yMax: 400,
						borderColor: 'rgba(39, 245, 62, 1)',
						borderWidth: 4,
					},
					line2: {
						type: 'line',
						yMin: 1000,
						yMax: 1000,
						borderColor: 'rgba(235, 245, 39, 1)',
						borderWidth: 4,
					},
					line3: {
						type: 'line',
						yMin: 2000,
						yMax: 2000,
						borderColor: 'rgba(255, 99, 132,1)',
						borderWidth: 4,
					},
					
				}

				
			}
		}
	};

	const db = getDatabase(app);

	let airQualityDataRef = query(ref(db, 'devices/james-esp32'), orderByKey(), limitToLast(100));

	function listenToDb() {
		airQualityDataRef = query(ref(db, 'devices/james-esp32'), orderByKey(), limitToLast(100));
		onChildAdded(airQualityDataRef, (res) => {
			// console.log(chart.data.datasets[0].data.length);
			try {
				chart.data.datasets[0].data.push(transformData(res.val()));
				chart.update();
			} catch (error) {
				console.error(error);
			}
		});
	}

	let currentTimeView = "live"

	function liveButtonHandler() {
		if (currentTimeView == "live") return; // If we're already on live, early return

		currentTimeView = "live";

		// Clear data in chart
		chart.data.datasets[0].data = [];
		chart.data.datasets[0].pointRadius = 0;

		// Get data
		listenToDb();
	}

	async function hourlyButtonHandler() {
		if (currentTimeView == "hourly") return; // If we're already on hourly, early return

		currentTimeView = "hourly";
		off(airQualityDataRef);

		// Get data once, don't listen for changes
		airQualityDataRef = query(ref(db, 'devices/james-esp32'), orderByKey());
		let currChartData = await get(airQualityDataRef);
		currChartData = Object.values(currChartData.val());
		
		let hourlyData = getHourlyData(currChartData); // Pass current data to transformer
		// Clear data in chart
		chart.data.datasets[0].data = [];

		hourlyData.forEach(el => {
			chart.data.datasets[0].data.push({
				x: el.x.unix() * 1000,
				y: el.y
			});
		});

		chart.data.datasets[0].pointRadius = 2;
		chart.config.options.scales.x.time.round = "hour";
		chart.config.options.scales.x.time.unit = "hour";
		chart.update();
	}

	async function dailyButtonHandler() {
		if (currentTimeView == "daily") return; // If we're already on daily, early return

		currentTimeView = "daily";
		off(airQualityDataRef);

		// Get data once, don't listen for changes
		airQualityDataRef = query(ref(db, 'devices/james-esp32'), orderByKey());
		let currChartData = await get(airQualityDataRef);
		currChartData = Object.values(currChartData.val());
		
		let dailyData = getDailyData(currChartData); // Pass current data to transformer
		// Clear data in chart
		chart.data.datasets[0].data = [];

		dailyData.forEach(el => {
			chart.data.datasets[0].data.push({
				x: el.x.unix() * 1000,
				y: el.y
			});
		});

		chart.data.datasets[0].pointRadius = 2;
		chart.config.options.scales.x.time.round = "day";
		chart.config.options.scales.x.time.unit = "day";
		chart.update();
	}

	onMount(() => {
		if (currentTimeView == "live") {
			listenToDb();
		}
	});

	onDestroy(() => {
		// Clean up
		off(airQualityDataRef);
	});
</script>

<svelte:head>
	<title>Air Quality Monitoring</title>
	<meta name="description" content="Air Qulaity Monitoring" />
</svelte:head>

<section>
	<div class="chartContainer">
		<!-- Yung Line component, eto na yung mismong chart mismo, kumbaga -->
		<!-- wrapper siya nung mga canvas canvas eme. Dito ang need nalang niya -->
		<!-- na parameters is yung "data" and "options" -->
		<Chart bind:chart type="line" data={chartData} {options} />
	</div>
	<div class="chartButtons">
		<button class:active="{currentTimeView === 'live'}" on:click={liveButtonHandler}>Live</button>
		<button class:active="{currentTimeView === 'hourly'}" on:click={hourlyButtonHandler}>Hourly</button>
		<button class:active="{currentTimeView === 'daily'}" on:click={dailyButtonHandler}>Daily</button>
	</div>

	<div class = "ppm">
		<div class = "card">
			<div class="imgbx"><img src={aq1} width="150" height="150" alt=""></div>
			<h2 class="text">400 ppm:</h2>
			<h2 class="desc">Average outdoor air level</h2>
		</div>

		<div class = "card">
			<div class="imgbx"><img src={aq2} width="150" height="150" alt=""></div>
			<h2 class="text">400 -1000 ppm:</h2>
			<h2 class="desc">Typical level found in occupied spaces with good air exchange</h2>
		</div>

		<div class = "card">
			<div class="imgbx"><img src={aq3} width="150" height="150"alt=""></div>
			<h2 class="text">1000 - 2000 ppm:</h2>
			<h2 class="desc">Level associated with complaints of drowsiness and poor air</h2>
		</div>
		<h3 class="source"> from: https://www.dhs.wisconsin.gov/chemical/carbondioxide.htm </h3>
	</div>
</section>

<style>
	.chartContainer {
		background-color: rgb(255, 255, 255);
		border-radius: 15px;
		padding: 20px;
		height: 400px;
	}

	.ppm{
		position: relative;
		width: 100%;
		height: auto;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-wrap: wrap;
		margin-top: 2px;
		
	}

	.ppm .card{
		width: 25%;
		height: 250px;
		position: relative;
		background:rgb(255, 255, 255);
		margin: 15px 10px;
		padding: 20px;
		display: flex;
		flex-direction: column;
		transition: 0.3s ease-in-out;
		margin-top: 7%;
	}

	.ppm .card .imgbx{
		position: relative;
		top: -60px;
		left: 20%;
	}

	.ppm .card .imgbx img{
		max-width: 100%;
	}

	.imgbx:hover img{
		transform: scale(1.1);
	}

	.text{
		text-align: center;
		font-weight:900;
	}

	.desc{
		text-align: center;
	}

	.source{
		color: darkgrey;
	}

	.chartButtons {
		display: flex;
		flex-direction: row;
		margin-left: auto;
		margin-right: auto;

		align-items: center;
		justify-content: center;
	}

	.chartButtons > button {
		margin: 0.5rem 2rem;
		height: 2rem;
		padding-bottom: 1rem;
		transition: color 0.2s linear;
		border: none;
		cursor: pointer;
	}

	.chartButtons > button:hover {
		color: var(--color-theme-1); 
	}

	.chartButtons > .active {
		color: var(--color-theme-1);
		border-bottom: 5px solid var(--color-theme-1);
	}
</style>
