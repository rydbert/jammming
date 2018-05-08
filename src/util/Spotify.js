const clientId = '8465cb26123f4809ae8cb344eb6c0050';
const redirectURI = "http://localhost:3000/";
var accessToken = '';

const Spotify = {
  getAccessToken() {
    if (accessToken !== '') {
      return accessToken;
    }
    else {
      accessToken = window.location.href;
      console.log(accessToken);
      var expirationTime = window.location.href;

      window.setTimeout(() => accessToken = '', expiresIn * 1000);
window.history.pushState('Access Token', null, '/');
    }
  }

  search(term) {
    return fetch(`https://api.spotify.com/v1/me`, {
      headers: {
          'Authorization': 'Bearer ' + accessToken
      }
    }).then(response => response.json()
      ).then(jsonResponse => {
        console.log(jsonResponse)
      })
  }
}


export default Spotify;
