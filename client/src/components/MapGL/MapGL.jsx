import React, { Component } from "react";
import ReactMapGL, { NavigationControl, Marker, Popup } from "react-map-gl";
const navStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  padding: "10px"
};

export default class MapGL extends Component {
  constructor(props) {
    super(props);
    this.state = {
      viewport: {
        latitude: 1.3521,
        longitude: 103.8198,
        zoom: 10
      },
      popupInfo: null,
      popupTown: null
    };
  }
  _updateViewport = viewport => {
    this.setState({ viewport });
  };

  render() {
    const { viewport } = this.state;
    return (
      <div className="container">
        <div className="row justify-content-center">
          <ReactMapGL
            {...viewport}
            height={600}
            width={"100%"}
            onViewportChange={viewport => this._updateViewport(viewport)}
            mapboxApiAccessToken={`${process.env.REACT_APP_MAPBOX_API_KEY}`}
          >
            <div className="nav" style={navStyle}>
              <NavigationControl onViewportChange={this._updateViewport} />
            </div>
          </ReactMapGL>
        </div>
      </div>
    );
  }
}
//{this._renderPosition(longitude, latitude)}
