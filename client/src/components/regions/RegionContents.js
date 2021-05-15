import React        from 'react';
import RegionEntries   from './RegionEntries';

const RegionContents = (props) => {

    const entries = props.subregions[0].length>0 ? props.subregions[0] : null;
    //console.log(props.activeMap)
    console.log("Going through subregion list to print")
    console.log(props.subregions)
    console.log(props.subregions[0])
    //const entries = props.activeMap ? props.activeMap : null;
    return (
        entries ? <div>
            {
                entries.map((entry, index) => (
                    <RegionEntries
                        data={entry}
                        //deleteItem={props.deleteItem} reorderItem={props.reorderItem}
                        index={index}
                        //editItem={props.editItem}
                        allRegions={props.allRegions}
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