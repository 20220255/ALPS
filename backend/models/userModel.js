const { default: mongoose } = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Please add a name"],
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      require: [true, "Please add an email"],
      unique: true,
    },
    password: {
      type: String,
      require: [true, "Please add a password"],
      unique: true,
    },
    isAdmin: {
      type: Boolean,
      require: true,
      default: false,
    },
    overallPoints: {
      type: Number,
      default: 0,
    },
    refIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Reference" }],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
