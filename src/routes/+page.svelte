<script>
  import "../util/initFirebase";
  import Manuscript from "$lib/Group-4-Manuscript.pdf";
  import aqmLogo from '$lib/images/aqmLogo.png';

  let typewriterText = "";
    const subtitles = [
        "Easily keep track of the air quality in your location!",
        "A system that can help us breathe healthy and be healthy!"
    ];
    let currentSubtitle = 0;
    function typeChar(currText, goalText) {
        if (currText.length < goalText.length) {
            typewriterText = currText + goalText[currText.length];
        }
    }
    function deleteChar(currText, goalText) {
        if (currText.length > goalText.length) {
            typewriterText = typewriterText.slice(0, typewriterText.length-1);
        }
    }
    function erase() {
        for (let i = 0; i < subtitles[currentSubtitle].length; i++) {
            setTimeout(() => {
                deleteChar(typewriterText, "");
                if (typewriterText.length === 0) {
                    currentSubtitle = (currentSubtitle + 1) % subtitles.length;
                    typeSubtitle();
                }
            }, 40 * (i+1));
        }
    }
    function typeSubtitle() {
        for (let i = 0; i < subtitles[currentSubtitle].length; i++) {
            setTimeout(() => {
                typeChar(typewriterText, subtitles[currentSubtitle]);
                if (typewriterText.length === subtitles[currentSubtitle].length) {
                    setTimeout(() => {
                        erase();
                    }, 5*1000);
                }
            }, 120 * (i+1));
        }
    }
    typeSubtitle();

</script>

<svelte:head>
  <title>IoT-based Air Quality Monitoring System</title>
  <meta name="description" content="IoT-based Air Quality Monitoring System" />
</svelte:head>



<section>
  <!-- <div class="logo"><img src={aqmLogo} alt="AQM Logo"></div> -->
  <div class="hero">
    <img class="logo" src={aqmLogo} alt="AQM Logo">
    <span class="subtitle">
        {typewriterText}
    </span>
  </div>

<div class="description">
  <h1 class="h1">IoT-based Air Quality Monitoring System</h1>
  <p>
    Our system uses the ESP32 microcontroller and the MQ 135 air quality sensor to monitor the air quality of a specific area in real-time. The data collected by the sensor is then visualized using Svelte and Chart.js on a web-based platform and stored in a Firebase database for future reference.
  </p>
  <p>
    With this system, you can easily keep track of the air quality in your home, office, or any other location, and take necessary precautions to ensure the air you breathe is clean and safe.
  </p>
  <p>
    Thank you for using our system. We hope it helps you maintain healthy air quality and improve your overall well-being.
  </p>
</div>

<div class="resources">
  <h1 class="h1">Resources</h1>
  <a href={Manuscript}>Full Research Paper</a>
  <a href="about">About</a>
</div>

</section>


<style>
  .hero {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 40px;
    margin-bottom: 3em;
    margin-left: auto;
    margin-right: auto;
    height: 270px;
    width: 100%;
  }

  .logo{
    /* width: 100%; */
    /* padding-top: 10px;
    padding-bottom: 10px; */
    height: 250px;
    /* scale: 1; */
    align-items: center;
    position: relative;
    
  }
  .subtitle{
  font-weight: bold;
  font-size: 20px;
  }
  .description {
    background-color: #fafafa;
    color: #333;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 1em;
    text-align: center;
  }

  .h1 {
    font-size: 2.5em;
    margin: 0.5em 0;
  }

  .description p {
    text-align: center;
    font-size: 1.1em;
    line-height: 1.5;
    margin: 0.5em 0;
    max-width: 40em;
  }

  .resources {
    background-color: #fafafa;
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
