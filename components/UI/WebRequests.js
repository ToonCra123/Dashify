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

let getSong = async (id, shouldCountAsListen = false) => {
    try {
        let response = await fetch(shouldCountAsListen ? `https://api.toonhosting.net/song/${id}` : `https://api.toonhosting.net/song/${id}/${shouldCountAsListen}`);
        let data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
};

// SEARCH QUEIRIES

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
        let response = await fetch(`https://api.toonhosting.net/search/artist/?name=${query}&limit=${limit}`);
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

// PLAYLIST FUNCTIONS

let getPlaylist = async (id) => {
    try {
        let response = await fetch(`https://api.toonhosting.net/playlist/${id}`);
        let data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
};

let addSongToPlaylist = async (playlistId, songId) => {
    try {
        let response = await fetch(`https://api.toonhosting.net/playlist/${playlistId}`, {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ song: songId })
        });
        let data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
}


// USER FUNCTIONS

let registerUser = async (username, password) => {
    try {
        let response = await fetch('https://api.toonhosting.net/user/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        let data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
};

let loginUser = async (username, password) => {
    try {
        let response = await fetch('https://api.toonhosting.net/user/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        let data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
};

let deleteUser = async (username, password) => {
    try {
        let response = await fetch('https://api.toonhosting.net/user/', {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        });
        let data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
};

let changePass = async (username, password, newpass) => {
    try {
        let response = await fetch('https://api.toonhosting.net/user/', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password, newpass })
        });
        let data = await response.json();
        return data;
    } catch (error) {
        console.error(error);
    }
};



export { 
    getTrending, getSong, searchSongByTitle, searchSongByArtist, 
    searchPlaylist, getPlaylist, registerUser, loginUser, deleteUser, 
    changePass 
};