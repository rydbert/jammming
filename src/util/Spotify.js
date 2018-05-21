const clientID = '8465cb26123f4809ae8cb344eb6c0050';
const redirectURI = "http://localhost:3000/";
var accessToken = '';

const Spotify = {
  getAccessToken() {
    const url = window.location.href;
    const token = url.match(/access_token=([^&]*)/);
    const time = url.match(/expires_in=([^&]*)/);

    if (accessToken) {
      return accessToken;
    }
    else if (token && time){

      accessToken = token[1];
      console.log(accessToken);
      var expiresIn = time[1];
      console.log(expiresIn);

      window.setTimeout(() => accessToken = null, expiresIn * 1000);
      window.history.pushState('Access Token', null, '/');

    }
    else {
      var scopes = 'playlist-modify-public';
      window.location.href = ('https://accounts.spotify.com/authorize' +
        '?response_type=token' +
        '&client_id=' + clientID +
        (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
        '&redirect_uri=' + encodeURIComponent(redirectURI));
    }
  },

  savePlaylist(playlistName, trackURIs) {
    if (playlistName === '' || trackURIs === []) {
      return;
    }

    this.getAccessToken();
    var headers = {'Authorization': 'Bearer ' + accessToken};
    var userID = '';

    fetch('https://api.spotify.com/v1/me', {
      headers: headers,
      }).then(response => {
    	if (response.ok) {
    		return response.json();
    	}
    	throw new Error('Request failed!');
      }, networkError => console.log(networkError.message)
    ).then(jsonResponse => {
      // Code to execute with jsonResponse
      console.log("jsonResponse: " + jsonResponse);
      userID = jsonResponse.id;
      console.log(userID);
    });

    userID = 'rydbert';
    console.log('https://api.spotify.com/v1/users/' + userID + '/playlists')
    // Hardcoded userID still doesn't work.
    fetch('https://api.spotify.com/v1/users/' + userID + '/playlists', {
        headers: headers,
        method: 'POST',
        body: JSON.stringify({id: '200'})
    }).then(response => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Request failed!');
      }, networkError => console.log(networkError.message)
    ).then(jsonResponse => {
      // Code to execute with jsonResponse
      console.log(jsonResponse.id)
      var playlistID = jsonResponse.id;
      console.log('playlistID' + playlistID);
    });
  },


  search(term) {

    this.getAccessToken();

    return fetch('https://api.spotify.com/v1/search?type=track&q=' + term, {
      headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    }).then(response => response.json()
      ).then(jsonResponse => {
        if (jsonResponse.tracks.items) {
          return jsonResponse.tracks.items.map(track => ({
              id: track.id,
              name: track.name,
              artist: track.artists[0].name,
              album: track.album.name,
              uri: track.uri
          }));
        }
      })
  }
}

export default Spotify;
