import React, {useState, useEffect} from 'react';
import withHole from '../hoc/Hole.hoc';

function Tile({verified, value, swap}) {

    const [currentValue, setValue] = useState(value);
    const [isHole, setIsHole] = useState(value === 0);

    useEffect(()=>{
        setIsHole(value === 0);
        setValue(value);
    }, [value])

    return(
        <div 
            className={`border-gray-300 border rounded m-1 w-full h-full grid place-items-center cursor-pointer ${verified ? 'border-green-500': ''} ${isHole ? 'border-0': ''}`}
            onClick={ () => swap(value)}
        >
            {currentValue != 0 ? currentValue : null }
        </div>
    )
}

export default withHole(Tile);