const express = require("express");
const Notification = require("../models/notification");

const notificationRoutes = express.Router();

notificationRoutes.get("/", async (req, res) => {
    try {        
        const notifications = await Notification.find({ follow: true });

        
        const uniqueNotificationsMap = new Map();

       
        for (const notification of notifications) {
            const key = `${notification.requestedUserName}-${notification.followedUserName}`;
            if (uniqueNotificationsMap.has(key)) {
                
                await Notification.findByIdAndDelete(notification._id);
            } else {
                
                uniqueNotificationsMap.set(key, notification);
            }
        }
        
        const uniqueNotifications = Array.from(uniqueNotificationsMap.values());

        return res.json(uniqueNotifications);
    } catch (error) {
        console.error(error);
        return res.status(500).send(error);
    }
});

module.exports = notificationRoutes;

