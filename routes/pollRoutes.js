const express = require('express');
const Poll = require('../models/poll');


const pollRoutes = express.Router();


pollRoutes.post('/createPoll', auth, async (req, res) => {
    const { userId, description, department, profilePicture, pollQuestion, pollOptions, groupID } = req.body;
  
    if (!pollQuestion || !pollOptions || pollOptions.length < 2) {
      return res.status(400).json({ error: 'Poll question and at least 2 options are required.' });
    }
  
    try {
      const newPoll = new Poll({
        userId,
        description,
        department,
        profilePicture,
        pollQuestion,
        pollOptions: pollOptions.map(option => ({ option })),
        groupID,
      });
  
      const savedPoll = await newPoll.save();
      res.status(201).json(savedPoll);
    } catch (error) {
      console.error('Error creating poll:', error);
      res.status(500).json({ error: 'Server error' });
    }
  });
  
  module.exports = pollRoutes;