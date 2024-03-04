const { default: mongoose, Schema } = require("mongoose");

const pointsSchema = mongoose.Schema(
    {
        refId: {
            type: String,
            require: true
        },
        pointsDate: {
            type: String,
        },
        claimed: {
            type: Boolean,
            default: false
        },
        points: {
            type: Number,
            default: 0
        },
        comments: {
            type: String
        },
        userId: {
            type: Schema.Types.ObjectId,
            ref: 'User'
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Points', pointsSchema)