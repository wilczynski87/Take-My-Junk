// src/MapsOrginal.js
import * as React from 'react';
import myLocationIcon from './pointer.png';
import SFHIcon from './been2.svg';

export default class MapsOrginal extends React.Component {
  mapRef = React.createRef();

  state = {
    // The map instance to use during cleanup
    map: null
  };

  componentDidMount() {

    const myPositionCord = {lat: 52.5, lng: 13.4};
    const skipForHireCord = {lat: 52.45, lng: 13.4};

    const H = window.H;
    const platform = new H.service.Platform({
        apikey: "hrn:here:authorization::org932282844:project/1652100769323" //"{HERE-API-KEY}"
    });

    const defaultLayers = platform.createDefaultLayers();

    // Create an instance of the map
    const map = new H.Map(
      this.mapRef.current,
      defaultLayers.vector.normal.map,
      {
        // This map is centered over Europe
        center: myPositionCord,
        zoom: 4,
        pixelRatio: window.devicePixelRatio || 1
      }
    );
 
    // MapEvents enables the event system
    // Behavior implements default interactions for pan/zoom (also on mobile touch environments)
    // This variable is unused and is present for explanatory purposes
    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

    // Create the default UI components to allow the user to interact with them
    // This variable is unused
    const ui = H.ui.UI.createDefault(map, defaultLayers);

    

    //my code:
    // Create a marker icon from an image URL:
    const myPositionIcon = new H.map.Icon(myLocationIcon);
    const skipForHireIcon = new H.map.Icon(SFHIcon);

    // Create a marker using the previously instantiated icon:
    const myPosition = new H.map.Marker(myPositionCord, { icon: myPositionIcon });
    const skipForHirePosition = new H.map.Marker(skipForHireCord, { icon: skipForHireIcon });
    

    // Add the marker to the map:
    map.addObject(myPosition);
    map.addObject(skipForHirePosition);

    //center on my position
    let coords = myPositionCord;
    map.setCenter(coords);
    map.setZoom(10);

    this.setState({ map });
  }

  componentWillUnmount() {
    // Cleanup after the map to avoid memory leaks when this component exits the page
    this.state.map.dispose();
  }

  render() {

    return (
      // Set a height on the map so it will display
      <div ref={this.mapRef} style={{ height: "200px" }} />
    );
  }
}