# Language Interpretation and Recognition Interface

## Project Overview: Node.js Command Line API Calls

I created this app with the intention of providing users access to information for various media in one easy to use platform. Using predefined command line arguments, you can pass data through the command line to search one of three different APIs and retrieve data regarding concert dates, song information, or movie information.

## Instructions for Operation

### node liri.js concert-this <artist/band name here>

By typing in this line whatever artist or band is passed in will hit the Bands in Town API and return relevant data to the user; such as concert location, venue, and date.

### node liri.js spotify-this-song <song name here>

This line will allow the user to hit the Spotify API and return results matching the sent song title parameters. The console will populate with artist(s) names, a link to preview the song, and album information for various result matches.

### node liri.js movie-this <move title here>

This command will hit the OMDb API with the searched title and return data about the movie's official release language, a plot synopsis, list of actors, and the rotten tomatoes score.

### node liri.js do-what-it-says

The last method of acquiring data with this app is to load prexisting commands (structured similarly to each of the three formats listed above) from the random.txt file located in this project directory. This method requires the desired search commands be entered with a comma instead of a space after the search function, with the search parameters enclosed in quotation marks.
-e.g. spotify-this-song,"Californication"
-e.g. movie-this,"The Lion King"

## Project Organization

This project is primarily structured in the central liri.js file, with one required keys.js file for storing the spotify API key structure, one .env file included for storing actual key data, and a package.json for npm integration. Also included with this file is a .gitignore file for the purpose of keeping the .env file key data confidential and skipping over the node-modules from the npm install.

Within the liri.js file, the app runs by checking passed command line arguments against a switch case- finding the match then sending the following parameters through into the appropriate function. These functions handle sending the search criteria to the appropriate API, and structuring the way the returned json gets returned into the console.

## Technologies Implemented

This project uses:
    -Javascript
    -Node.js
    -npm dependencies
        --dotenv
        --moment
        --axios
        --node-spotify-api

## Links

A working video of this project can be found on my youtube, at https://www.youtube.com/watch?v=k7wEYr50dhg
