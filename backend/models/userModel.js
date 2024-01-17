const { default: mongoose } = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      require: [true, "Please add a name"],
    },
    lastName: {
      type: String,
      // require: [true, "Please add a name"],
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
    points: {
      type: Number,
      default: 0,
      require: true,
    },
    lastDateVisited: {
      type: String,
      default: 'N.A.'
    },
    refId: {
        type: String,
        require: false,
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
