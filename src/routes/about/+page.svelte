<script>
	import Jlau from '$lib/images/CruzJL.png';
	import Jack from '$lib/images/LenizoJO.jpg';
	import Kristel from '$lib/images/PazKE.png';
	import Jeanne from '$lib/images/TulingJR.png';
	import Theron from '$lib/images/BuenoTAA.jpg';
</script>

<svelte:head>
	<title>About Us</title>
	<meta name="description" content="About this app" />
</svelte:head>

<div class="text-column">
	<div class = "box">
		
	</div>
	<h1 class = "title1">About This System</h1>

	<p>
 	The purpose of this research is to develop an automated system for monitoring and forecasting the risk of dengue outbreaks in the Philippines using IOT Oviposition Traps. The main contribution of the study is the development of a method for automatically counting eggs and pupae in the traps, as well as a web portal to help the public become more aware of the presence of mosquitos in their area and take preventive measures against mosquito-borne diseases. The main problems addressed by the research are the labor-intensive nature of current manual mosquito trap-based monitoring systems, and the difficulty of forecasting dengue cases using data from hospital records alone.
	</p>

	<h1 class = "title">Meet Our Team</h1>
	<div class="Team">
		<div class="row">
			<div class="col-lg-5">
				<div class="card">
					<div class="img1"><img src={Theron} alt=""> </div>
					<div class="profile-text">
						<h2>Theron Adrianne A. Bueno</h2>
						<h3>2019-10752</h3>
					</div>
				</div>
			</div>
			<div class="col-lg-5">
				<div class="card">
					<div class="img1"><img src={Jlau} alt=""> </div>
					<div class="profile-text">
						<h2>James Laurence A. Cruz</h2>
						<h3>2019-02106</h3>
					</div>
				</div>
			</div>
			<div class="col-lg-5">
				<div class="card">
					<div class="img1"><img src={Jack} alt=""> </div>
					<div class="profile-text">
						<h2>Jackilyn O. Lenizo</h2>
						<h3>2019-02194</h3>
					</div>
				</div>
			</div>
			<div class="col-lg-5">
				<div class="card">
					<div class="img1"><img src={Kristel} alt=""> </div>
					<div class="profile-text">
						<h2>Kristel Erica D. Paz</h2>
						<h3>2019-02198</h3>
					</div>
				</div>
			</div>
			<div class="col-lg-5">
				<div class="card">
					<div class="img1"><img src={Jeanne} alt=""> </div>
					<div class="profile-text">
						<h2>Jeanne Rose P. Tuling</h2>
						<h3>2019-20396</h3>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<style>
.title1{
	font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
	font-weight: 500;
	font-size: 50px;
	text-align: left;
	position: relative;
}
.title{
	color: #ff3e00;
	font-weight: bold;
}
.Team .card {
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.5);
    overflow: hidden;
	border-radius: 10px;
    margin-bottom: 40px;
	margin-left: 90px;
	margin-right: 90px;
    transition: 0.3s;
}

.img1 img{
    position: relative;
    display: block;
    margin-left: auto;
    margin-right: auto;
    margin-top: 60px;
    margin-bottom: 20px;
    z-index: 1;
    width: 200px;
    height: 200px;
    border-radius: 50%;
    border: 7px solid rgb(255, 62, 0);
}

.profile-text{
    padding: 10px;
    text-align: center;
}

h2{
    font-weight: bold;
    font-size: 20px;
    margin: 0 0 5px;
}

h3{
    font-size: 17px;
    padding: 0 20px;
    color: #ff3e00;
}
</style>
