const ObjectId = require('mongoose').Types.ObjectId;
const Region = require('../models/region-model');

// The underscore param, "_", is a wildcard that can represent any value;
// here it is a stand-in for the parent parameter, which can be read about in
// the Apollo Server documentation regarding resolvers

module.exports = {
	Query: {
		getAllRegions: async (_, __, { req }) => {
			const _id = new ObjectId(req.userId);
			if(!_id) { return([])};
			//console.log(_id)
            //console.log("tester")
			const region = await Region.find({owner: _id});

			//console.log(region)
            
            //console.log("tester")
			if(region) return (region);
		},
		/** 
		 	@param 	 {object} args - a todolist id
			@returns {object} a todolist on success and an empty object on failure
		**/
		getRegionById: async (_, args) => {
			const { _id } = args;
			const objectId = new ObjectId(_id);
			const region = await Region.findOne({_id: objectId});
            //console.log(region)
            console.log("maybe?")
			if(region) return region;
            console.log("sd")
			return ({});
		},
	},
	Mutation: { 
		/** 
		 	@param 	 {object} args - a todolist id and an empty item object
			@returns {string} the objectID of the item or an error message
		**/
		createNewRegion: async(_,args)=>{
			const { region, parentId } = args
			const objectId = new ObjectId();
			const { _id, id, name, capital, leader, owner,flag, types, landmarks, subregions } = region
			const newRegion = new Region({
                _id: objectId,
                id: 1123,
                name: name,
                capital: capital,
                types: types,
                leader: leader,
                owner: owner,
                flag: flag,
                landmarks: landmarks,
                subregions: subregions
			});
			const updated = await newRegion.save();
			console.log("Created new region")
            if(parentId !="kekw"){
                const found = await Region.findOne({_id: parentId});
                if(found){
                    subList = found.subregions;
                    subList.push(objectId)
                    const updated2 = await Region.updateOne({_id: parentId}, {subregions: subList});
                    if(updated2){
                        console.log("Updated the subregion list for region")
                    }
                
                }
            }
			if(updated){
				return objectId;
			}
			return ("can't add region");
		},
		
		/** 
		 	@param 	 {object} args - a todolist objectID 
			@returns {boolean} true on successful delete, false on failure
		**/
		deleteRegion: async (_, args) => {
			const { _id, parentId } = args;
			const objectId = new ObjectId(_id);
			const deleted = await Region.deleteOne({_id: objectId});
			const found = await Region.findOne({_id: parentId});
			let subList = found.subregions
			subIndex = subList.indexOf(_id)
			subList.splice(subIndex, 1)
			const updated = await Region.updateOne({_id: parentId}, {subregions: subList});
			if(deleted) return true;
			else return false;
		},
		/** 
		 	@param 	 {object} args - a todolist objectID 
			@returns {boolean} true on successful delete, false on failure
		**/
		deleteMap: async (_, args) => {
			const { _id } = args;
			const objectId = new ObjectId(_id);
			const deleted = await Region.deleteOne({_id: objectId});
			if(deleted) return true;
			else return false;
		},
		/** 
		 	@param 	 {object} args - a todolist objectID, field, and the update value
			@returns {boolean} true on successful update, false on failure
		**/
		updateRegionName: async (_, args) => {
			const {value, _id } = args;
			const objectId = new ObjectId(_id);
			const updated = await Region.updateOne({_id: objectId}, {name: value});
			if(updated) return value;
			else return "";
		},
		/** 
			@param	 {object} args - a todolist objectID, an item objectID, field, and
									 update value. Flag is used to interpret the completed 
									 field,as it uses a boolean instead of a string
			@returns {array} the updated item array on success, or the initial item array on failure
		**/
		updateRegionField: async (_, args) => {
			const {itemId, field, value } = args;
			const objectId = new ObjectId(itemId);
			// const found = await Region.findOne({_id: regionId});
			// let subregions = found.subregions;
			// subregions.map(id => {
			// 	if(id === itemId) {
            //         const reg = await Region.findOne({_id: id});
			// 		reg[field] = value;
			// 	}
			// });
			const updated = await Region.updateOne({_id: objectId}, { [field]: value })
			if(updated) return ("done");
			else return "";
		},
		/** 
		 	@param 	 {object} args - a todolist objectID, field, and the update value
			@returns {boolean} true on successful update, false on failure
		**/
		updateTodolistField: async (_, args) => {
			const { field, value, _id } = args;
			const objectId = new ObjectId(_id);
			const updated = await Todolist.updateOne({_id: objectId}, {[field]: value});
			if(updated) return value;
			else return "";
		},
		/**
			@param 	 {object} args - contains list id, item to swap, and swap direction
			@returns {array} the reordered item array on success, or initial ordering on failure
		**/
		reorderItems: async (_, args) => {
			const { _id, itemId, direction } = args;
			const listId = new ObjectId(_id);
			const found = await Todolist.findOne({_id: listId});
			let listItems = found.items;
			const index = listItems.findIndex(item => item._id.toString() === itemId);
			// move selected item visually down the list
			if(direction === 1 && index < listItems.length - 1) {
				let next = listItems[index + 1];
				let current = listItems[index]
				listItems[index + 1] = current;
				listItems[index] = next;
			}
			// move selected item visually up the list
			else if(direction === -1 && index > 0) {
				let prev = listItems[index - 1];
				let current = listItems[index]
				listItems[index - 1] = current;
				listItems[index] = prev;
			}
			const updated = await Todolist.updateOne({_id: listId}, { items: listItems })
			if(updated) return (listItems);
			// return old ordering if reorder was unsuccessful
			listItems = found.items;
			return (found.items);

		},
		reorderRegionName: async (_, args) => {
			const { _id} = args;
			const regionId = new ObjectId(_id);
			let found = await Region.findOne({_id: regionId});
			let subregionsId = found.subregions;
			let dupRegionIds = []
			let values = await Promise.all(subregionsId.map(temp => Region.findOne({_id: temp})));
			for(let i=0; i< values.length; i++){
				dupRegionIds.push(values[i])
			}
			let isSorted=true
			values.sort((a,b) => a.name.localeCompare(b.name))
			for(let i=0; i< values.length; i++){
				if (values[i]!=dupRegionIds[i]){
					isSorted = false;
					break;
				}
			}
			if (isSorted==true){
				values.sort((a,b) => b.name.localeCompare(a.name))
				// await subregionsId.sort(async function(a,b) {
				// 	tempA = new ObjectId(a);
				// 	tempB = new ObjectId(b);
				// 	temp1 = await Region.findOne({_id: tempB}).name
				// 	temp2 = await Region.findOne({_id: tempA}).name
				// 	if(temp1 < temp2){
				// 		return -1;
				// 	}
				// 	if(temp1 > temp2){
				// 		return 1;
				// 	}
				// 	return 0;
				// 	 //(await Region.findOne({_id: a}).name).localeCompare(await Region.findOne({_id: b}).name))
				//});
			}
			subregionsId = []
			for(let a = 0; a < values.length; a++){
				subregionsId.push(values[a]._id)
			}
			const updated = await Region.updateOne({_id: regionId}, { subregions: subregionsId })
			console.log(subregionsId)
			if(updated) return ("done");
			subregionsId = found.subregions;
			return ("not done rip");
		},

		reorderRegionFlipper: async (_, args) => {
			console.log("bjhkdshbjsdabjkhasdbkj")
			const { _id, prevRegions} = args;
			const regionId = new ObjectId(_id);
			let found = await Region.findOne({_id: regionId});
			let subregions = found.subregions;
			//listItems.sort((a,b) => a.description.localeCompare(b.description))
			const updated = await Region.updateOne({_id: regionId}, { subregions: prevRegions })
			if(updated) return ("done");
			// return old ordering if reorder was unsuccessful
			subregions = found.subregions;
			return ("not done");
		},
		
		reorderRegionCapital: async (_, args) => {
			const { _id} = args;
			const regionId = new ObjectId(_id);
			let found = await Region.findOne({_id: regionId});
			let subregionsId = found.subregions;
			let dupRegionIds = []
			let values = await Promise.all(subregionsId.map(temp => Region.findOne({_id: temp})));
			for(let i=0; i< values.length; i++){
				dupRegionIds.push(values[i])
			}
			let isSorted=true
			values.sort((a,b) => a.capital.localeCompare(b.capital))
			for(let i=0; i< values.length; i++){
				if (values[i]!=dupRegionIds[i]){
					isSorted = false;
					break;
				}
			}
			if (isSorted==true){
				values.sort((a,b) => b.capital.localeCompare(a.capital))
			}
			subregionsId = []
			for(let a = 0; a < values.length; a++){
				subregionsId.push(values[a]._id)
			}
			const updated = await Region.updateOne({_id: regionId}, { subregions: subregionsId })
			console.log(subregionsId)
			if(updated) return ("done");
			subregionsId = found.subregions;
			return ("not done rip");
		},
		reorderRegionLeader: async (_, args) => {
			const { _id} = args;
			const regionId = new ObjectId(_id);
			let found = await Region.findOne({_id: regionId});
			let subregionsId = found.subregions;
			let dupRegionIds = []
			let values = await Promise.all(subregionsId.map(temp => Region.findOne({_id: temp})));
			for(let i=0; i< values.length; i++){
				dupRegionIds.push(values[i])
			}
			let isSorted=true
			values.sort((a,b) => a.leader.localeCompare(b.leader))
			for(let i=0; i< values.length; i++){
				if (values[i]!=dupRegionIds[i]){
					isSorted = false;
					break;
				}
			}
			if (isSorted==true){
				values.sort((a,b) => b.leader.localeCompare(a.leader))
			}
			subregionsId = []
			for(let a = 0; a < values.length; a++){
				subregionsId.push(values[a]._id)
			}
			const updated = await Region.updateOne({_id: regionId}, { subregions: subregionsId })
			console.log(subregionsId)
			if(updated) return ("done");
			subregionsId = found.subregions;
			return ("not done rip");
		},
		reorderItemsAssign: async (_, args) => {
			const { _id} = args;
			const listId = new ObjectId(_id);
			let found = await Todolist.findOne({_id: listId});
			let listItems = found.items;
			let dupItems = []
			for(let i=0; i< listItems.length; i++){
				dupItems.push(listItems[i])
			}
			let isSorted=true
			await listItems.sort((a,b) => a.assigned_to.localeCompare(b.assigned_to))
			for(let i=0; i< listItems.length; i++){
				if (listItems[i]!=dupItems[i]){
					isSorted = false;
					break;
				}
			}
			if (isSorted==true){
				listItems.sort((a,b) => b.assigned_to.localeCompare(a.assigned_to))
			}
			const updated = await Todolist.updateOne({_id: listId}, { items: listItems })
			console.log("asd")
			console.log(listItems)
			if(updated) return (listItems);
			// return old ordering if reorder was unsuccessful
			listItems = found.items;
			return (found.items);
		},
		moveListToTop: async(_,args) =>{
			const {_id}=args;
			const listId = new ObjectId(_id);
			const lists = await Todolist.find()
			let minId = lists[0].id
			let i
			let found = await Todolist.findOne({_id: listId});
			for(i = 0; i < lists.length; i++){
				if(lists[i]==found)
					break
			}
			return lists[0]


		}
	}

}