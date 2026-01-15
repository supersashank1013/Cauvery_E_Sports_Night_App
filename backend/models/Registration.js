const mongoose = require("mongoose");

const playerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    inGameId: {
        type: String,
        required: true,
        trim: true
    },
    teamLeaderName: {
        type: String,
        required: true,
        trim: true
    }
});

const registrationSchema = new mongoose.Schema(
  {
    teamName: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },

    teamLeaderName: {
      type: String,
      required: true,
      trim: true,
    },

    contactPhone: {
      type: String,
      required: true,
    },

    contactEmail: {
      type: String,
      required: true,
      lowercase: true,
      trim: true,
    },

    game: {
      type: String,
      required: true,
    },

    // OPTIONAL FOR NOW
    players: {
      type: Array,
      default: [],
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Registration", registrationSchema);

