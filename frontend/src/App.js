import { useState } from 'react';
import GoToTopService from './api/gototop/GoToTopService.js'
import MountainAreaList from './components/SearchStretch/MountainAreas/MountainAreaList.js';

function App() {

    const areas = GoToTopService.MountainAreasData();

    const saveCickedAreaHandler = (area) => {

         console.log(area);
          
      };

    return (
        
        <div>
            <MountainAreaList
                getCickedAreaHandler={saveCickedAreaHandler}
                areas={areas}/>
        </div>
    )        
    
}


export default App;
