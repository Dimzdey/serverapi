const mongoose = require('mongoose');

var ReviewSchema = mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    text: {
      type: String,
      required: true
    },
    created_by: {
          user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true
          },
          username: {
            type: String,
            required: true
          }
    },
    create_date: {
        type: Date,
        default: Date.now
    }
});

var Review = mongoose.model('Review', ReviewSchema);

module.exports = {
    Review
};
