const { Schema, model } = require("mongoose");

const ProfileSchema = new Schema(
  {
    bio: String,
    image: String,
    owner: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = model("Profile", ProfileSchema);
