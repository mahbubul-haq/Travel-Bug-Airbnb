const mongoose = require('mongoose');

const mongoURI = "mongodb://localhost:27017/travel-bug-db"; //localmachine

// uri format = mongodb+srv://travel-bug:<password>@travel-bug-cluster.jj68x.mongodb.net/?retryWrites=true&w=majority
// const mongoURI = "mongodb+srv://travel-bug:travel-bug@travel-bug-cluster.jj68x.mongodb.net/travel-bug-db?retryWrites=true&w=majority"; //mongo cloud

const connectToMongo = () => {
    mongoose.connect(mongoURI, () => {
        console.log('Connected to MongoDB successfully');
    });
}

module.exports = connectToMongo;