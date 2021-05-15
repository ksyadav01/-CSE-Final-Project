import React        from 'react';
import MapEntries   from './MapEntries';

const MapContents = (props) => {

    const entries = props.maps ? props.maps : null;
    //const entries = props.activeMap ? props.activeMap : null;
    return (
        entries ? <div>
            {
                entries.map((entry, index) => (
                    <MapEntries
                        data={entry} key={entry._id}
                        //deleteItem={props.deleteItem} reorderItem={props.reorderItem}
                        index={index}
                        //editItem={props.editItem}
                        maps={props.maps}
                        deleteMap={props.deleteMap}
                        updateMapName={props.updateMapName}
                    />
                ))
            }

            </div>
            : <div className='container-primary' />
    );
};

export default MapContents;