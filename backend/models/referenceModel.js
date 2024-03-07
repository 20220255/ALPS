const { default: mongoose } = require("mongoose");

const referenceSchema = new mongoose.Schema(
    {
        refId: {
            type: String,
            require: true
        },
        claimDate: {
            type: String,
        },
        claimed: {
            type: Boolean,
            default: false
        },
        refPoints: {
            type: Number,
            default: 0
        },
        pointsIds: [{type: mongoose.Schema.Types.ObjectId, ref: "Points" }]
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Reference', referenceSchema)