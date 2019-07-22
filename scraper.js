const axios = require('axios');
const cheerio = require('cheerio');

/**
 * Returns a promise of all of the lyrics for the album selected.
 */
module.exports.getAlbum = function(url) {
    return axios.get(url)
        .then(res => {
            if(res.status === 200){
                const html = res.data;
                const $ = cheerio.load(html);
                $('.thanks').remove();
                $('.note').remove();
                return $('.lyrics').html();
            }
        })
        .catch((err) => {
            console.log(err);
        })
}

/*
 * Returns a promise of an array of each album listed on the website.
*/
module.exports.getAllAlbums = function(url) {
    return axios.get(url)
        .then(res => {
            if(res.status === 200) {
                albums = [];
                const html = res.data;
                const $ = cheerio.load(html);
                albums = $('.album h2 strong').text().split('""');
                return formatAlbums(albums);
            }
        })
        .catch((err)=> {
            console.log(err);
        })
}

/**
 * Returns a promise of an array of songs for a given album.
 */
module.exports.getAlbumSongs = function(url){
    return axios.get(url)
        .then(res => {
            if(res.status === 200) {
                var songs = [];
                const html = res.data;
                const $ = cheerio.load(html);
                songs = $('.albumlyrics > a').text().replace('?', '').toLowerCase().split(/[0-9]{1,2}. /);
                songs.shift();
                return songs;
            }
        })
        .catch(err => {
            console.log(err);
        })
}

/**
 * Returns a promise of the lyrics for the given song.
 */
module.exports.getSongLyrics = function(url, songIndex) {
    return axios.get(url)
        .then(res => {
            if(res.status === 200) {
                const html = res.data;
                const $ = cheerio.load(html);
                $('.thanks').remove();
                $('.note').remove();
                $('a').remove();
                songsLyrics = ($.html($('.lyrics')).split('</h3>'));
                songsLyrics.shift();
                return songsLyrics[songIndex];
            }
        })
        .catch(err => {
            console.log(err);
        })
}

/**
 * Helper function that takes an array of strings, and tidys them up.
 * @param arr = list of albums. 
 */
function formatAlbums(arr) {
    let len = arr.length -1;
    arr[0] = arr[0].slice(1);
    arr[len] = arr[len].slice(0, -1);
    return arr;
}

/**
 * Helper function that handles songs with spaces.
 * Use '_' in the url to account for spaces in song names.
 * This is only necassary for song names, not album or band names.
 * Song and band names should ignore spaces, ie. 'gunsandroses', 'southofheaven'.
 */
module.exports.formatSongName = function(songName) {
    songName = songName.replace("?", "%3f");
    return songName.replace(/_/g, " ").toLowerCase();
}