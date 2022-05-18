import React, {useState, useContext, useReducer} from "react";
import MyMap from "./MyMap";
import { UserContext } from "./context";
import VisitCard from "./VisitCard";

const MapAndProf = () => {

    const [visitCardOn, setVisitCardOn] = useState("none")

    const [context, setContext] = useContext(UserContext);

    const [distance, setDistance] = useState(50);
    const [companys, setCompanys] = useState([]);

    const myPositionCord = { lat: context.user.address.lat, lng: context.user.address.lng};

    const profs = (comp, key) => {

        return(<div key={key} id={comp.email} onClick={(e) => setVisitCardOn(e.target.id)} >
            <VisitCard 
                visitCardOn={visitCardOn}
                setVisitCardOn = {setVisitCardOn}
                company={comp}
            />
            {key+1 + ` ` + comp.name}<br />
        </div>);
    };

    const profOnMap = (e) => {
        e.preventDefault();
        // looking for providers:
        getProfOnMap(distance)
        .catch(e => {
          console.log(`some error: ` + e);
        })
      };
    
      // My Code -> for nearby skip companys
      const getProfOnMap = async (distance) => {
        //urlBuilder
        const urlBaze = `http://localhost:8081/profPos/`;
        const url = urlBaze + distance + `/` + myPositionCord.lat + `/` + myPositionCord.lng;
    
        //fetch
        const rawResponse = await fetch(url);
    
        if(rawResponse.ok) {
          const responce = await rawResponse.json();
          // console.log(responce);
          setCompanys(responce);
        } else {
          console.log(`Wrong responsce status`)
        }
      }

    return(
        <div>
            <div><MyMap companys={companys} /></div>
            <form>
                <input type='number' value={distance} onChange={(event) => setDistance(event.target.value)}/>
                <input type='submit' onClick={(e) => profOnMap(e)} value='Check providers' />
            </form>
            <div>{companys.map((comp, key) => profs(comp, key))}</div>
        </div>
    );
};

export default MapAndProf;