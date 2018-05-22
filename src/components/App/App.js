import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';
import Spotify from '../../util/Spotify';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { searchResults: [],
                   playlistName: 'My Playlist',
                   playlistTracks: [],
                 };

                 /*
    this.state = { searchResults: [{name: 'Song1', artist: 'Artist1', album: 'Album1', id: 1, uri: 'spotify:track:7r5bS08R8d0jZuDZutVeHQ'},
                                   {name: 'Song2', artist: 'Artist2', album: 'Album2', id: 2, uri: 'spotify:track:7AMnWNkwYPxaVDgkwmEEKj'},
                                   {name: 'Song3', artist: 'Artist3', album: 'Album3', id: 3, uri: 'spotify:track:1yWItbINcAC0IFssISgvvg'}],
                   playlistName: 'My Playlist',
                   playlistTracks: [{name: 'Song1', artist: 'Artist1', album: 'Album1', id: 1, uri: 'spotify:track:7r5bS08R8d0jZuDZutVeHQ'},
                                    {name: 'Song2', artist: 'Artist2', album: 'Album2', id: 2, uri: 'spotify:track:7AMnWNkwYPxaVDgkwmEEKj'}],
                 };
                 */

    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }

  addTrack(track) {
    // Use the track's id property to check if the current song is in the playlistTracks state.
    if (this.state.playlistTracks.find(savedTrack => savedTrack.id === track.id)) {
      return;
    }
    else {
      var placeholder = this.state.playlistTracks;
      placeholder.push(track);
      this.setState({
        playlistTracks: placeholder
      })
    }
  }

  removeTrack(track) {
    // Use the track's id property to filter it out of playlistTracks.
    this.setState({
      playlistTracks: this.state.playlistTracks.filter(element => element.id !== track.id),
      })
  }

  savePlaylist() {
    var trackURIs = this.state.playlistTracks.map(track => track.uri);

    Spotify.savePlaylist(this.state.playlistName, trackURIs);

    console.log(`Saving and resetting playlist`);
    this.setState({
      playlistName: 'New Playlist',
      playlistTracks: [],
    })
  }

  search(term) {
    console.log(`Searching for "${term}"`);

    Spotify.search(term).then(tracks => {
      this.setState({searchResults: tracks});
    });
  }

  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    })
  }

  render() {
    Spotify.getAccessToken();
    return (
      <div>
        <h1>Ja<span className="highlight">mmm</span>ing</h1>
        <div className="App">
          <SearchBar onSearch={this.search} />
          <div className="App-playlist">
            <SearchResults searchResults={this.state.searchResults} onAdd={this.addTrack} />
            <Playlist playlistName={this.state.playlistName} playlistTracks={this.state.playlistTracks} onNameChange={this.updatePlaylistName} onSave={this.savePlaylist} onRemove={this.removeTrack} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
