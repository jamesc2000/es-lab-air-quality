<script>
  import "../util/initFirebase";
  import Manuscript from "$lib/Lorem_ipsum.pdf";
</script>

<svelte:head>
  <title>IoT-based Air Quality Monitoring System</title>
  <meta name="description" content="IoT-based Air Quality Monitoring System" />
</svelte:head>

<section>
  <h1>IoT-based Air Quality Monitoring System</h1>
  <p>
    Our system uses the ESP32 microcontroller and the MQ 135 air quality sensor to monitor the air quality of a specific area in real-time. The data collected by the sensor is then visualized using Svelte and Chart.js on a web-based platform and stored in a Firebase database for future reference.
  </p>
  <p>
    With this system, you can easily keep track of the air quality in your home, office, or any other location, and take necessary precautions to ensure the air you breathe is clean and safe.
  </p>
  <p>
    Thank you for using our system. We hope it helps you maintain healthy air quality and improve your overall well-being.
  </p>
</section>

<div class="resources">
  <h1>Resources</h1>
  <a href={Manuscript}>Full Research Paper</a>
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

  .resources {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    margin: 1em 0;
  }

  .resources h1 {
    font-size: 2em;
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
