// listen for form submit

document.getElementById('myForm').addEventListener('submit', saveBookmark);



	// save bookmark
	function saveBookmark(e){
		
		// Get form values
		var siteName = document.getElementById('siteName').value;
		var siteURL = document.getElementById('siteURL').value;

		if (!validateForm(siteName, siteURL)){
			return false;
		}


		var bookmark ={
			name: siteName,
			url:  siteURL
		}

		// local storage test
		// localStorage.setItem('test', 'hello world');
		// console.log(localStorage.getItem('test'));
		// localStorage.removeItem('test');
		// console.log(localStorage.getItem('test'))


		// test if bookmarks is null 
		if(localStorage.getItem('bookmarks') === null ){
			// init array
				var bookmarks = [];
				// add to array
				bookmarks.push(bookmark);
				// set to localStorage
				localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
			}	else{
				// get bookmarks form localStorage
				var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
				// Add bookmarks to array
				bookmarks.push(bookmark);
				// Re-set back to localStorage
				localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
			}

			// Clear form
			document.getElementById('myForm').reset();

			// Re-fetch bookmarks
			fetchBookmarks()

			// Prevent form from submitting
			e.preventDefault();
	}

	// Delete bookmark
	function deleteBookmark(url){
		// console.log(url);
		// get bookmarks form localStorage
		var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
		// loop throught bookmarks
		for(var i =0; i<bookmarks.length;i++){
			if(bookmarks[i].url == url){
				// Remove from array
				bookmarks.splice(i, 1);
			}
		}
		// Re-set back to localStorage
		localStorage.setItem('bookmarks',JSON.stringify(bookmarks));

		// Re-fetch bookmarks
		fetchBookmarks()
	}


	// fetch bookmarks
	function fetchBookmarks(){
		// get bookmarks form localStorage
			var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
			console.log(bookmarks);

		// get output id
			var bookmarksResult = document.getElementById('bookmarksResult');
		// Build output
		bookmarksResult.innerHTML='';
		for (var i = 0; i < bookmarks.length; i++) {
			var name = bookmarks[i].name;
			var url = bookmarks[i].url;


			bookmarksResult.innerHTML +='<div class="well">' +
									'<h3>'+name+
									'<a class="btn btn-default" target="_blank" href="'+url+'"> Visit </a>' + '    ' +
									'<a onclick="deleteBookmark(\''+url+'\')" class="btn btn-danger" href="#"> Delete </a>'	+
									'</h3>' +
									'</div>';
		}
		
	}


	// Validate Form
	function validateForm(siteName, siteURL){
		if(!siteName || !siteURL){
			alert('Please fill in the from')
			return false;
		}

		var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
		var regex = new RegExp(expression);
		if(!siteURL.match(regex)){
			alert('Please use a valid URL')
			return false;
		}

		return true;


	}




















