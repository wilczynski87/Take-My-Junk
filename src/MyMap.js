import React, {useRef, useEffect, useContext, useState} from 'react';
import myLocationIcon from './pointer.png';
import sFHIcon from './been3.png';
import { UserContext } from './context';


const MyMap = ({companys}) => {
  // Create a reference to the HTML element we want to put the map on
  const mapRef = useRef(null);

  const [context, setContext] = useContext(UserContext);

  const myPositionCord = { lat: context.user.address.lat, lng: context.user.address.lng};

  // My Code -> marking companys on map
  const setCompanysOnMap = (H, hMap) => {
    companys.map(company => {

      const position = {
        lat: company.lat,
        lng: company.lng
      };
      // console.log(position);

      const skipForHireIcon = new H.map.Icon(sFHIcon);
      const skipForHirePosition = new H.map.Marker(position, { icon: skipForHireIcon });
      hMap.addObject(skipForHirePosition);

    })
  }
  /**
   * Create the map instance
   * While `useEffect` could also be used here, `useLayoutEffect` will render
   * the map sooner
   */
  useEffect(() => {
    // `mapRef.current` will be `undefined` when this hook first runs; edge case that
    if (!mapRef.current) return;
    const H = window.H;
    const platform = new H.service.Platform({
        apikey: "yB5iOTA4o3635YX5sA1Dbch7oL6uo0yB5Lr1Akke_-M"
    });
    const defaultLayers = platform.createDefaultLayers();
    const hMap = new H.Map(mapRef.current, defaultLayers.vector.normal.map, {
      center: myPositionCord,
      zoom: 10,
      pixelRatio: window.devicePixelRatio || 1
    });

    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(hMap));

    const ui = H.ui.UI.createDefault(hMap, defaultLayers);

    // My Code:

    // Create a marker icon from an image URL:
    const myPositionIcon = new H.map.Icon(myLocationIcon);
    // const skipForHireIcon = new H.map.Icon(sFHIcon);

    // Create a marker using the previously instantiated icon:
    const myPosition = new H.map.Marker(myPositionCord, { icon: myPositionIcon });
    // const skipForHirePosition = new H.map.Marker(skipForHireCord, { icon: skipForHireIcon });
    

    // Add the marker to the map:
    hMap.addObject(myPosition);
    // hMap.addObject(skipForHirePosition);

    setCompanysOnMap(H, hMap);

    //center on my position
    hMap.setCenter(myPositionCord);
    hMap.setZoom(10);

    // This will act as a cleanup to run once this hook runs again.
    // This includes when the component un-mounts
    return () => {
      hMap.dispose();
    };
  }, [mapRef, companys]); // This will run this hook every time this ref is updated

  return (
    <div>
      <div className="map" ref={mapRef} style={{ height: "200px" }} />      
    </div>
  );
};

export default MyMap;