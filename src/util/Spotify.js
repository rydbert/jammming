const clientID = '8465cb26123f4809ae8cb344eb6c0050';
const redirectURI = "http://localhost:3000/";
var accessToken = '';

const Spotify = {
  getAccessToken() {
    if (accessToken !== '') {
      return accessToken;
    }
    else {

      var scopes = 'playlist-modify-public';
      window.location.href = ('https://accounts.spotify.com/authorize' +
        '?response_type=token' +
        '&client_id=' + clientID +
        (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
        '&redirect_uri=' + encodeURIComponent(redirectURI));

      accessToken = window.location.href.match(/access_token=([^&]*)/)[1];
      console.log(accessToken);
      var expiresIn = window.location.href.match(/expires_in=([^&]*)/)[1];
      console.log(expiresIn);

      window.setTimeout(() => accessToken = '', expiresIn * 1000);
window.history.pushState('Access Token', null, '/');
    }
  },

  search(term) {

    // Have tried this.getAccessToken() which seems to lead to different problems
    // this.getAccessToken();

    return fetch('https://api.spotify.com/v1/search?type=track&q=' + term, {
      headers: {
            'Authorization': 'Bearer ' + accessToken
        }
    }).then(response => response.json()
      ).then(jsonResponse => {

        if (jsonResponse.tracks.items) {
          // According to console.log, an array of objects with the correct
          // properties is being returned, as it should be.
          console.log(jsonResponse.tracks.items.map(track => {
            return {
              id: track.id,
              name: track.name,
              artist: track.artists[0].name,
              album: track.album.name,
              uri: track.uri,
              }
            })
          )
          return jsonResponse.tracks.items.map(track => {
            return {
              id: track.id,
              name: track.name,
              artist: track.artists[0].name,
              album: track.album.name,
              uri: track.uri,
              }
          })
        }
      })
  }
}


export default Spotify;
