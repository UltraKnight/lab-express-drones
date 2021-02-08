// Iteration #1
const mongoose = require('mongoose');
const Drone = require('../models/Drone.model');
// const DB_NAME = 'express-drones-dev';
// mongoose.connect(`mongodb://localhost/${DB_NAME}`, {
//   useCreateIndex: true,
//   useNewUrlParser: true,
//   useUnifiedTopology: true
// });
require('../configs/db.config');

const drones = [
    { name: 'Creeper XL 500', propellers: 3, maxSpeed: 12 },
    { name: 'Racer 57', propellers: 4, maxSpeed: 20 },
    { name: 'Courier 3000i', propellers: 6, maxSpeed: 18 }
];

async function createDrone() {
    try {
        await Drone.create(drones);
        console.log('Drones inserted!');
        mongoose.connection.close();
    } catch (error) {
        console.log(`Error while inserting drones ${error}`);
    }
}

createDrone();