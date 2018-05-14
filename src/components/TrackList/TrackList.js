import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';

class TrackList extends React.Component {
  render() {
    console.log(this.props.tracks)
    return (
      <div className="TrackList">
          {
            // Getting error:
            // TypeError: Object doesn't support property or method 'map'
            // because of an unresolved Promise, maybe?
            this.props.tracks.map(track => {
              return (
                <Track
                key={track.id}
                track={track}
                onAdd={this.props.onAdd}
                onRemove={this.props.onRemove}
                isRemoval={this.props.isRemoval} />
              );
            })
          }
      </div>
    );
  }
}

export default TrackList;
