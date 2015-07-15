# Geo IP Personalisation

Example of using IP address to location lookup from [Allies](https://www.alliescomputing.com) to insert a personal message for visitors from certain countries (France, Germany and USA in this example).

You can add new content using simple if statements:-

  if (geoip.iso2code == "US") {
		change_welcome_text("Welcome, shipping to USA costs $10",geoip.iso2code);
	}
