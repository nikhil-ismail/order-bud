const mongoose = require('mongoose');

const businessSchema = mongoose.Schema({
    name: {
        type: String,
        default: ''
    },
    address: {
        type: String,
        default: ''
    },
    coverImage: {
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
    },
    delivery: {
        type: Boolean,
        default: false
    },
    pickup: {
        type: Boolean,
        default: false
    },
    owner: {
        type: String,
        required: true
    }
})

businessSchema.method('toJSON', function(){
    const { __v, ...object } = this.toObject();
    const { _id:id, ...result } = object;
    return { ...result, id };
});


exports.Business = mongoose.model('Business', businessSchema);