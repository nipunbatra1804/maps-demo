import React, { Component } from "react";
import ReactMapGL, { NavigationControl, Marker, Popup } from "react-map-gl";
import { getOutlets } from "../../services/serviceOutlets";
import LocationPin from "../mapHelpers/LocationPin";
import PinInfo from "../mapHelpers/PinInfo";
import { Container, Row, Col } from "reactstrap";
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

  _renderPopup = () => {
    const { popupInfo } = this.state;
    return (
      popupInfo && (
        <Popup
          tipSize={5}
          anchor="top"
          longitude={popupInfo.geometry.coordinates[0]}
          latitude={popupInfo.geometry.coordinates[1]}
          closeOnClick={false}
          onClose={() => this.setState({ popupInfo: null })}
        >
          <PinInfo properties={popupInfo.properties} type={popupInfo.type} />
        </Popup>
      )
    );
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
      <Container className="flex">
        <Row className="justify-content-center mt-8">
          <Col sm="12" md="auto">
            <div>
              <ReactMapGL
                className=""
                {...viewport}
                height={600}
                width={1018}
                onViewportChange={viewport => this._updateViewport(viewport)}
                mapboxApiAccessToken={`${process.env.REACT_APP_MAPBOX_API_KEY}`}
              >
                {places &&
                  places.map((place, index) =>
                    this._renderMarker(place, index)
                  )}
                {this._renderPopup()}
                <div className="nav" style={navStyle}>
                  <NavigationControl onViewportChange={this._updateViewport} />
                </div>
              </ReactMapGL>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}
//{this._renderPosition(longitude, latitude)}
