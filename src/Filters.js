import React, {useState, useReducer} from 'react';
import close from './cancel_black.svg';

const Filters = ({filter, setFilter, filterTog, clickFilterTog}) => {

    const [filters, setFilters] = useState({
        ...filter
    });

    const show = () => {
        return filterTog ? `w3-show` : `w3-hide`;
    }

    const submit = (e) => {
        e.preventDefault();
        setFilter(filters);
        clickFilterTog();
    }

    return(
        <div className={`w3-card-4 w3-display-container w3-display-middle w3-teal ${show()}`} >
            <img className='w3-display-topright' src={close} onClick={() => clickFilterTog()} />
            <form>
                <label for='distanceMax'>max distance: {filters.distanceMax}</label>
                <input 
                    name='distanceMax'
                    type='range'
                    min={0}
                    max={150}
                    value={filters.distanceMax}
                    onChange={(e) => setFilters({
                        ...filters,
                        distanceMax: e.target.value
                        })}
                />
                <div className='w3-row-padding'>
                <label for='lowestBid'>Lowest price offer: </label>
                <input 
                    name='lowestBid'
                    type='number'
                    value={filters.lowestBid}
                    onChange={(e) => setFilters({
                        ...filters,
                        lowestBid: e.target.value
                        })}
                /></div>

                <div className='w3-row-padding'>
                    <label for='volume'>Volume: </label>
                    <input 
                        className='w3-half'
                        name='volume'
                        type='number'
                        placeholder="One"
                        value={filters.volumeMin}
                        onChange={(e) => setFilters({
                            ...filters,
                            volumeMin: e.target.value
                            })}
                    />
                    <input 
                        className='w3-half'
                        name='volume'
                        type='number'
                        placeholder="Two"
                        value={filters.volumeMax}
                        onChange={(e) => setFilters({
                            ...filters,
                            volumeMax: e.target.value
                            })}
                    />
                </div>

                <input 
                    type='submit'
                    value='apply filters'
                    onClick={(e) => submit(e)}
                />
            </form>
        </div>
    );
};

export default Filters;