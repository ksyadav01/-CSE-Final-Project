import React        from 'react';
import MapEntries   from './MapEntries';

const MapContents = (props) => {

    const entries = props.activeMap ? props.activeMap.regionList : null;
    return (
        entries ? <div className=' table-entries container-primary'>
            {
                entries.map((entry, index) => (
                    <MapEntries
                        data={entry} key={entry._id}
                        //deleteItem={props.deleteItem} reorderItem={props.reorderItem}
                        index={index}
                        //editItem={props.editItem}
                        currentList={props.activeMap}
                    />
                ))
            }

            </div>
            : <div className='container-primary' />
    );
};

export default MapContents;