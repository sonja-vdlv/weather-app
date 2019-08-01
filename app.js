window.addEventListener('load', () => {
	let long;
	let lat;
	const temperatureDescription = document.querySelector('.description');
	const temperatureDegree = document.querySelector('.degree');
	const locationTimezone = document.querySelector('.location-timezone');



	if(navigator.geolocation){
		navigator.geolocation.getCurrentPosition(position =>{
			console.log(position);
			long = position.coords.longitude;
			lat = position.coords.latitude;

			const api = `http://api.apixu.com/v1/current.json?key=bede18fedf5b429aada222052190108&q=${lat},${long}`;
			fetch(api)
				.then(response =>{
					return response.json();
				})
				.then(data =>{
					console.log(data);
					const temperature = data.current.temp_c;
					const conditions = data.current.condition.text;
					temperatureDegree.textContent = temperature;
					temperatureDescription.textContent = conditions;
					locationTimezone.textContent = data.location.name;
				})

				
		});

	} else {
		h1.textContent = 'this is not working';
	}

});





