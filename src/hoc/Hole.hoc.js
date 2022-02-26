import React, { useState } from 'react';

const withHole = Component => {
    const verifiedTile = ({id, value, ...props}) => {
        return <Component verified={id + 1 === value} value={value} {...props}/>
    }

    return verifiedTile
}
 
export default withHole