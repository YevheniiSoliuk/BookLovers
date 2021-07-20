var booklist = []; 
var total_sum = 0;
var total_items = 0;

function showBasket() {
	booklist = JSON.parse(sessionStorage.getItem('books-in-cart'));

	basket = document.getElementsByClassName("basket_cart-list")[0];
	basket.innerHTML = "";

	document.getElementsByClassName("basket_empty")[0].innerHTML = "";

	document.getElementById("basket_books-cart").classList.toggle("visible");

	if(booklist === null)
		document.getElementsByClassName("basket_empty")[0].innerHTML = "No products in the cart.";
	else
	{
		for(var i = 0; i < booklist.length; i++)
		{
			basket.innerHTML += `
				<li id="cart_item" class="cart cart${booklist[i].id}">
				<img src="${booklist[i].img}" alt="image${booklist[i].id}" class="cart-book-image">
				<div class="cart-book-info">
				<a href='#' class="cart-book-title"> ${booklist[i].title} </a> 
				<span onclick="deleteItem(${booklist[i].id})"></span>
				<p class="cart-book-price"><em>1 x </em>$${booklist[i].price} </p>
				</div></li>
			`;
		}
		document.getElementById("basket_cart-total").innerHTML = 
			   `<p class="total-price">Subtotal: <em id="price_value">$${total_sum}</em></p>
			<button id="checkout" class="btn" onclick="order()">CHECKOUT</button>
			<button id="delete_all" class="btn" onclick="deleteAll()">DELETE ALL</button>`;
	}
}

function addToCart(book_id) {
	booklist = JSON.parse(sessionStorage.getItem('books-in-cart'));
	books = JSON.parse(localStorage.getItem('books'));
	if(booklist === null) booklist = [];
	booklist.push(books[book_id]);
	sessionStorage.setItem("books-in-cart", JSON.stringify(booklist));

	total_sum += parseFloat(books[book_id].price);
	total_sum.toFixed(2);
	total_items += 1;

	items_counter.innerHTML = `${total_items}`;

	showCart();
}

function deleteItem(id) {
	books = JSON.parse(localStorage.getItem('books'));
	booklist = JSON.parse(sessionStorage.getItem('books-in-cart'));
	booklist.forEach(function(item, index) {
		if(parseInt(item.id) === id) 
		{
			booklist.splice(index, 1);
		}
	})
	
	sessionStorage.setItem('books-in-cart', JSON.stringify(booklist));

	
	if(booklist.length === 0)
	{
		document.getElementsByClassName("cart-total")[0].innerHTML = "";
		document.getElementById("basket_cart-total").innerHTML = "";
		document.getElementsByClassName("empty")[0].innerHTML = "No products in the cart.";
		document.getElementsByClassName("basket_empty")[0].innerHTML = "No products in the cart.";
		sessionStorage.clear();
		total_sum = 0;
	}
	else 
	{
		
		total_sum -= parseFloat(books[id].price);
		total_sum.toFixed(2);
	}
	total_items -= 1;
	items_counter.innerHTML = `${total_items}`;

	showCart();
	showBasket();

}

function deleteAll() {
	sessionStorage.clear();
	document.getElementsByClassName("cart-total")[0].innerHTML = "";
	document.getElementById("basket_cart-total").innerHTML = "";

	showCart();
	showBasket();

	total_sum = 0;
	total_items = 0;
	items_counter.innerHTML = `${total_items}`;
}


function openLogin() {
	var login_email = document.getElementById("login_email").value;
	var password = document.getElementById("password").value;
	var isWrongLogin = true;
	var isWrongPassword = true;

	var users = JSON.parse(localStorage.getItem('users'));

	if (login_email === "" || password === "")
	{
		popup_login.style["height"] = "300px";
		document.getElementById("login_email").style["border"] = "2px red solid";
		document.getElementById("password").style["border"] = "2px red solid";
		document.getElementsByClassName("error")[0].style["marginBottom"] = "10px";
		document.getElementsByClassName("error")[1].style["marginBottom"] = "10px";
		document.getElementById("login_error").innerHTML = "Please, enter your login or email.";
		document.getElementById("password_error").innerHTML = "Please, enter your password.";
	}
	else 
	{
		
		users.forEach(function(user){
			if(user.login === login_email || user.email === login_email)
			{
				isWrongLogin = false;
			}
			if((user.login === login_email || user.email === login_email) && user.password === password)
			{
				isWrongLogin = false;
				isWrongPassword = false;
			}
		});

		if(isWrongLogin === true)
		{
			popup_login.style["height"] = "300px";
			document.getElementById("login_email").style["border"] = "2px red solid";
			document.getElementsByClassName("error")[0].style["marginBottom"] = "10px";
			document.getElementById("login_error").innerHTML = "User doesn't sign up!";
		}
		else if(isWrongPassword === true)
		{
			popup_login.style["height"] = "300px";
			document.getElementById("password").style["border"] = "2px red solid";
			document.getElementsByClassName("error")[1].style["marginBottom"] = "10px";
			document.getElementById("password_error").innerHTML = "Password is incorrect!";
		}
		else
		{
			alert("You succesfully login to website!");
			closeLogin();
		}
		
	}	
}



function openSign() {
	var sign_name = document.getElementById("sign_name").value;
	var sign_lastname = document.getElementById("sign_lastname").value;
	var sign_email = document.getElementById("sign_email").value;
	var sign_login = document.getElementById("sign_login").value;
	var password = document.getElementById("sign_password").value;
	var sign_phone = document.getElementById("phone").value;
	var sign_country = document.getElementById("country").value;
	var sign_sex = document.getElementsByName("sex");
	var sign_genre = document.getElementsByName("genre");

	var users = JSON.parse(localStorage.getItem('users'));
	var isVerify = false;

	nameRegx = /^[A-ZŁŚ][a-ząęóśłżźćń]{1,20}(\s[A-ZŁŚ][a-ząęóśłżźćń]{1,20})?$/;
	emailRegx = /(([\w_]+)-*\.?)+@[\w](([\w]+)-?_?\.?)+([a-z]{2,4})$/;
	phoneRegx = /^[0-9]{2}-[0-9]{3}-[0-9]{3}-[0-9]{3}$/;

	if (sign_name === "")
	{
		popup_sign.style["height"] = "750px";
		document.getElementById("sign_name").style["border"] = "2px red solid";
		document.getElementsByClassName("error")[0].style["marginBottom"] = "10px";
		document.getElementById("name_error").innerHTML = "Please, enter your name.";
	}
	else if (!nameRegx.test(sign_name))
	{
		document.getElementById("sign_name").style["border"] = "2px red solid";
		document.getElementsByClassName("error")[0].style["marginBottom"] = "10px";
		document.getElementById("name_error").innerHTML="Enter name, correctly!";
	}
	else {
		document.getElementById("sign_name").style["border"] = "1px #f5f5f4 solid";
		document.getElementById("name_error").innerHTML = "";
		isVerify = true;
	}


	if (sign_lastname === "")
	{
		popup_sign.style["height"] = "750px";
		document.getElementById("sign_lastname").style["border"] = "2px red solid";
		document.getElementsByClassName("error")[1].style["marginBottom"] = "10px";
		document.getElementById("lastname_error").innerHTML = "Please, enter your lastname.";
	}
	else if (!nameRegx.test(sign_lastname))
	{
		document.getElementById("sign_lastname").style["border"] = "2px red solid";
		document.getElementsByClassName("error")[1].style["marginBottom"] = "10px";
		document.getElementById("lastname_error").innerHTML="Enter lastname, correctly!";
	}
	else {
		document.getElementById("sign_lastname").style["border"] = "1px #f5f5f4 solid";
		document.getElementById("lastname_error").innerHTML = "";
		isVerify = true;
	}


	if (sign_email === "")
	{
		popup_sign.style["height"] = "750px";
		document.getElementById("sign_email").style["border"] = "2px red solid";
		document.getElementsByClassName("error")[2].style["marginBottom"] = "10px";
		document.getElementById("email_error").innerHTML = "Please, enter your email.";
	}
	else if (!emailRegx.test(sign_email))
	{
		document.getElementById("sign_email").style["border"] = "2px red solid";
		document.getElementsByClassName("error")[2].style["marginBottom"] = "10px";
		document.getElementById("email_error").innerHTML="Enter email, correctly!";
	}
	else {
		document.getElementById("sign_email").style["border"] = "1px #f5f5f4 solid";
		document.getElementById("email_error").innerHTML = "";
		isVerify = true;
	}

	if (sign_login === "")
	{
		popup_sign.style["height"] = "750px";
		document.getElementById("sign_login").style["border"] = "2px red solid";
		document.getElementsByClassName("error")[3].style["marginBottom"] = "10px";
		document.getElementById("login_error").innerHTML = "Please, enter login.";
	}
	else {
		document.getElementById("sign_login").style["border"] = "1px #f5f5f4 solid";
		document.getElementById("login_error").innerHTML = "";
		isVerify = true;
	}

	if (password === "")
	{
		popup_sign.style["height"] = "750px";
		document.getElementById("sign_password").style["border"] = "2px red solid";
		document.getElementsByClassName("error")[4].style["marginBottom"] = "10px";
		document.getElementById("password_error").innerHTML = "Please, enter password.";
	}
	else {
		document.getElementById("sign_password").style["border"] = "1px #f5f5f4 solid";
		document.getElementById("password_error").innerHTML = "";
		isVerify = true;
	}

	if (sign_phone === "")
	{
		popup_sign.style["height"] = "750px";
		document.getElementById("phone").style["border"] = "2px red solid";
		document.getElementsByClassName("error")[5].style["marginBottom"] = "10px";
		document.getElementById("phone_error").innerHTML = "Please, enter phone number.";
	}
	else if (!phoneRegx.test(sign_phone))
	{
		document.getElementById("phone").style["border"] = "2px red solid";
		document.getElementsByClassName("error")[5].style["marginBottom"] = "10px";
		document.getElementById("phone_error").innerHTML = "Enter phone number, like show placeholder.";
	}
	else {
		document.getElementById("phone").style["border"] = "1px #f5f5f4 solid";
		document.getElementById("phone_error").innerHTML = "";
		isVerify = true;
	}

	var radio_checked = "";

	for(var i = 0; i<sign_sex.length; i++)
	{
		if(sign_sex[i].checked)
		{
			document.getElementById("sex_field").style["border"] = "1px #f5f5f4 solid";
			document.getElementById("sex_error").innerHTML = "";
			radio_checked = sign_sex[i].value;
			isVerify = true;
			break;
		}
		else
		{
			document.getElementById("sex_field").style["border"] = "2px red solid";
			document.getElementsByClassName("error")[6].style["marginBottom"] = "10px";
			document.getElementById("sex_error").innerHTML = "Choose sex.";
		}
	}

	var isChecked = false;
	var box_checked = "";

	for(var i = 0; i<sign_genre.length; i++)
	{
		if(sign_genre[i].checked)
		{
			isChecked = true;
			box_checked += sign_genre[i].value + ", ";
		}
	}

	if (isChecked === false)
	{
		document.getElementById("genre_field").style["border"] = "2px red solid";
		document.getElementsByClassName("error")[7].style["marginBottom"] = "10px";
		document.getElementById("genre_error").innerHTML = "Choose genre.";
	}
	else
	{
		document.getElementById("genre_field").style["border"] = "1px #f5f5f4 solid";
		document.getElementById("genre_error").innerHTML = "";
		isVerify = true;
	}

	var user = {};
	user.name = sign_name;
	user.lastname = sign_lastname;
	user.email = sign_email;
	user.login = sign_login;
	user.password = password;
	user.phone = sign_phone;
	user.country = sign_country;
	user.sex = radio_checked;
	user.genre = box_checked;

	if(isVerify === true)
	{
		users.push(user);
		localStorage.setItem("users", JSON.stringify(users));
	}
	
}

function closeLogin() {
	popup_login.classList.remove("visible");
}

function closeSign() {
	popup_sign.classList.remove("visible");
	popup_sign.style["height"] = "600px";
}

function payOrder() {
	var sign_name = document.getElementById("sign_name").value;
	var sign_lastname = document.getElementById("sign_lastname").value;
	var sign_email = document.getElementById("sign_email").value;
	var sign_phone = document.getElementById("phone").value;
	var postcode = document.getElementById("post_code").value;
	var city = document.getElementById("city").value;
	var street = document.getElementById("street").value;

	var isOk = false;

	nameRegx = /^[A-ZŁŚ][a-ząęóśłżźćń]{1,20}(\s[A-ZŁŚ][a-ząęóśłżźćń]{1,20})?$/;
	emailRegx = /(([\w_]+)-*\.?)+@[\w](([\w]+)-?_?\.?)+([a-z]{2,4})$/;
	phoneRegx = /^[0-9]{2}-[0-9]{3}-[0-9]{3}-[0-9]{3}$/;
	postcodeRegex = /^[0-9]{1,2}-[0-9]{1,3}$/;
	cityRegex = /^[a-zA-ZąćęłńóśżźĄĆĘŁŃÓŚŻŹ\s]{2,50}$/;
	streetRegex = /^[a-zA-ZąćęłńóśżźĄĆĘŁŃÓŚŻŹ0-9\s]{2,50}$/;
	

	if (sign_name === "")
	{
		document.getElementById("sign_name").style["border"] = "2px red solid";
		document.getElementsByClassName("error")[0].style["marginBottom"] = "10px";
		document.getElementById("name_error").innerHTML = "Please, enter your name.";
	}
	else if (!nameRegx.test(sign_name))
	{
		document.getElementById("sign_name").style["border"] = "2px red solid";
		document.getElementsByClassName("error")[0].style["marginBottom"] = "10px";
		document.getElementById("name_error").innerHTML="Enter name, correctly!";
	}
	else {
		document.getElementById("sign_name").style["border"] = "1px #f5f5f4 solid";
		document.getElementById("name_error").innerHTML = "";
		isOk = true;
	}


	if (sign_lastname === "")
	{
		document.getElementById("sign_lastname").style["border"] = "2px red solid";
		document.getElementsByClassName("error")[1].style["marginBottom"] = "10px";
		document.getElementById("lastname_error").innerHTML = "Please, enter your lastname.";
	}
	else if (!nameRegx.test(sign_lastname))
	{
		document.getElementById("sign_lastname").style["border"] = "2px red solid";
		document.getElementsByClassName("error")[1].style["marginBottom"] = "10px";
		document.getElementById("lastname_error").innerHTML="Enter lastname, correctly!";
	}
	else {
		document.getElementById("sign_lastname").style["border"] = "1px #f5f5f4 solid";
		document.getElementById("lastname_error").innerHTML = "";
		isOk = true;
	}


	if (sign_email === "")
	{
		document.getElementById("sign_email").style["border"] = "2px red solid";
		document.getElementsByClassName("error")[2].style["marginBottom"] = "10px";
		document.getElementById("email_error").innerHTML = "Please, enter your email.";
	}
	else if (!emailRegx.test(sign_email))
	{
		document.getElementById("sign_email").style["border"] = "2px red solid";
		document.getElementsByClassName("error")[2].style["marginBottom"] = "10px";
		document.getElementById("email_error").innerHTML="Enter email, correctly!";
	}
	else {
		document.getElementById("sign_email").style["border"] = "1px #f5f5f4 solid";
		document.getElementById("email_error").innerHTML = "";
		isOk = true;
	}

	if (sign_phone === "")
	{
		document.getElementById("phone").style["border"] = "2px red solid";
		document.getElementsByClassName("error")[5].style["marginBottom"] = "10px";
		document.getElementById("phone_error").innerHTML = "Please, enter phone number.";
	}
	else if (!phoneRegx.test(sign_phone))
	{
		document.getElementById("phone").style["border"] = "2px red solid";
		document.getElementsByClassName("error")[5].style["marginBottom"] = "10px";
		document.getElementById("phone_error").innerHTML = "Enter phone number, like show placeholder.";
	}
	else {
		document.getElementById("phone").style["border"] = "1px #f5f5f4 solid";
		document.getElementById("phone_error").innerHTML = "";
		isOk = true;
	}


	if (postcode === "")
	{
		document.getElementById("post_code").style["border"] = "2px red solid";
		document.getElementsByClassName("error")[5].style["marginBottom"] = "10px";
		document.getElementById("post_code_error").innerHTML = "Please, enter phone number.";
	}
	else if (!postcodeRegex.test(postcode))
	{
		document.getElementById("post_code").style["border"] = "2px red solid";
		document.getElementsByClassName("error")[5].style["marginBottom"] = "10px";
		document.getElementById("post_code_error").innerHTML = "Enter your postcode correctly.";
	}
	else {
		document.getElementById("post_code").style["border"] = "1px #f5f5f4 solid";
		document.getElementById("post_code_error").innerHTML = "";
		isOk = true;
	}

	if (city === "")
	{
		document.getElementById("city").style["border"] = "2px red solid";
		document.getElementsByClassName("error")[5].style["marginBottom"] = "10px";
		document.getElementById("city_error").innerHTML = "Please, enter phone number.";
	}
	else if (!cityRegex.test(city))
	{
		document.getElementById("city").style["border"] = "2px red solid";
		document.getElementsByClassName("error")[5].style["marginBottom"] = "10px";
		document.getElementById("city_error").innerHTML = "Enter your city correctly.";
	}
	else {
		document.getElementById("city").style["border"] = "1px #f5f5f4 solid";
		document.getElementById("city_error").innerHTML = "";
		isOk = true;
	}

	if (street === "")
	{
		document.getElementById("street").style["border"] = "2px red solid";
		document.getElementsByClassName("error")[5].style["marginBottom"] = "10px";
		document.getElementById("street_error").innerHTML = "Please, enter phone number.";
	}
	else if (!streetRegex.test(street))
	{
		document.getElementById("street").style["border"] = "2px red solid";
		document.getElementsByClassName("error")[5].style["marginBottom"] = "10px";
		document.getElementById("street_error").innerHTML = "Enter your street correctly.";
	}
	else {
		document.getElementById("street").style["border"] = "1px #f5f5f4 solid";
		document.getElementById("street_error").innerHTML = "";
		isOk = true;
	}


	if(isOk === true)
	{
		alert("Order succesfully paid");
	}
}

function order() {
	var order_list = JSON.parse(sessionStorage.getItem('books-in-cart'));

	document.getElementsByClassName("books-inner")[0].innerHTML = `
			<h2 class="order_title">Order</h2>
			<form class="sign_form">
				<div class="first_part">
					<label for="sign_name">Name</label>
					<input id="sign_name" class="sign_field" required>
	        		<div id="name_error" class="error"></div>

	        		<label for="sign_lastname">Last Name</label>
					<input id="sign_lastname" class="sign_field" required>
	        		<div id="lastname_error" class="error"></div>

				    <label for="sign_email">Email</label>
					<input id="sign_email" class="sign_field" placeholder="user@gmail.com" required>
	        		<div id="email_error" class="error"></div>

	        		<label for="phone">Phone</label>
					<input id="phone" class="sign_field" placeholder="48-098-098-098" required>
	        		<div id="phone_error" class="error"></div>

	        		<label for="post_code">Postcode</label>
	        		<input id="post_code" class="sign_field" required>
	        		<div id="post_code_error" class="error"></div>
        		</div>
        		<div class="second_part">
        			<label for="country">Select country</label>
        			<select size="1" id="country" class="sign_field" required>    
                        <option value="pl" selected="selected">Poland</option>
                        <option value="gb">UK</option>
                        <option value="ukr">Ukraine</option>
                        <option value="usa">USA</option>
                    </select>

                    <label for="city">City</label>
					<input id="city" class="sign_field" required>
	        		<div id="city_error" class="error"></div>

	        		<label for="street">Street</label>
					<input id="street" class="sign_field" required>
	        		<div id="street_error" class="error"></div>

                    <label for="notes">Order notes</label>
                    <textarea id="notes" class="sign_field"></textarea>
        		</div>
        		<div class="third_part">
        			<table class="order_table">
        				<thead>
        					<td>Product</td>
        					<td>Price</td>
        				</thead>`

    for(var i = 0; i < order_list.length; i++)
    {
    	document.getElementsByClassName("order_table")[0].innerHTML +=
		    			`<tr>
		    				<td>${order_list[i].title}</td>
		    				<td class="red">$${order_list[i].price}</td>
		    			</tr>
		    			`
    }

    document.getElementsByClassName("order_table")[0].innerHTML +=
        				`<tfoot>
        					<td class="total">Total</td>
        					<td class="red sum">$${total_sum}</td>
        				</tfoot>
        			</table>`
    document.getElementsByClassName("sign_form")[0].innerHTML +=
        		`</div>		
        		<input type="reset" class="reset_btn" value="RESET">
				<input type="submit" class="pay_btn" value="PAY" onclick="payOrder()">
			</form>
		`;
}

document.addEventListener('DOMContentLoaded', () => {
	sessionStorage.clear();

	var list = document.getElementsByClassName("nav-list")[0];
	var links = document.getElementsByClassName('link');

	for (var i = 0; i < links.length; i++)
	{
		console.log(links[i]);
		links[i].addEventListener("click", ()=>{
			var current = document.getElementsByClassName("active");
			
			current[0].className = current[0].classList.remove(" active");
			this.className += " active";
		})
	}

	items_counter.innerHTML = `${booklist.length}`;


	document.getElementById("login").addEventListener("click", ()=> {
		popup_login.classList.add("visible");
		popup_login.style["height"] = "240px";
		popup_login.innerHTML = `
			<a href="#" class="popup_close" onclick="closeLogin()"></a>
			<form class="login_form">
				<input id="login_email" class="login_field" placeholder="Login or Email">
        		<div id="login_error" class="error"></div>
        		<input type="password" id="password" class="login_field" placeholder="Password">
        		<div id="password_error" class="error"></div>
        		<input type="submit" class="login_btn" value="LOGIN" onclick="openLogin()">
			</form>
		`;
	});

	document.getElementById("sign").addEventListener("click", ()=> {
		popup_sign.classList.add("visible");
		popup_sign.innerHTML = `
			<a href="#" class="popup_close" onclick="closeSign()"></a>
			<form class="sign_form">
				<div class="first_part">
					<label for="sign_name">Name</label>
					<input id="sign_name" class="sign_field" required>
	        		<div id="name_error" class="error"></div>

	        		<label for="sign_lastname">Last Name</label>
					<input id="sign_lastname" class="sign_field" required>
	        		<div id="lastname_error" class="error"></div>

				    <label for="sign_email">Email</label>
					<input id="sign_email" class="sign_field" placeholder="user@gmail.com" required>
	        		<div id="email_error" class="error"></div>

	        		<label for="sign_login">Login</label>
					<input id="sign_login" class="sign_field" placeholder="User" required>
	        		<div id="login_error" class="error"></div>

	        		<label for="password">Password</label>
	        		<input type="password" id="sign_password" class="sign_field" required>
	        		<div id="password_error" class="error"></div>
        		</div>
        		<div class="second_part">
        			<label for="phone">Phone</label>
					<input id="phone" class="sign_field" placeholder="48-098-098-098" required>
	        		<div id="phone_error" class="error"></div>

        			<label for="country">Select country</label>
        			<select size="1" id="country" class="sign_field" required>    
                        <option value="pl" selected="selected">Poland</option>
                        <option value="gb">UK</option>
                        <option value="ukr">Ukraine</option>
                        <option value="usa">USA</option>
                    </select>

                    <label for="sex_field">Select sex</label>
                    <p id="sex_field" class="sign_field">
                    	<input type="radio" class="sex" name="sex" value="male"/> Male
                        <input type="radio" class="sex" name="sex" value="female"/> Female
                        <input type="radio" class="sex" name="sex" value="other"/> Other
                    </p>
                    <div id="sex_error" class="error"></div>

                    <label for="genre_field">Choose interesting genres of books</label>
                    <p id="genre_field" class="sign_field">
                    	<input type="checkbox" class="genre" name="genre" value="Best sellers"/> Best sellers
                    	<input type="checkbox" class="genre" name="genre" value="Award winners"/> Award winners
                    	<input type="checkbox" class="genre" name="genre" value="Audio books"/> Audio books
                    	<input type="checkbox" class="genre" name="genre" value="Biography"/> Biography
                        <input type="checkbox" class="genre" name="genre" value="Drama"/> Drama
                        <input type="checkbox" class="genre" name="genre" value="Romans"/> Romans
                        <input type="checkbox" class="genre" name="genre" value="Cookbooks"/> Cookbooks
                        <input type="checkbox" class="genre" name="genre" value="Other"/> Other
                    </p>
                    <div id="genre_error" class="error"></div>
        		</div>
        		<input type="reset" class="reset_btn" value="RESET">
				<input type="submit" class="sign_btn" value="SIGN UP" onclick="openSign()">
			</form>
		`;
	});
	
});