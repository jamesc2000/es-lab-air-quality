<script>
	// Everytime na gusto natin gamitin si chartjs for a component, eto eto mga need i import
	// tas need din sila i-register for some reason di q alam bakit haha
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
		limitToLast
	} from 'firebase/database';
	import { app } from '../../util/initFirebase';
	import { transformData } from './dataHelpers';
	import moment from 'moment';
	import 'chartjs-adapter-moment';

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
				pointRadius: 2,
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
				type: 'timeseries',
				ticks: {
					autoSkip: true,
					maxTicksLimit: 8
				},
				time: {
					round: 'minute'
				}
			},
			y: {
				title: {
					display: true,
					text: 'value'
				}
			}
		},
		plugins: {
			autocolors: true,
			annotation: {
				annotations: {
					line1: {
						label1: {
							type: 'label',
							backgroundColor: 'rgba(245,245,245)',
							content: ['wqq']
						},
						type: 'line',
						yMin: 50,
						yMax: 50,
						borderColor: 'rgb(255, 99, 132)',
						borderWidth: 2
					}
				}
			},
			decimation: {
				// TODO: Decimation not working, pero kung ayaw talaga wag nalang haha
				enabled: true,
				agorithm: 'lltb',
				samples: 10
			}
		}
	};

	const db = getDatabase(app);

	const airQualityDataRef = query(ref(db, 'devices/james-esp32'), orderByKey(), limitToLast(100));

	function listenToDb() {
		onChildAdded(airQualityDataRef, (res) => {
			console.log(chart.data.datasets[0].data.length);
			try {
				chart.data.datasets[0].data.push(transformData(res.val()));
				chart.update();
			} catch (error) {
				console.error(error);
			}
		});
	}

	listenToDb();
	onMount(() => {
		// get(child(db, "devices/james-esp32"))
		//   .then((s) => {
		//     if (s.exists()) {
		//       chart.data.datasets[0].data.push(transformData(s.val()));
		//     }
		//   });
		// mockDataUpdates();
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
		<Chart bind:chart type="line" height="200" width="350" data={chartData} {options} />
	</div>
</section>

<style>
	.chartContainer {
		background-color: rgb(255, 255, 255);
		border-radius: 15px;
		padding: 25px;
	}
</style>
