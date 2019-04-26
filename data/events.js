// Database for handling events
const collections = require("../config/mongoCollections");
// Gets appoitments collection from db
const events = collections.events;
const helper = require("./helper");

// Exports methods for CRUD
module.exports = {
	async create(object) {
		// Function to create new events
		let eventsCollection = await events();
		let insertInfo = await eventsCollection.insertOne(object);
		if (insertInfo.insertedCount === 0) {
			throw ("Error profile.createProf: Could not add the profile to collection");
		}
		return this.read(insertInfo.insertedId);
	},

	async read(id) {
		id = await helper.convertId(id);
		let eventsCollection = await events();
		return eventsCollection.findOne({
			_id: id
		});
	},

	async readAll() {
		let eventsCollection = await events();
		return eventsCollection.find({}).toArray();
	},

	async update(id) {
		id = await helper.convertId(id);
		let eventsCollection = await events();
	},

	async delete(id) {
		id = await helper.convertId(id);
		let event = await this.read(id);
		let eventsCollection = await events();
		let deletionInfo = await eventsCollection.removeOne({
			_id: id
		});
		if (deletionInfo.deletedCount === 0) throw "Error: events delete deletedCount == 0";
		return {
			deleted: true,
			data: event
		};
	},

	async deleteAll() {
        const eventsCollection = await events();
        await eventsCollection.deleteMany({});
    },
};