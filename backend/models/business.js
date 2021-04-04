const mongoose = require('mongoose');

const businessSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true
    },
    coverImage: {
        type: String,
        default: ''
    },
    profileImage: {
        type: String,
        default: ''
    },
    rating: {
        type: Number,
        default: 0,
    },
    categories: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        default: []
    }],
    dateCreated: {
        type: Date,
        default: Date.now,
    }
})

businessSchema.method('toJSON', function(){
    const { __v, ...object } = this.toObject();
    const { _id:id, ...result } = object;
    return { ...result, id };
});


exports.Business = mongoose.model('Business', businessSchema);