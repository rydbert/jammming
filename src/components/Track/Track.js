import React from 'react';
import './Track.css';

class Track extends React.Component {
  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }
  renderAction(isRemoval) {
    if (isRemoval) {
      return (<p onClick={this.removeTrack}>-</p>)
    }
    else {
      return (<p onClick={this.addTrack}>+</p>)
    }
  }
  addTrack() {
    this.props.onAdd(this.props.track);
  }
  removeTrack() {
    this.props.onRemove(this.props.track);
  }

  render() {
    return (
      <div className="Track">
      <div className="Track-information">
      <h3>{this.props.track.name}</h3>
      <p>{this.props.track.artist} | {this.props.track.album}</p>
      </div>
      <a className="Track-action" >{this.renderAction(this.props.isRemoval)}</a>
      </div>
    );
  }
}


export default Track;
