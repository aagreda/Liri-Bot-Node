//require npm packages 
var request = require('request');
var Twitter = require('twitter');
var spotify = require('spotify');
var keys = require('./keys.js');
var fs = require ('fs');

//arguments
var inputString = process.argv;
var action = inputString [2];
var name = inputString [3];

//call the functions
actionObjects[action](name);

//Twitter

//set all your functions as an object
var actionObjects = {
	"my-tweets": function(action){
		//load "20" most recent tweets

		//link to your twitter keys 
		var client = new Twitter({
			 consumer_key: keys.twitterKeys.consumer_key,
             consumer_secret: keys.twitterKeys.consumer_secret,
             access_token_key: keys.twitterKeys.access_token_key,
             access_token_secret: keys.twitterKeys.access_token_secret
		});

		 //set twitter paramers to load your timeline and limit to 20 tweets
         var params = {alejandra_agos: 'nodejs', count: 20};

         //get your timeline using the variable params and run the the function with the arguments for errors, tweets and respose
         client.get('statuses/user_timeline', params, function(error, tweet, response){

         	//if there is no error
         	if (!error) {
         		var allTweets = "";
         		for (var i = 0; i < tweets.length; i++) {
                        var tweetsData = tweets[i].text;
                        allTweets += tweetsData;
                        console.log(tweetsData);
                }
                //append the text file data
                fs.appendFile("long.txt", allTweets, "utf8", function(error){

                //if there is an error, log the error
                    if (error) {
                        console.log(error);
                    }

                }); 

            }//else, log the error 
            else{
                console.log(error);
            }   
        }); 
    },

//Spotify
    "spotify-this-song":function(name){

        //query spotify for the var name or "The sing" if there is no 3rd argument and run the callback function
        spotify.search({type: 'track', query: name || "The Sing"}, function(err, data){

            //if there is an error, log it
            if (err){
                console.log('Error has accurred' + err);

                //exit the function
                return;
            } else{
                //set the songs variable equal to the spotify object 
                var song = data.tracks.items;

                //set all songs equal to an empty string
                var allSongs = "";

                //loop through the song variable
                for (var i = 0; i < song.length; i++){

                    //set song data to index of songs
                    var songData = song[i];

                    //set song info equal the necessary info needed: (artist, title, album, lyrics)
                    var songInfo = "Artist Name: " + songData.artists[0].name + "\n" + "Song Name" + songData.name + "\n" + "Preview URL:" + songData.preview_url + "\n" + "Album Name:" + songdata.album.name;
                
                    allSongs += songInfo;
                }

                //append the text file to log all the songs in the objective
                fs.appendFile("./log.text", allSongs + "\n", "utf8", function(error){
                
                    //if erreor, log the errror
                    if(error){

                    console.log(error);
                    }

                });
            }
        });
    },

    //Movies-omdbapi
    "movie-this": function(name){

        //use request to query the omdb-api and search by the name variable or if there is no 3rd argument, search for Mr. Nobody and return the data as a json object
        request("http://www.omdbapi.com/?t=" + (name || "Mr. + Nobody") + "&y=&plot=full&tomatoes=true&r=json", function(error, res, body){

            var movies = body;
            var allMovies = "";

            //if there isnt an error and the response status code equal to 200 
            if (!error && respose.statusCode == 200){

                var movieInfo = JSON.parse(body);
                var movieData = "Movie Name: " + movieInfo.Title + "\n" + "Year Released: " + movieInfo.Year + "\n" + "IMDB Rating: " + movieInfo.imdbRating + "\n" + "Country: " + movieInfo.Country + "\n" + "Language: " + movieInfo.Language + "\n" + "Plot Line: " + movieInfo.Plot + "\n" + "Actors: " + movieInfo.Actors + "\n" + "Rotten Tomatoes Rating: " + movieInfo.tomatoRating + "\n" + "Rotten Tomatoes URL: " + movieInfo.tomatoURL;
                allMovies += movieData;
                console.log(movieData);
            }
        
            //append log.txt file to data
            fs.appendFile(".log.txt", allMovies + "\n", "utf8", function(error){

                //if error console log error
                if (error){
                    console.log(error);

                }
            });
        });

    },

    //create a do-what-ir-says function
    "do-what-it-says": function(action){

        //fs to read the random.txt file
        fs.readFile('./randon.txt', 'utf8', function(error ,data){

            //if error, exit function and console log the error
            if (error){
                    return console.log(error);

            }
            //and console log data    
            console.log(data);  

            //set the text in file and split it in equal variables that is an array
            var textArray = data.slipt(",");

            //now set txt at [0] index so that is equal to a variable
            var actionStatement = textArray[0];

            //text at [1] so that is equal to a variable
            var namePhrase = textArray[1];

            //now call thes function with the parameter:
            actionObjects[actionStatement](namePhrase);

        });
    }
};