// Purpose: display serialized data as a raw string in the webpage
//          - it is an event function, happening once the page is loaded
//          - no parameters and no return values
//          - accesses a given JSON file, perform the processes for 
//          accessing and treating the string data, and then send it to the HTML
function raw_data() {

 // create an object of a request to interact with servers
 var request = new XMLHttpRequest();

 // indicate which object will be open on the previous object
 request.open("GET", "https://fifth-island.github.io/JSON-song-playlist/songs.json", true);

 // The readystatechange event is fired whenever the readyState property of the XMLHttpRequest change
 request.onreadystatechange = function() {
     
     // when readyState is 4 and status is 200, the response is ready:
     if ((request.readyState == 4) && (request.status == 200)) {

         // return the text received from a server following a request being sent
         data = request.responseText;

         // parse a JSON string, constructing the JavaScript value or object described by the string
         json = JSON.parse(data);

         // print string into the HTML file
         document.getElementById("raw").innerHTML = data;
     }
 };

 request.send();
 }

 //  Gets JSON data ready and displays it
 // Purpose: display data in a user-friendly format 
 //          - function automatically runs once the page is loaded -> using JQuery this time
 //          - creates 2 columns of songs depending on the number of songs -> I opted for keeping all columns together
 $(document).ready(function(){

  // access the json file as the document to be navigated through the function
  $.getJSON("https://fifth-island.github.io/JSON-song-playlist/songs.json", function(result) {
      
  // prints all the elements from the list in a human-readable layout 
  var object_json = JSON.parse(JSON.stringify(result));
      for(i = 0; i < object_json.length; i++) {
          if (i == 0) { $('#playlist').append("<div class='first-column'>"); };
          if (i == 7) { $('#playlist').append("<div class='second-column'>"); };
        $('#playlist').append(  
              "<div class='song'>"   +
              "<span class='title'>" + object_json[i].title + "</span>" +
              "<div class='artist'>" + object_json[i].artist + "</div>" +
              "<div class='year'>"   + object_json[i].year + "</div>" +
              "<div class='genres'>" + object_json[i].genres + "</div>" +
              "</div>");
         if (i == 6 || i == (object_json.length - 1)) { $('#playlist').append("</div>"); };
      }
  });
});


function filter_song() { 
 var request = new XMLHttpRequest();

 request.open("GET", "https://fifth-island.github.io/JSON-song-playlist/songs.json", true);

 request.onreadystatechange = function() {
     if ((request.readyState == 4) && (request.status == 200)) {
         data = request.responseText;
         json = JSON.parse(data);

         let x = document.getElementById('filter').value;
         var arr = [];
         
         json.forEach((song) => {
             if (song.genre.includes(x)) {
                     arr.push(song.name);
             }
         });
         
         document.getElementById("filter-products").innerHTML = arr;
         
     }
 };

 request.send();  

}