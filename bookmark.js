// Gathering elements

let add_btn = document.querySelector(".add_bookmark_btn");

let bookmarks_div = document.querySelector(".bookmark_results");

add_btn.addEventListener("click", saveBookmark);

// function for adding bookmark
function saveBookmark(e) {
    
    let user_site_input = document.querySelector(".website_name").value;
    let user_url_input = document.querySelector(".website_url").value;

    //console.log(user_site_input, user_url_input);
    // validating user-input
    if (!validateForm(user_site_input, user_url_input)) {
        return false;
    }

    // bookmark object
    let bookmark = {
        name : user_site_input,
        url : user_url_input
    }

    let bookmarks = JSON.parse(localStorage.getItem("bookmarks"));

    //displaying the value stored in localStorage
    if (localStorage.getItem('bookmarks') === null) {
        let bookmarks = [];

        bookmarks.push(bookmark);
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }

    // if user enter same url for adding new bookmark ,it'll give error
    else if(user_url_input.value === bookmarks.url){
        alert("Bookmark already added with this URL!!");
    }

    //getting user bookmark and storing in localStorage
    else{
        let bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
        bookmarks.push(bookmark);
        localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    }

    //reseting the form on taking one bookmark
    document.querySelector(".add_bookmark_form").reset();

    // fetching all bookmarks
    fetchBookmarks();

    e.preventDefault();
}

// function to fetch bookmarks
function fetchBookmarks() {
    let bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
    bookmarks_div.innerHTML = '';

    for (let i = 0; i < bookmarks.length; i++) {
        const website_name = bookmarks[i].name;
        const website_url = bookmarks[i].url;
        
    // adding bookmarks on user click    
    bookmarks_div.innerHTML += 
    '<div class="bookmark">'+'<h3>'+website_name+'</h3>'+
        '<a class="visit_bookmark_btn" target="_blank" href="'+website_url+'">Visit</a>'+
        '<a class="delte_bookmark_btn" href="#" onclick="deleteBookmark(\''+bookmarks[i].url+'\')">Delete</a>'+
    '</div>';
    }
}

// function to validateForm
function validateForm(websitename, websiteurl) {

    //regex for url and matching in if condtn
    let patternurl = /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;

    if (websitename == "") {
        alert("Enter the WebsiteName before adding Bookmark");
        return false;
    }
    else if(websiteurl== ""){
        alert("Enter the Website-Url before adding Bookmark");
        return false;
    }
    else if(!patternurl.test(websiteurl)){
        alert("Please Enter valid Url");
        return false;
    }

    return true;
}

//function to delete bookmark
function deleteBookmark(url) {
    let bookmarks = JSON.parse(localStorage.getItem('bookmarks'));
    //console.log("bookmarks value-"+bookmarks.url);

    for (let i=0;i<bookmarks.length; i++) {

        if (bookmarks[i].url == url) {
            //console.log("i value-"+bookmarks[i].url);
            bookmarks.splice(i, 1);
        }
    }

    alert('Deleting the Bookmark');
    //re-setting back to local storage
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
    
    //fetch bookmarks back after deleting one bookmark
    fetchBookmarks();
}