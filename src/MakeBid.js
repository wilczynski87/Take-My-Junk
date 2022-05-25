/*
- odswierzanie bid-ow, po zlozeniu oferty
*/
import React, {useState, useContext} from 'react';
import { UserContext } from './context';
const url = `http://localhost:8081/makeBid/`; //makeBid/{professionalId}/{auctionId}

const MakeBid = ({refreshBid, auctionBody}) => {
    const [inputData, setInputData] = useState({
        price: 0,
        timeDays: 7
    });
    const [context, setContext] = useContext(UserContext);

    const submit = (event) => {
        event.preventDefault();
        //URL builder
        const profId = context.user.id;
        const auctId = auctionBody.id;
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
            profFirm: context.user.firm,
            startDate: auctionBody.startDate,
            endDate: auctionBody.endDate,
            whoBid: profId
        };
        console.log(body);
        const fetchf = async () => {
            const response = await fetch(myUrl, {
                method: 'POST',
                headers: header,
                body: JSON.stringify(body)
            });
            if(response.ok) {
                const responseJson = await response.json();
                await refreshBid();
                console.log(response);
            } else console.log("Problem with response " + response.status);
        }
        fetchf();
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
        <div className='w3-display-container '>
            Make an offer!:
            <form onSubmit={(event) => submit(event)} className='w3-container'>
                <label className='w3-label'>Price: 
                <input 
                    className='w3-inpiut '
                    type='number'
                    name='price'
                    value = {inputData.price}
                    onChange={(event) => inputHandles(event)}
                    style={{maxWidth: `50%`}}
                /> </label>  <br />
                <label className='w3-label'>for how long:
                <input 
                    className='w3-inpiut '
                    type='number'
                    name='timeDays'
                    value={inputData.timeDays}
                    onChange={(event) => inputHandles(event)}
                    style={{maxWidth: `50%`}}
                /> </label>  <br />
                <input type='submit' value='offer'/>
            </form>
            
        </div>
    )
}

export default MakeBid;