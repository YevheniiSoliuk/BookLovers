function showLocation(position) {
	
}

function errorHandler(error) {
	var output = document.getElementById("geo");
	switch (error.code) {
		case error.PERMISSION_DENIED: 
			output.innerHTML = "User doesn't access data.";
			break;
		case error.POSITION_UNAVAILABLE: 
			output.innerHTML ="Localisation data is not access.";
			break;
		case error.TIMEOUT: 
			output.innerHTML = "Limit request time.";
			break;
		case error.UNKNOWN_ERROR: 
			output.innerHTML = "Unknown error.";
			break;
	}
}

function getLocation() {
	if (navigator.geolocation) 
	{
		var options = {timeout: 60000};
		navigator.geolocation.getCurrentPosition(showLocation,errorHandler,options);
		var wspolrzedne = new google.maps.LatLng(50.334363599999996,30.931984200000002);
		var opcjeMapy= {
			zoom:10,
			center: wspolrzedne,
			mapTypeId: google.maps.MapTypeId.ROADMAP
		};
		var mapa = new google.maps.Map(document.getElementById("map"), opcjeMapy);
	} 
	else 
	{ 
		alert("Your browser doesn't support geolocation!");
	}
}

function verifyField(field_id,objectRegex) {
	var objectField = document.getElementById(field_id);
	if(!objectRegex.test(objectField.value))  return (false);
	else return (true);
}

function verify(){ 
	var ok=true;
	var data;
	
	objectName = /^[A-ZŁŚ][a-ząęóśłżźćń]{1,20}(\s[A-ZŁŚ][a-ząęóśłżźćń]{1,20})?$/;   
	objectEmail = /(([\w_]+)-*\.?)+@[\w](([\w]+)-?_?\.?)+([a-z]{2,4})$/; 

	if (name.value === "")
	{
		document.getElementById("name").style["border"] = "3px red solid";
		document.getElementsByClassName("error")[0].style["marginBottom"] = "10px";
		document.getElementById("name_error").innerHTML = "Wright name!";
	}
	if (email.value === "")
	{
		document.getElementById("email").style["border"] = "3px red solid";
		document.getElementsByClassName("error")[1].style["marginBottom"] = "10px";
		document.getElementById("email_error").innerHTML="Wright email!";
	}
	if (subject.value === "")
	{
		document.getElementById("subject").style["border"] = "3px red solid";
		document.getElementsByClassName("error")[2].style["marginBottom"] = "10px";
		document.getElementById("subject_error").innerHTML="Wright subject!";
	}
	else
	{
		document.getElementById("subject").style["border"] = "1px #f5f5f4 solid";
		document.getElementsByClassName("error")[0].style["marginBottom"] = "0";
		document.getElementById("subject_error").innerHTML="";
	}
	if (mes.value === "")
	{
		document.getElementById("mes").style["border"] = "3px red solid";
		document.getElementsByClassName("error")[3].style["marginBottom"] = "10px";
		document.getElementById("mes_error").innerHTML="Wright subject!";
	}
	else 
	{
		document.getElementById("mes").style["border"] = "1px #f5f5f4 solid";
		document.getElementsByClassName("error")[0].style["marginBottom"] = "0";
		document.getElementById("mes_error").innerHTML="";
	}

	
	if (!verifyField("name", objectName))
	{
		ok=false;
		document.getElementById("name").style["border"] = "3px red solid";
		document.getElementsByClassName("error")[0].style["marginBottom"] = "10px";
		document.getElementById("name_error").innerHTML = "Wright the name correctly!";
	}
	else
	{
		document.getElementById("name").style["border"] = "1px #f5f5f4 solid";
		document.getElementsByClassName("error")[0].style["marginBottom"] = "0";
		document.getElementById("name_error").innerHTML="";
	} 

	if (!verifyField("email", objectEmail))
	{
		ok=false;
		document.getElementById("email").style["border"] = "3px red solid";
		document.getElementsByClassName("error")[1].style["marginBottom"] = "10px";
		document.getElementById("email_error").innerHTML="Wright email correctly!";
	}
	else
	{
		document.getElementById("email").style["border"] = "1px #f5f5f4 solid";
		document.getElementsByClassName("error")[1].style["marginBottom"] = "0";
		document.getElementById("email_error").innerHTML="";
	} 

	

	if(ok==true)
	{
		data="Data to send: \n";
		data+="Name: "+document.getElementById('name').value+"\n";
		data+="Email: "+document.getElementById('email').value+"\n";
		data+="Subject: "+document.getElementById('subject').value+"\n";
		data+="Message: "+document.getElementById('mes').value+"\n";

		document.getElementById("name").value = "";
		document.getElementById("email").value = "";
		document.getElementById("subject").value = "";
		document.getElementById("mes").value = "";

		if (window.confirm(data)) return true;
		else return false;
	}

	else return ok;
}

document.addEventListener('DOMContentLoaded', () => {
	getLocation();
});