import React from 'react';
import './TrackList.css';
import Track from '../Track/Track';
import Spotify from '../../util/Spotify';

class TrackList extends React.Component {
  render() {
    return(
      <div className="TrackList">
        {this.props.tracks.map(track => <Track track={track} key={track.id} onAdd={this.props.onAdd} onRemove={this.props.onRemove} />)}
      </div>
    );
  }
}

export default TrackList;
