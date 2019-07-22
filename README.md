### SUMMARY
This is a Node.js rest api that scrapes Darklyrics.com for its content.

It provides the ability to search for:
-  A list of albums from a band.
-  A list of songs from an album.
-  All lyrics on an album.
-  Lyrics from a specific song.

### Install
Move to the install directory.
```
cd (install dir)
```
Install all node dependencies.
```
npm install
```
Then start the server.
```
npm start
```

### USING THE API
Once the server is running, you can start searching for lyrics. Results can be displayed in the browser using the included routes, or simply returned for another app.

Use the syntax as follows to search, filling in your own query for bandName, albumName, and songName(without parenthesis).

*bandName and albumName should not have any blank spaces, just condense them to a single word, while songName should use '_' instead of blank spaces.

To get a list of all albums for a certain band:
```
localhost:3000/lyrics/(bandName)

example: 
localhost:3000/lyrics/theblackdahliamurder
```
To get all the lyrics for a specific album:
```
localhost:3000/lyrics/(bandName)/(albumName)

example:
localhost:3000/lyrics/isis/panopticon
```
To get a list of all songs on an album:
```
localhost:3000/lyrics/(bandName)/(albumName)/songs

example:
localhost:3000/lyrics/wretched/beyondthegate/songs
```
To get the lyrics from a specific song:
```
localhost:3000/lyrics/(bandName)/(albumName)/(songName)

example:
localhost:3000/lyrics/deathspellomega/paracletus/wings_of_predation
```
