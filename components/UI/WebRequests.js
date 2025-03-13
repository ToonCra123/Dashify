// WebRequests.js
// @ts-check


/*
    @params: {number} limit
    @returns: {Promise} data
    @description: Fetches trending songs from the API
*/
let getTrending = async (limit) => {
    try { 
        let response = await fetch(`https://api.toonhosting.net/search/song/trending/?limit=${limit}`);
        let data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
};

let getSong = async (id) => {
    try {
        let response = await fetch(`https://api.toonhosting.net/song/${id}`);
        let data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
};

let searchSongByTitle = async (query, limit = 10) => {
    query = query.replace(' ', '%20');
    try {
        let response = await fetch(`https://api.toonhosting.net/search/song/?title=${query}&limit=${limit}`);
        let data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
};

let searchSongByArtist = async (query, limit = 10) => {
    query = query.replace(' ', '%20');
    try {
        let response = await fetch(`https://api.toonhosting.net/search/song/?name=${query}&limit=${limit}`);
        let data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
};

let searchPlaylist = async (query, limit = 10) => {
    query = query.replace(' ', '%20');
    try {
        let response = await fetch(`https://api.toonhosting.net/search/playlist/?name=${query}&limit=${limit}`);
        let data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
};

let getPlaylist = async (id) => {
    try {
        let response = await fetch(`https://api.toonhosting.net/playlist/${id}`);
        let data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
};





export { getTrending, getSong, searchSongByTitle, searchSongByArtist, searchPlaylist, getPlaylist };