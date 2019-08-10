# CalendarManager

## Overview

Calendary Manager is a MERN application which allows users to view and make events on their Google calendar.

In the right panel, entering a date which has not-yet-completed events (app will not load past events) will display cards of events you have scheduled for that day.

The left panel shows the users 'friends', with the option to delete them, and add new friends provided they know their email, and the email has been used to log in to this application.

Switching over to /create by using the drop down menu will allow the user to create a new event. The app has format validation for the date (YYYY-MM-DD), start and end times (HH:MM), and ensures that the end time is after the start time. Clicking 'View Date' when a valid date is in the 'Date' field will load the user's events on that date. They also may view friends' schedules for that date by typing in the name on their google profile.

This app is deployed on heroku at https://quiet-temple-92966.herokuapp.com/