import React        from 'react';
import RegionEntries   from './RegionEntries';

const RegionContents = (props) => {

    const entries = props.subregions ? props.subregions : null;
    //console.log(props.activeMap)
    console.log("Going through subregion list to print")

    console.log(props.subregions)
    //const entries = props.activeMap ? props.activeMap : null;
    return (
        entries ? <div>
            {
                entries.map((entry, index) => (
                    <RegionEntries
                        data={entry}
                        //deleteItem={props.deleteItem} reorderItem={props.reorderItem}
                        index={index}
                        // editItem={props.editItem}
                        // allRegions={props.allRegions}
                        editRegion={props.editRegion}
                        currentRegionMap={props.currentRegionMap}
                        deleteRegion={props.deleteRegion}
                        updateMapName={props.updateMapName}
                    />
                ))
            }

            </div>
            : <div className='container-primary' />
    );
};

export default RegionContents;