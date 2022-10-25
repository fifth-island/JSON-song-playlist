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
              "<div class='title'>" + object_json[i].title + "</div>" +
              "<div class='artist'>" + object_json[i].artist + "</div>" +
              "<div class='year'>"   + object_json[i].year + "</div>" +
              "<div class='genres'>" + object_json[i].genres + "</div>" +
              "</div>");
         if (i == 6 || i == (object_json.length - 1)) { $('#playlist').append("</div>"); };
      }
  });
});


// Purpose: filters the songlist, printing in the HTML only songs 
//          that are belong to the specific genre
function select_data() {
 // access the json file as the document to be navigated through the function
 $.getJSON("https://fifth-island.github.io/JSON-song-playlist/songs.json", function(result) {
 
 // obtains a JSON string object through the JavaScript value passing it to the string variable
 var object_json = JSON.parse(JSON.stringify(result));

 // obtain the specific genre by pulling up from the selection form 
 var genre = document.getElementById("filter").value;
 $('#result-data').html("<br>");
 // iterate through the whole json object
 for (i = 0; i < object_json.length; i++) {
     // only print in inner HTML the song if the genre matches
     if (object_json[i].genres.includes(genre)) {
         $('#result-data').append(object_json[i].title + "<br><br>");
     }
 }
})
}

