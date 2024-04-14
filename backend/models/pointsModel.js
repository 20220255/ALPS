const { default: mongoose } = require("mongoose");

const pointsSchema = mongoose.Schema(
    {
        pointsDate: {
            type: String,
        },
        points: {
            type: Number,
            default: 0
        },
        comments: {
            type: String
        },
        userId: {
            type: mongoose.Schema.Types.ObjectId, ref: "User"
        },
        
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Points', pointsSchema)