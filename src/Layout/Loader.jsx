
import React from 'react';  
import Load from '../loader.png'

function Loader(){
    return(
        <div className='Loader'>
        <img src={Load} width={28} alt='spin' />
        <div>Loading</div>
      </div>
    )
}

export default Loader;