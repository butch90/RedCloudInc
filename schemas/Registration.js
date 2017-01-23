var Schema = m.mongoose.Schema({
	username: {type: String, required: true},
	password: {type: String, required: true},
	firstname: {type: String, required: true},
	lastname: {type: String, required: true},
	title: {type: String, required: false},
	email: {type: String, required: false, unique: true}
});

module.exports = m.mongoose.model("Registration", Schema);