require("dotenv").config();

let Spotify = require("node-spotify-api");

let keys = require("./keys.js");

let axios = require("axios");

let moment = require("moment");

let fs = require("fs");

let spotify = new Spotify(keys.spotify);

let getArtistName = function (artist) {
    return artist.name;
};

let getMeSpotify = function(songName) {
    if (songName === undefined) {
        songName = "What's my age again";
    }
    spotify.search(
        {
            type: "track",
            query: songName
        },
        function (err, data) {
            if (err) {
                console.log("Error occured: " + err);
                return;
            }
            let songs = data.tracks.items;

            for (let i = 0; i < songs.length; i++) {
                console.log(i);
                console.log("artist(s): " + songs[i].artists.map(getArtistName));
                console.log("song name: " + songs[i].name);
                console.log("preview song: " + songs[i].preview_url);
                console.log("album: " + songs[i].album.name);
                console.log("--------------------------");
            }
        }
    );
};

let getBands = function(artist) {
    var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp";

    axios.get(queryURL).then(
        function(response) {
            let jsonData = response.data;

            if(!jsonData.length) {
                console.log("No results located for " + artist);
                return;
            }
            console.log("Upcoming concerts for "+ artist + ":");

            for (var i = 0; i < jsonData.length; i++) {
                let show = jsonData[i];
                console.log(
                    show.venue.city + "," + (show.venue.region || show.venue.country) + " at " + show.venue.name + " " + moment(show.datetime).format("MM/DD/YYYY"));
            };
        }
    );
};

let getMovie = function(movieName) {
    if (movieName === undefined) {
        movieName = "Mr Nobody";
    }
    let urlHit = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=full&tomatoes=true&apikey=98d03e80";

    axios.get(urlHit).then(
        function(response) {
            let jsonData = response.data;
            console.log("Title: " + jsonData.Title);
            console.log("Year: " + jsonData.Year);
            console.log("Rating: " + jsonData.Rated);
            console.log("IMDB Rating: " + jsonData.imdbRating);
            console.log("Country: " + jsonData.Country);
            console.log("Language: " + jsonData.lanugage);
            console.log("Plot: " + jsonData.Plot);
            console.log("Actors: " + jsonData.Actors);
            console.log("Rotten Tomatoes Rating: " + jsonData.Ratings[1].Value);
        }
    );
};

var readTextFile = function() {
    fs.readFile("random.txt", "utf8", function(error, data) {
        console.log(data);
        let dataArr = data.split(",");
        if (dataArr.length === 2) {
            pick(dataArr[0], dataArr[1]);
        } else if (dataArr.length === 1) {
            pick(dataArr[0]);
        }
    });
};

let pick = function(caseData, functionData) {
    switch (caseData) {
        case "concert-this":
            getBands(functionData);
            break;
        case "spotify-this-song":
            getMeSpotify(functionData);
            break;
        case "movie-this":
            getMovie(functionData);
            break;
        case "do-what-it-says":
            readTextFile();
            break;
        default:
            console.log("LIRI doesn't know that");
    }
};

let runLiri = function (argOne, argTwo) {
    pick(argOne, argTwo);
};

runLiri(process.argv[2], process.argv.slice(3).join(" "));
