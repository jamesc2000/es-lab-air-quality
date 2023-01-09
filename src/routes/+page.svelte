<script>
	import welcome from '$lib/images/svelte-welcome.webp';
	import welcome_fallback from '$lib/images/svelte-welcome.png';
</script>

<svelte:head>
	<title>IOT Oviposition Trap for Dengue Outbreak Monitoring</title>
	<meta name="description" content="IOT Oviposition Trap for Dengue Outbreak Monitoring" />
</svelte:head>

<section>
	<h1>IOT Oviposition Trap for Dengue Outbreak Monitoring	</h1>
	<p>Our research aims to develop an automated system for monitoring and forecasting the risk of dengue outbreaks in the Philippines using IOT Oviposition Traps. The main contribution of the study is the development of a method for automatically counting eggs and pupae in the traps, as well as a web portal to help the public become more aware of the presence of mosquitos in their area and take preventive measures against mosquito-borne diseases.</p>
</section>

<div class="goals">
<h1>Goals</h1>

<ul>
  <li>Develop a method for automatically counting eggs and pupae in IOT Oviposition Traps</li>
  <li>Create a web portal to help the public become more aware of the presence of mosquitos in their area and take preventive measures against mosquito-borne diseases</li>
  <li>Automate the monitoring process to reduce labor intensity and provide a more comprehensive view of mosquito populations and dengue risk in a given area</li>
</ul>
</div>

<div class="resources">
<h1>Resources</h1>
  <a href="FinalManuscript.pdf">Full Research Paper</a>
  <a href="about">About</a>

</div>

<style>
* {
  background-color: #fafafa;
  color: #333;
}

section {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1em;
  text-align: center;
}

h1 {
  font-size: 2.5em;
  margin: 0.5em 0;
}

p {
  font-size: 1.1em;
  line-height: 1.5;
  margin: 0.5em 0;
  max-width: 40em;
}

.goals, .resources {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
  margin: 1em 0;
}

.goals h1, .resources h1 {
  font-size: 2em;
}

.goals ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.goals li {
  font-size: 1.1em;
  margin: 0.5em 0;
}

.resources a {
  display: inline-block;
  margin: 0.5em;
  padding: 0.5em 1em;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 1.1em;
  text-decoration: none;
  color: #333;
  transition: all 0.2s;
}

.resources a:hover {
  background-color: #ff3e00;
  color: #fff;
}

</style>
