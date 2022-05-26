import React, {useEffect, useReducer} from "react";

const JunkType = ({junkType, setJunkType}) => {

    const [click, setClick] = useReducer((click) => !click, false)

    useEffect(() => {

    }, [])
    const show = () => {
        return click ? `w3-hide` : `w3-show`;
    }

    const type = [`ALL`, `mix`, `bio`, `construction_debris`, `wood`, `food`, `sewage`, `other`, `branches`, `grass`, `leaves`, 
    `plastic`, `steel`, `electronics`, `glass`, `paper`, `soil`, `ground`];

    const junkChoice = (type) => {
        if(type === `ALL`) {
            setJunkType(null);
        } else setJunkType(type);
        setClick();
    };

    const renameType = (name) => {
        switch(name){
            case `ALL`:
            return null;
            default:
            return name;
        }

    }

    return(
        <div onClick={() => setClick()} className="w3-dropdown-click 3w-teal">
            <div>Junk Type: </div>
            <div className={`w3-dropdown-content w3-bar-block w3-border ${show()}`}>
                {type.map(t => {
                    return (
                        <div onClick={() => junkChoice(t)} className={renameType(t) === renameType(junkType) ? `w3-green` : null}>
                            {t} 
                        </div>
                    )
                })}
            </div>
        </div>
    );
};

export default JunkType;