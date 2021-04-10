const ObjectId = require('mongoose').Types.ObjectId;
const Todolist = require('../models/todolist-model');

// The underscore param, "_", is a wildcard that can represent any value;
// here it is a stand-in for the parent parameter, which can be read about in
// the Apollo Server documentation regarding resolvers

module.exports = {
	Query: {
		/** 
		 	@param 	 {object} req - the request object containing a user id
			@returns {array} an array of todolist objects on success, and an empty array on failure
		**/
		getAllTodos: async (_, __, { req }) => {
			const _id = new ObjectId(req.userId);
			if(!_id) { return([])};
			const todolists = await Todolist.find({owner: _id});
			if(todolists) return (todolists);

		},
		/** 
		 	@param 	 {object} args - a todolist id
			@returns {object} a todolist on success and an empty object on failure
		**/
		getTodoById: async (_, args) => {
			const { _id } = args;
			const objectId = new ObjectId(_id);
			const todolist = await Todolist.findOne({_id: objectId});
			if(todolist) return todolist;
			else return ({});
		},
	},
	Mutation: {
		/** 
		 	@param 	 {object} args - a todolist id and an empty item object
			@returns {string} the objectID of the item or an error message
		**/
		addItem: async(_, args) => {
			const { _id, item , index } = args;
			const listId = new ObjectId(_id);
			const objectId = new ObjectId();
			const found = await Todolist.findOne({_id: listId});
			if(!found) return ('Todolist not found');
			if(item._id === '') item._id = objectId;
			let listItems = found.items;
			if(index < 0) listItems.push(item);
   			else listItems.splice(index, 0, item);
			console.log(listItems)
			const updated = await Todolist.updateOne({_id: listId}, { items: listItems });

			if(updated) return (item._id);
			else return ('Could not add item');
		},
		/** 
		 	@param 	 {object} args - an empty todolist object
			@returns {string} the objectID of the todolist or an error message
		**/
		addTodolist: async (_, args) => {
			const { todolist } = args;
			const objectId = new ObjectId();
			const { id, name, owner, items } = todolist;
			const newList = new Todolist({
				_id: objectId,
				id: id,
				name: name,
				owner: owner,
				items: items,
				prevItems: items
			});
			const updated = newList.save();
			if(updated) return objectId;
			else return ('Could not add todolist');
		},
		/** 
		 	@param 	 {object} args - a todolist objectID and item objectID
			@returns {array} the updated item array on success or the initial 
							 array on failure
		**/
		deleteItem: async (_, args) => {
			console.log("dfssimone sucksnklsdakjnsd")
			const  { _id, itemId } = args;
			const listId = new ObjectId(_id);
			const found = await Todolist.findOne({_id: listId});
			let listItems = found.items;
			listItems = listItems.filter(item => item._id.toString() !== itemId);
			const updated = await Todolist.updateOne({_id: listId}, { items: listItems })
			if(updated) return (listItems);
			else return (found.items);

		},
		/** 
		 	@param 	 {object} args - a todolist objectID 
			@returns {boolean} true on successful delete, false on failure
		**/
		deleteTodolist: async (_, args) => {
			const { _id } = args;
			const objectId = new ObjectId(_id);
			const deleted = await Todolist.deleteOne({_id: objectId});
			if(deleted) return true;
			else return false;
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
			@param	 {object} args - a todolist objectID, an item objectID, field, and
									 update value. Flag is used to interpret the completed 
									 field,as it uses a boolean instead of a string
			@returns {array} the updated item array on success, or the initial item array on failure
		**/
		updateItemField: async (_, args) => {
			const { _id, itemId, field,  flag } = args;
			let { value } = args
			const listId = new ObjectId(_id);
			const found = await Todolist.findOne({_id: listId});
			let listItems = found.items;
			if(flag === 1) {
				if(value === 'complete') { value = true; }
				if(value === 'incomplete') { value = false; }
			}
			listItems.map(item => {
				if(item._id.toString() === itemId) {
					item[field] = value;
				}
			});
			const updated = await Todolist.updateOne({_id: listId}, { items: listItems })
			if(updated) return (listItems);
			else return (found.items);
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
		reorderItemsDescription: async (_, args) => {
			const { _id} = args;
			const listId = new ObjectId(_id);
			let found = await Todolist.findOne({_id: listId});
			let listItems = found.items;
			let dupItems = []
			for(let i=0; i< listItems.length; i++){
				dupItems.push(listItems[i])
			}
			let isSorted=true
			await listItems.sort((a,b) => a.description.localeCompare(b.description))
			for(let i=0; i< listItems.length; i++){
				if (listItems[i]!=dupItems[i]){
					isSorted = false;
					break;
				}
			}
			if (isSorted==true){
				listItems.sort((a,b) => b.description.localeCompare(a.description))
			}
			const updated = await Todolist.updateOne({_id: listId}, { items: listItems })
			console.log("asd")
			if(updated) return (listItems);
			// return old ordering if reorder was unsuccessful
			listItems = found.items;
			return (found.items);
		},

		reorderItemsDescription1: async (_, args) => {
			console.log("bjhkdshbjsdabjkhasdbkj")
			const { _id, originalItems} = args;
			const listId = new ObjectId(_id);
			let found = await Todolist.findOne({_id: listId});
			let listItems = found.items;
			//listItems.sort((a,b) => a.description.localeCompare(b.description))
			const updated = await Todolist.updateOne({_id: listId}, { items: originalItems })
			if(updated) return (listItems);
			// return old ordering if reorder was unsuccessful
			listItems = found.items;
			return (found.items);
		},
		
		reorderItemsDate: async (_, args) => {
			const { _id} = args;
			const listId = new ObjectId(_id);
			const found = await Todolist.findOne({_id: listId});
			let listItems = found.items;
			let dupItems = []
			for(let i=0; i< listItems.length; i++){
				dupItems.push(listItems[i])
			}

			let isSorted=true
			//listItems.sort((a,b) => a.due_date.localeCompare(b.due_date))
			listItems.sort(function(a,b){
				
					if(a.due_date==b.due_date)
						return 0
					if(b.due_date=="No Date")
						return -1
					if(a.due_date=="No Date")
						return 1
					date1=a.due_date.split("-")
					date2=b.due_date.split("-")
					if(parseInt(date1[0])>parseInt(date2[0]))
						return 1
					if(parseInt(date1[0])<parseInt(date2[0]))
						return -1
					if(parseInt(date1[1])>parseInt(date2[1]))
						return 1
					if(parseInt(date1[1])<parseInt(date2[1]))
						return -1
					if(parseInt(date1[2])>parseInt(date2[2]))
						return 1
					if(parseInt(date1[2])<parseInt(date2[2]))
						return -1
				
			});
			for(let i=0; i< listItems.length; i++){
				if (listItems[i]!=dupItems[i]){
					isSorted = false;
					break;
				}
			}
			if (isSorted==true){
				listItems.sort(function(a,b){
				
					if(b.due_date==a.due_date)
						return 0
					if(a.due_date=="No Date")
						return -1
					if(b.due_date=="No Date")
						return 1
					date1=a.due_date.split("-")
					date2=b.due_date.split("-")
					if(parseInt(date1[0])>parseInt(date2[0]))
						return -1
					if(parseInt(date1[0])<parseInt(date2[0]))
						return 1
					if(parseInt(date1[1])>parseInt(date2[1]))
						return -1
					if(parseInt(date1[1])<parseInt(date2[1]))
						return 1
					if(parseInt(date1[2])>parseInt(date2[2]))
						return -1
					if(parseInt(date1[2])<parseInt(date2[2]))
						return 1
				
			});
			}
			const updated = await Todolist.updateOne({_id: listId}, { items: listItems })
			if(updated) return (listItems);
			// return old ordering if reorder was unsuccessful
			listItems = found.items;
			return (found.items);

		},
		reorderItemsStatus: async (_, args) => {
			const { _id} = args;
			const listId = new ObjectId(_id);
			const found = await Todolist.findOne({_id: listId});
			let listItems = found.items;
			let dupItems = []
			for(let i=0; i< listItems.length; i++){
				dupItems.push(listItems[i])
			}

			let isSorted=true

			listItems.sort((a,b) => a.completed.toString().localeCompare(b.completed.toString()	))
			for(let i=0; i< listItems.length; i++){
				if (listItems[i]!=dupItems[i]){
					isSorted = false;
					break;
				}
			}
			if (isSorted==true){
				listItems.sort((a,b) => b.completed.toString().localeCompare(a.completed.toString()	))
			}
			const updated = await Todolist.updateOne({_id: listId}, { items: listItems })
			if(updated) return (listItems);
			// return old ordering if reorder was un	successful
			listItems = found.items;
			return (found.items);

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
			// IT DOESNT WORK AHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHHH
			/*
			console.log(i)
			lists.splice(i, 1)
			lists.unshift(found)
			const updated = await Todolist.updateOne({_id: listId}, {id:(minId-1)});
			//console.log(minId)
			//lists.forEach(x=>minId=Math.min(minId, x.id))
			//console.log(minId)
			//const updated = await Todolist.updateOne({_id: listId}, {id:(minId-1)});
			//list = Todolist.findOne({id: minId});
			if(updated)
				return list
				*/
			return lists[0]


		}
	}

}