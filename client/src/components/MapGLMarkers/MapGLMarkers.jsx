import React, { Component } from "react";
import ReactMapGL, { NavigationControl, Marker, Popup } from "react-map-gl";
import { getOutlets } from "../../services/serviceOutlets";
import LocationPin from "../mapHelpers/LocationPin";
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
      popupTown: null,
      places: null
    };
  }
  _updateViewport = viewport => {
    this.setState({ viewport });
  };

  _renderMarker = (item, index) => {
    return (
      <Marker
        key={`marker-${index}`}
        longitude={item.geometry.coordinates[0]}
        latitude={item.geometry.coordinates[1]}
      >
        <LocationPin
          size={10}
          onClick={() => this.setState({ popupInfo: item })}
          type={item.category}
        />
      </Marker>
    );
  };
  async componentDidMount() {
    try {
      const places = await getOutlets();
      console.log(places);
      this.setState({
        places: [...places]
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { viewport, places } = this.state;
    return (
      <ReactMapGL
        {...viewport}
        height={600}
        width={550}
        onViewportChange={viewport => this.setState({ viewport })}
        mapboxApiAccessToken={`${process.env.REACT_APP_MAPBOX_API_KEY}`}
      >
        {places &&
          places.map((place, index) => this._renderMarker(place, index))}
      </ReactMapGL>
    );
  }
}
//{this._renderPosition(longitude, latitude)}