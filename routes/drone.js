const express = require('express');
// require the Drone model here
const Drone = require('../models/Drone.model');

const router = express.Router();

router.get('/drones', async (req, res, next) => {
  // Iteration #2: List the drones
  // ... your code here
  const allDrones = await Drone.find();
  res.render('drones/list', { drones : allDrones });
});

router.get('/drones/create', (req, res, next) => {
  // Iteration #3: Add a new drone
  // ... your code here
  res.render('drones/create-form');
});

router.post('/drones/create', async (req, res, next) => {
  // Iteration #3: Add a new drone
  // ... your code here
  const {name, propellers, maxSpeed} = req.body;
  try {
    await Drone.create({name, propellers, maxSpeed});
    res.redirect('/drones');
  } catch (error) {
    res.render('drones/create-form');
  }
});

router.get('/drones/:id/edit', async (req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here

  const droneFromDB = await Drone.findById(req.params.id);
  res.render('drones/update-form', {drone : droneFromDB});
});

router.post('/drones/:id/edit', async (req, res, next) => {
  // Iteration #4: Update the drone
  // ... your code here
  const {name, propellers, maxSpeed} = req.body;
  try {
    await Drone.findByIdAndUpdate(req.params.id, {name, propellers, maxSpeed});
    res.redirect('/drones');
  } catch (error) {
      const droneFromDB = await Drone.findById(req.params.id);
      res.render('drones/update-form', {drone : droneFromDB});
  }
});

router.post('/drones/:id/delete', async (req, res, next) => {
  // Iteration #5: Delete the drone
  // ... your code here
  try {
    await Drone.findByIdAndDelete(req.params.id);
    res.redirect('/drones');
  } catch (error) {
    console.log(`Error while deleting a drone ${error}`);
  }
});

module.exports = router;
