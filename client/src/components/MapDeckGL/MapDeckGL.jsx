import React, { Component } from "react";
import ReactMapGL, { NavigationControl, Marker, Popup } from "react-map-gl";
import LocationPin from "../mapHelpers/LocationPin";
import PinInfo from "../mapHelpers/PinInfo";
import DeckGL, { GeoJsonLayer } from "deck.gl";
import EstateInfo from "../mapHelpers/EstateInfo";
import { getTowns } from "../../services/serviceTowns";
import { getOutletByTown } from "../../services/serviceOutlets";
import WebMercatorViewport from "viewport-mercator-project";
import bbox from "@turf/bbox";

const navStyle = {
  position: "absolute",
  top: 0,
  left: 0,
  padding: "10px"
};

export default class MapDeckGL extends Component {
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
      towns: [],
      places: null
    };
    this.viewState = {
      longitude: 103.8198,
      latitude: 1.3521,
      zoom: 10,
      pitch: 0,
      bearing: 0
    };
  }

  _updateViewport = viewport => {
    if (viewport.zoom < 11) {
      this.setState({ viewport, places: null });
    }
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
  _displayPopup = popupInfo => {
    return (
      popupInfo && (
        <Popup
          tipSize={5}
          anchor="top"
          longitude={popupInfo.geometry.coordinates[0]}
          latitude={popupInfo.geometry.coordinates[1]}
          closeOnClick={false}
          onClose={() => {
            popupInfo = null;
          }}
        >
          <PinInfo properties={popupInfo.properties} type={popupInfo.type} />
        </Popup>
      )
    );
  };

  _onClickTown = async (info, town) => {
    const [minLng, minLat, maxLng, maxLat] = bbox(town.location);
    const viewport = new WebMercatorViewport(this.state.viewport);

    const { longitude, latitude, zoom } = viewport.fitBounds(
      [[minLng, minLat], [maxLng, maxLat]],
      { padding: 40 }
    );

    const places = await getOutletByTown(town.id);
    this.setState({
      viewport: {
        ...this.state.viewport,
        longitude,
        latitude,
        zoom
      },
      places: places
    });
  };
  _getLayer = town => {
    return new GeoJsonLayer({
      id: `geojson-layer-${town.name}`,
      data: {
        type: "Feature",
        geometry: {
          type: town.location.type,
          coordinates: town.location.coordinates
        }
      },
      lineWidthScale: 4,
      opacity: 0.4,
      filled: true,
      stroked: true,
      lineWidth: 2,
      lineColor: [255, 0, 0],
      lineWidthMinPixels: 2,
      wireframe: true,
      getLineColor: f => [255, 0, 0],
      getFillColor: f => [255, 0, 0, 0],
      pickable: true,
      onClick: info => {
        this._onClickTown(info, town);
      }
    });
  };
  _renderNeighborhood = (towns, viewport) => {
    return (
      <DeckGL
        {...viewport}
        viewState={viewport}
        layers={towns.map(town => this._getLayer(town))}
      />
    );
  };
  async componentDidMount() {
    try {
      const towns = await getTowns();

      this.setState({
        towns: [...towns]
      });
    } catch (error) {
      console.log(error);
    }
  }

  render() {
    const { viewport, towns, places } = this.state;
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
            {this._renderNeighborhood(towns, viewport)}
            {/* {this._renderTownPopup()} */}
            {places &&
              places.map((place, index) => this._renderMarker(place, index))}
            {/* {popUp && this._displayPopup(popUp)} */}
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
