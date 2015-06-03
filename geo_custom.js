/*

	Raw JS example for those who prefer to work without frameworks
	
	Built for IE8 and up

*/

// Obtain your API key by signing up at www.alliescomputing.com
var api_key = "";
var geoip_url = "http://ws.postcoder.com/pcw/"+api_key+"/geolocate/ip/";


load(geoip_url, function(xhr) {

	geoip = JSON.parse(xhr.response);

	// uncomment to override the lookup to test
	//geoip.iso2code = "FR";
	//geoip.iso2code = "DE";
	//geoip.iso2code = "US";
	
	if (geoip.iso2code == "FR") {
		change_welcome_text("Bienvenue, Expédition en France coûte 5€",geoip.iso2code);
	}
	
	if (geoip.iso2code == "DE") {
		change_welcome_text("Willkommen, Versand nach Deutschland kostet 7€",geoip.iso2code);	
	}
	
	if (geoip.iso2code == "US") {
		change_welcome_text("Welcome, shipping to USA costs $10",geoip.iso2code);
	}
	
	
});

// example personalisation function
function change_welcome_text(text,country) {
	
	// create alert element
	alert_element = document.createElement("div");
	alert_element.setAttribute("class","alert alert-info");
	alert_element.setAttribute("role","alert");
	
	// add a flag to alert element
	alert_flag_element = document.createElement("span");
	alert_flag_element.setAttribute("class","flag-icon flag-icon-" + country.toLowerCase());
	alert_element.appendChild(alert_flag_element);
	
	// add alert text to alert element
	alert_element_text = document.createTextNode(text);
	alert_element.appendChild(alert_element_text);

	// insert alert element into DOM
	document.getElementById("country_welcome").appendChild(alert_element);

}

// helper function to simplify the XML Http Request
function load(url, callback) {
 	
	var xhr;
 
	if(typeof XMLHttpRequest !== 'undefined') xhr = new XMLHttpRequest();
	else {
		var versions = ["MSXML2.XmlHttp.5.0", 
						"MSXML2.XmlHttp.4.0",
						"MSXML2.XmlHttp.3.0", 
						"MSXML2.XmlHttp.2.0",
						"Microsoft.XmlHttp"]

		 for(var i = 0, len = versions.length; i < len; i++) {
			try {
				xhr = new ActiveXObject(versions[i]);
				break;
			}
			catch(e){}
		 } // end for
	}
 
	xhr.onreadystatechange = ensureReadiness;
 
	function ensureReadiness() {
		if(xhr.readyState < 4) {
			return;
		}
	 
		if(xhr.status !== 200) {
			return;
		}

		// all is well  
		if(xhr.readyState === 4) {
			callback(xhr);
		}           
	}
 
	xhr.open('GET', url, true);
	xhr.send('');
}