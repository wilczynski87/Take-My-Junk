import * as React from 'react';
import Map from 'react-map-gl';

function Mapy() {
  return (
    <Map
      initialViewState={{
        longitude: -122.4,
        latitude: 37.8,
        zoom: 14
      }}
      style={{width: 600, height: 400}}
      mapStyle="mapbox://styles/mapbox/streets-v9"
      mapboxAccessToken = 'pk.eyJ1Ijoid2lsY3p5bnNraTg3IiwiYSI6ImNsMm9wYnFyejEyZGYzZW1haDltbXM5eGkifQ.dUUyFLQdnnzDgKXOrfYqGw'
    />
  );
}

export default Mapy;