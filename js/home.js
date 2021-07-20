class DiscoverBooks {
	constructor(img="http://booklovers.ancorathemes.com/wp-content/uploads/2016/04/book2.jpg",
				 title="The forest", author="Allan Green", price="$15.05")
	{ 
		this.img = img;
		this.title = title;
		this.author = author;
		this.price = price;
	}

	show_book(id)
	{
		var data = "";
		data += "<div class='book'>"+
				"<img src=" + this.img + " alt='image "+ id +"' class='book-image'>" +
				"<h3 class='book-title'> <a href='#' class='book-title'>" + this.title + "</a></h3>" + 
				"<p class='book-author'>" + this.author+ "</p>" +
				"<p class='book-price'>" + this.price + "</p></div>";
		return data;
	}
}

function signUp()
{
	document.getElementById("sign-up_btn").addEventListener("click", ()=>{
		var email_clon = false;
		objectEmail = /(([\w_]+)-*\.?)+@[\w](([\w]+)-?_?\.?)+([a-z]{2,4})$/; 

		email = document.getElementById("sign-up_input").value;
		
		var email_list = JSON.parse(localStorage.getItem('emails'));
		if(email_list === null) email_list = [];

		if(email === "")
		{
			info.innerHTML = "Please enter your email.";
		}
		else if (!objectEmail.test(email))
		{
			info.innerHTML = "Wright email correctly!";
		}
		else
		{	
			for(var i = 0; i < email_list.length; i++)
			{
				if(email === email_list[i]) email_clon = true;
			}

			if(email_clon === false)
			{
				info.innerHTML = "";
				email_list.push(email);
				localStorage.setItem('emails', JSON.stringify(email_list));
			}
			else
			{
				info.innerHTML = "User with this e-mail already signs up.";
			}
		}
	});
}

document.addEventListener('DOMContentLoaded', () => {
	var discover_books_nav = "";
	discover_books_nav += "<nav class='books-navbar'>"+
							"<ul class='nav-list books-nav-list'>"+
								"<li id='releases' class='list-item list-item-text'>NEW RELEASES</li>"+
								"<li id='soon' class='list-item list-item-text'>COMING SOON</li>"+
								"<li id='sellers' class='list-item list-item-text'>BEST SELLERS</li>"+
								"<li id='winners' class='list-item list-item-text'>AWARD WINNERS</li>"+
							"</ul> </nav>";

	document.getElementsByClassName('discover-books_nav')[0].innerHTML = discover_books_nav;

	var books_nav_list = document.getElementsByClassName('books-nav-list')[0];
	var book_links = document.getElementsByClassName('list-item-text');

	for (var i = 0; i < book_links.length; i++)
	{
		book_links[i].addEventListener("click", ()=>{
			var current_link = document.getElementsByClassName(' active');
			current_link[0].className = current_link[0].className.replace(' active', '');
			this.className += ' active';
		})
	}
	

	var books = [new DiscoverBooks(),
					new DiscoverBooks("http://booklovers.ancorathemes.com/wp-content/uploads/2016/04/book3.jpg", "The Son", "Angelika Glow", "$10.20"),
					new DiscoverBooks("http://booklovers.ancorathemes.com/wp-content/uploads/2016/04/book4.jpg", "Life in the garden", "Antony Barton", "$11.45"),
					new DiscoverBooks("http://booklovers.ancorathemes.com/wp-content/uploads/2016/04/book5.jpg", "The long road to the deep Silence", "Richard Mann", "$15.99"),
					new DiscoverBooks("http://booklovers.ancorathemes.com/wp-content/uploads/2016/04/book12.jpg", "It's a really strange story", "Burt Geller", "$10.55"),
					new DiscoverBooks("http://booklovers.ancorathemes.com/wp-content/uploads/2016/04/books7.jpg", "Strom", "Richard Mann", "$10.20")];

	var book_item = document.getElementsByClassName('discover-books')[0];
	book_item.innerHTML = "";

	for(var i = 0; i < books.length; i++)
	{
		book_item.innerHTML += books[i].show_book(i);
	}
	
	releases.addEventListener("click", () => {
		var books = [new DiscoverBooks(),
					new DiscoverBooks("http://booklovers.ancorathemes.com/wp-content/uploads/2016/04/book3.jpg", "The Son", "Angelika Glow", "$10.20"),
					new DiscoverBooks("http://booklovers.ancorathemes.com/wp-content/uploads/2016/04/book4.jpg", "Life in the garden", "Antony Barton", "$11.45"),
					new DiscoverBooks("http://booklovers.ancorathemes.com/wp-content/uploads/2016/04/book5.jpg", "The long road to the deep Silence", "Richard Mann", "$15.99"),
					new DiscoverBooks("http://booklovers.ancorathemes.com/wp-content/uploads/2016/04/book12.jpg", "It's a really strange story", "Burt Geller", "$10.55"),
					new DiscoverBooks("http://booklovers.ancorathemes.com/wp-content/uploads/2016/04/books7.jpg", "Strom", "Richard Mann", "$10.20")];

		var book_item = document.getElementsByClassName('discover-books')[0];
		book_item.innerHTML = "";

		for(var i = 0; i < books.length; i++)
		{
			book_item.innerHTML += books[i].show_book(i);
		}
	});

	soon.addEventListener("click", () => {
		var books = [new DiscoverBooks(),
					new DiscoverBooks("http://booklovers.ancorathemes.com/wp-content/uploads/2016/04/book3.jpg", "The Son", "Angelika Glow", "$10.20"),
					new DiscoverBooks("http://booklovers.ancorathemes.com/wp-content/uploads/2016/04/book12.jpg", "It's a really strange story", "Burt Geller", "$10.55"),
					new DiscoverBooks("http://booklovers.ancorathemes.com/wp-content/uploads/2016/04/books7.jpg", "Strom", "Richard Mann", "$10.20")];

		var book_item = document.getElementsByClassName('discover-books')[0];
		book_item.innerHTML = "";

		for(var i = 0; i < books.length; i++)
		{
			book_item.innerHTML += books[i].show_book(i);
		}
	});

	sellers.addEventListener("click", () => {
		var books = [new DiscoverBooks(),
					new DiscoverBooks("http://booklovers.ancorathemes.com/wp-content/uploads/2016/04/book3.jpg", "The Son", "Angelika Glow", "$10.20"),
					new DiscoverBooks("http://booklovers.ancorathemes.com/wp-content/uploads/2016/04/book4.jpg", "Life in the garden", "Antony Barton", "$11.45"),
					new DiscoverBooks("http://booklovers.ancorathemes.com/wp-content/uploads/2016/04/book5.jpg", "The long road to the deep Silence", "Richard Mann", "$15.99"),
					new DiscoverBooks("http://booklovers.ancorathemes.com/wp-content/uploads/2016/04/book12.jpg", "It's a really strange story", "Burt Geller", "$10.55"),
					new DiscoverBooks("http://booklovers.ancorathemes.com/wp-content/uploads/2016/04/books7.jpg", "Strom", "Richard Mann", "$10.20")];

		var book_item = document.getElementsByClassName('discover-books')[0];
		book_item.innerHTML = "";

		for(var i = 0; i < books.length; i++)
		{
			book_item.innerHTML += books[i].show_book(i);
		}
	});

	winners.addEventListener("click", () => {
		var books = [new DiscoverBooks(),
					new DiscoverBooks("http://booklovers.ancorathemes.com/wp-content/uploads/2016/04/book4.jpg", "Life in the garden", "Antony Barton", "$11.45"),
					new DiscoverBooks("http://booklovers.ancorathemes.com/wp-content/uploads/2016/04/book5.jpg", "The long road to the deep Silence", "Richard Mann", "$15.99"),
					new DiscoverBooks("http://booklovers.ancorathemes.com/wp-content/uploads/2016/04/book12.jpg", "It's a really strange story", "Burt Geller", "$10.55")];

		var book_item = document.getElementsByClassName('discover-books')[0];
		book_item.innerHTML = "";

		for(var i = 0; i < books.length; i++)
		{
			book_item.innerHTML += books[i].show_book(i);
		}
	});

	document.getElementById("sign-up_input").value = "";
	signUp();
})
