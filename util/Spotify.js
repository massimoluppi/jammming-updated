const clientID = '9efa2ed966ef4016b6f7e6562c09414c';
const redirectURI = "http://localhost:3000/";
let accessToken;

const Spotify = {

  getAccessToken() {
  if (accessToken) {
    return accessToken;
  }
  const accessTokenMatch = window.location.href.match(/access_token=([^&]*)/);
  const expiresInMatch = window.location.href.match(/expires_in=([^&]*)/);
  if (accessTokenMatch && expiresInMatch) {
    accessToken = accessTokenMatch[1];
    const expiresIn = Number(expiresInMatch[1]);
    window.setTimeout(() => accessToken = '', expiresIn * 1000);
    window.history.pushState('Access Token', null, '/'); // This clears the parameters, allowing us to grab a new access token when it expires.
    return accessToken;
  } else {
    const accessUrl = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
    window.location = accessUrl;
  }
},

  search(term) {
    const accessToken = Spotify.getAccessToken();
    return fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {headers: {Authorization: `Bearer ${accessToken}`}}).then(response => {
      return response.json()
    }).then(jsonResponse => {
      console.log(jsonResponse);
      if(jsonResponse.tracks) {
        console.log(jsonResponse.tracks.items[0].name);
        return jsonResponse.tracks.items.map(track => ({
          id: track.id,
          name: track.name,
          artist: track.artists[0].name,
          album: track.album.name,
          uri: track.uri
        }))
      }
    });
  },

  savePlaylist(name, trackUris) {
    if (!name || !trackUris.length) {
      return;
    }
    const accessToken = Spotify.getAccessToken();
    const headers = { Authorization: `Bearer ${accessToken}` };
    let userId;

    try {
      let response = fetch('https://api.spotify.com/v1/me', {headers: headers});
      if(response.ok) {
        let jsonResponse = response.json();
        return userId = jsonResponse.id;
      }
      throw new Error ('Request failed!');
    } catch(error) {
      console.log(error);
    }

    try {
      let response = fetch('/v1/users/{user_id}/playlists', {headers: headers, method: 'POST', body: JSON.stringify({id: 200})});
      if(response.ok) {
        let jsonResponse = response.json();
        let playlistID = jsonResponse.id;
      }
      throw new Error ('Request failed!');
    } catch(error) {
      console.log(error);
    }

    try {
      let response = fetch('/v1/users/{user_id}/playlists/{playlist_id}/tracks', {headers: headers, method: 'POST', body: JSON.stringify({id: 200})});
      if(response.ok) {
        let jsonResponse = response.json();
        let playlistID = jsonResponse.id;
      }
      throw new Error ('Request failed!');
    } catch(error) {
      console.log(error);
    }

    Spotify.savePlaylist().then(() => {
      this.setState({playlistName: 'New Playlist', searchResults: []});
    });
    }
};

export default Spotify;
