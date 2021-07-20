function getBooks(){
	fetch('data/books.json')
	.then((result) => result.json())
	.then((obj) => {
		let output = '';
		var books = [];
		obj.forEach(function(book){
			books.push(book);
			output += `
				<div class='book'>
				<img src="${book.img}" alt="image" class="book-image">
				<h3 class="book-title"> <a href='#' class="book-title"> ${book.title} </a></h3> 
				<p class="book-author"> ${book.author}</p>
				<p class="book-price"> $${book.price} </p>
				<button id="book_add" onclick="addToCart(${book.id})">ADD TO CART</button>
				</div>
			`;
		});
		localStorage.setItem("books", JSON.stringify(books));
		document.getElementsByClassName('books-content')[0].innerHTML = output;
	});
}

function showCart() {
	booklist = JSON.parse(sessionStorage.getItem('books-in-cart'));
	document.getElementsByClassName("empty")[0].innerHTML = "";

	cart_list = document.getElementsByClassName("cart-list")[0];
	cart_list.innerHTML = "";

	if(booklist === null)
		document.getElementsByClassName("empty")[0].innerHTML = "No products in the cart.";
	else
	{
		for(var i = 0; i < booklist.length; i++)
		{
			cart_list.innerHTML += `
				<li id="cart_item" class="cart cart${booklist[i].id}">
				<img src="${booklist[i].img}" alt="image${booklist[i].id}" class="cart-book-image">
				<div class="cart-book-info">
				<a href='#' class="cart-book-title"> ${booklist[i].title} </a> 
				<span onclick="deleteItem(${booklist[i].id})"></span>
				<p class="cart-book-price"><em>1 x </em>$${booklist[i].price} </p>
				</div></li>
			`;
		}
		document.getElementsByClassName("cart-total")[0].innerHTML = 
			`<p class="total-price">Subtotal: <em id="price_value">$${total_sum}</em></p>
			<button id="checkout" class="btn" onclick="order()">CHECKOUT</button>
			<button id="delete_all" class="btn" onclick="deleteAll()">DELETE ALL</button>`;
	}
}


function filter() {
	document.getElementById("filter-btn").addEventListener("click", ()=>{
		let from = document.getElementsByClassName("from")[0].value;
		let to = document.getElementsByClassName("to")[0].value;
		let output = '';

		if(from === '' || to === '')
			alert("Enter some values!");
		else 
		{
			for(var i = 0; i < localStorage.length; i++)
			{
				item = JSON.parse(localStorage.getItem(localStorage.key(i)));
				if(parseFloat(item.price) >= from && parseFloat(item.price) <= to)
				{
					output += `
						<div class='book'>
						<img src="${item.img}" alt="image" class="book-image">
						<h3 class="book-title"> <a href='#' class="book-title"> ${item.title} </a></h3> 
						<p class="book-author"> ${item.author}</p>
						<p class="book-price"> $${item.price} </p>
						<button id="book_add" onclick="addToCart(${item.id})">ADD TO CART</button>
						</div>
					`;
				}
			}
			document.getElementsByClassName('books-content')[0].innerHTML = output;
		}
		document.getElementsByClassName("from")[0].value = "";
		document.getElementsByClassName("to")[0].value = "";
	});
}


document.addEventListener("DOMContentLoaded", function() {
	getBooks();
	
	document.getElementsByClassName("empty")[0].innerHTML = "No products in the cart.";
	items_counter.innerHTML = `${total_items}`;
	filter();
});
