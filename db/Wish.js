const mongoose = require("mongoose");

// user schema
const Wish = new mongoose.Schema({
  id: { type: String,required: [true, "Please provide an id"], unique: [true, "Id Exist"]},
  name: { type: String, required: [true, "Please provide an Name!"] },

  //   password field
  content : {
    type: String,
    required: [true, "Please provide a wish!"],
  },
  arrive : {
    type: String,
    required: [true, "Please provide a arrive!"],
  }
},
{
  timestamps: {
    createdAt: 'created_at', // Use `created_at` to store the created date
    updatedAt: 'updated_at' // and `updated_at` to store the last updated date
  }
});

// export UserSchema
module.exports = mongoose.model.Wish || mongoose.model("Wish", Wish);
