const express = require('express');
const router = express.Router();
const path = require('path');
const scraper = require('../scraper');


router.get('/', async (req, res)=> {
    try {
        res.sendFile(path.join(__dirname + '/../index.html'))
    } catch (err) {
        res.send(err);
    }
});

router.get('/:bandName', async (req, res) => {
    try {
        const bandName = req.params.bandName;
        const url = 'http://www.darklyrics.com/' + bandName[0] + "/" + bandName + '.html';
        scraper.getAllAlbums(url)
            .then(data => {
                res.send(data);
            })
    } catch (err) {
        res.send(err);
    }
})

router.get('/:bandName/:album', async (req, res) => {
    try {
        const bandName = req.params.bandName;
        const album = req.params.album;
        const url = 'http://www.darklyrics.com/lyrics/' + bandName + '/' + album + ".html";
        scraper.getAlbum(url)
            .then(data => {
                res.send(data);
            })
    } catch(err){
        console.log(err);
    }
})

router.get('/:bandName/:album/songs', async (req, res) => {
    try {
        const bandName = req.params.bandName;
        const album = req.params.album;
        const url = 'http://www.darklyrics.com/lyrics/' + bandName + '/' + album +'.html';
        console.log(url);
        scraper.getAlbumSongs(url)
            .then(data => {
                res.send(data);
            });
    } catch (err){
        console.log("The url : " + url + " has encountered an error.");
        console.log(err);
    }
})

router.get('/:bandName/:album/:song', async (req, res) => {
    try {
        const bandName = req.params.bandName;
        const album = req.params.album;
        const song = scraper.formatSongName(req.params.song);
        let url = 'http://www.darklyrics.com/lyrics/' + bandName + '/' + album + '.html';
        console.log(url);
        let songs = await scraper.getAlbumSongs(url);
        let songIndex = songs.indexOf(song);
        scraper.getSongLyrics(url, songIndex)
            .then(data => {
                res.send('<h3>' + song + '</h3><br>' + data); 
            });
    } catch (err) {
        console.log(err);
    }
})


module.exports = router;