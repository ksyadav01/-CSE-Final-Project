import React        from 'react';
import ViewerEntries   from './ViewerEntries';

const ViewerContents = (props) => {

    const entries = props.landmarks ? props.landmarks : null;
    //console.log(props.activeMap)
    console.log("Going through landmark list to print")

    //console.log(props.allregions)
    //const entries = props.activeMap ? props.activeMap : null;
    return (
        entries ? <div>
            {
                entries.map((entry, index) => (
                    <ViewerEntries
                        data={entry}
                        //deleteItem={props.deleteItem} reorderItem={props.reorderItem}
                        index={index}
                        // editItem={props.editItem}
                        // allRegions={props.allRegions}
                        deleteLandmark={props.deleteLandmark}
                        addLandmark={props.addLandmark}
                        allregions={props.allregions}
                    />
                ))
            }
            
            </div>
            : <div className='container-primary' />
    );
};

export default ViewerContents;