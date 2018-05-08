import React, { Component } from 'react';
import './App.css';
import SearchBar from '../SearchBar/SearchBar';
import SearchResults from '../SearchResults/SearchResults';
import Playlist from '../Playlist/Playlist';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { searchResults: [{name: 'Mwah', artist: 'Dua Lipa', album: 'Err, I dont know', id: 1},
                                  {name: 'Swalla', artist: 'Jason Derulo', album: 'Err, I dont know', id: 2}],
                   playlistName: 'My Playlist',
                   playlistTracks: [{name: 'Mwah', artist: 'Dua Lipa', album: 'Err, I dont know', id: 1}],
                 };
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
    this.updatePlaylistName = this.updatePlaylistName.bind(this);
    this.savePlaylist = this.savePlaylist.bind(this);
    this.search = this.search.bind(this);
  }
  render() {
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

  updatePlaylistName(name) {
    this.setState({
      playlistName: name
    })
  }

  savePlaylist() {

  }

  search(term) {
    console.log(term);
  }
}

export default App;