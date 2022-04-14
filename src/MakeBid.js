import React, {useState, useContext} from 'react';
import { UserContext } from './context';
const url = `http://localhost:8081/makeBid/`; //makeBid/{professionalId}/{auctionId}

const MakeBid = ({auctionId}) => {
    const [inputData, setInputData] = useState({
        price: 0,
        timeDays: 7
    });
    const [context, setContext] = useContext(UserContext);

    const submit = (event) => {
        event.preventDefault();
        //URL builder
        const profId = context.user.id;
        const auctId = auctionId;
        const myUrl = url + profId + `/` + auctId;

        //fetch builder
        const header = {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        };
        const body = {
            date: 'today',
            price: inputData.price,
            howManyDays: inputData.timeDays,
            auctionId: auctId,
            whoBid: profId
        };
        const fetchf = async () => {
            const response = await fetch(myUrl, {
                method: 'POST',
                headers: header,
                body: JSON.stringify(body)
            });
            if(response.ok) {
                const responseJson = await response.json();
                console.log("Offer made!");
            } else console.log("Problem with response " + response.status);
        }
        fetchf();

        //fetch
        
    }

    const inputHandles = (event) => {
        const inputName = event.target.name;
        const value = event.target.value;
        setInputData(
            {
                ...inputData,
                [inputName]: event.target.value
            }
        );
    }

    return (
        <div>
            Make an offer!:
            <form onSubmit={(event) => submit(event)} className='w3-container'>
                <label className='w3-label'>Price: </label> 
                <input 
                    className='w3-inpiut '
                    type='number'
                    name='price'
                    value = {inputData.price}
                    onChange={(event) => inputHandles(event)}
                /> <br />
                <label className='w3-label'>for how long:</label> 
                <input 
                    className='w3-inpiut '
                    type='number'
                    name='timeDays'
                    value={inputData.timeDays}
                    onChange={(event) => inputHandles(event)}
                /> <br />
                <input type='submit' value='offer'/>
            </form>
            
        </div>
    )
}

export default MakeBid;