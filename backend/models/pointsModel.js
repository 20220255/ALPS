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
        
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Points', pointsSchema)