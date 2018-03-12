import React from 'react';
import './Track.css';

class Track extends React.Component {

  constructor(props) {
    super(props);
    this.addTrack = this.addTrack.bind(this);
    this.removeTrack = this.removeTrack.bind(this);
  }

  addTrack() {
    return this.props.onAdd(this.props.track);
  }

  removeTrack() {
    return this.props.onRemove(this.props.track);
  }

  renderAction() {
    if(this.props.isRemoval === true) {
      return <a className="Track-action" onClick={this.removeTrack}>-</a>
    } else {
      return <a className="Track-action" onClick={this.addTrack}>+</a>
    }
  }

  render() {
    return(
      <div className="Track">
        <div className="Track-information">
          <h3>{this.props.name}</h3>
          <p>{this.props.artist} | {this.props.album}</p>
        </div>
        {this.renderAction()}
      </div>
    );
  }
}

export default Track;
