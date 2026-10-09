# DumbTracker

A simple intuitive 24h time tracker for daily acitivity tracking.

## Overview

### Problem

Existing Time/Habit Trackers do not provide simplicity for quick daily activity tracking.

- Spreadsheets offer flexibility and data visualization, but require manual setup and the UI is not intuitive for simple use.

- Pomodoro-Timers offer simple UX, but not designed for tracking general daily activities.

- General Habit Trackers offer excessive features, often requiring configuration and account setup. They also focus on habit completion, but not on time spent on activities.

### Solution:

A simple daily activity tracker focused tracking and reviewing time spent on activities. The system allows users to immedately start tracking, prioritizing essential features and an intuitive UI.

### Users:

- Users who want minimal features in their tracking apps.
- Users who want to track time spent on their daily activities.

### Success:

- Tracking starts with one button press with no pop ups.
- Users can view the time spent on each activity in a pie chart.

## Requirements

### Functional

The system must allow user to:

- [ ] start and stop activity tracking with a single button press.
- [ ] record the time spent on each activity.
- [ ] view recorded activities and their durations.
- [ ] display the distribution of time spent across activities in a pie chart.
- [ ] create and manage activity categories.

The system should allow user to:

- [ ] review records from previous days.
- [ ] track multiple activities at simultaneously.
- [ ] automatically include device screen-time data into activity records
- [ ] automatically pause tracking when designated distracting application is used.

### Non-Functional

The system must:

- [ ] allow tracking to begin without pop-ups or mandatory setup
- [ ] minimize interactions and interface

## Architecture & Desgin

### Components

**Timer:**

- starts when told to start, stop when told to stop.
- gives the start and end times to Storage.

**Storage:**

- saves and loads records from a local file.
- gets record from Timer
- gievs record for PieChart

**Pie Chart:**

- adds up time logged per activity and draws it.
- gets record from Storage, then draw.

**UI:**

- show start/stop button
- show accumulated time while tracking
- show tab menu to switch between timer/chart/other
- show screen to let users edit activities

### Data:

`Activity: name, category`

`Record: activity, start_time, end_time`

### Work Flow

#### User tracks an acitivity

1. UI tells Timer to start
2. Timer notes start time
3. UI shows running time and stop sign/button
4. User presses stop. Timer notes end time & UI display accumulated time.
5. UI asks Storage for the activity list and shows it.
6. User selects an activity. Timer sends times & acitivty to storage.
7. Storage to saves received data as new `Record`

#### User wants to add/edit acitivity

1. User switches to 'other' tab
2. UI shows acitvity & setting
3. UI asks Storage for the activity list and shows it
4. User picks an pre-existing activity or new one, and edits it
5. User presses Complete
6. UI gives the new data to Storage to save

#### User press stats on tab menu

1. UI switches to the stats page
2. Pie Chart asks Storage for all `Records`
3. Pie Chart adds up time per activity and draws it
4. UI displays the chart

### Platform:

Mobile app using React Native & Expo. stored in local storage

## Limitation & Future Implementation

### Limitations:

- Cross-device data synchronization
- No cloud storage
- Expo limit

### Future Implementation:

- Cross-device data transition
- Setting goals for activities
- alternative stats visualization based on defined goals

## Planning

1. Tab menu and basic UI setup
2. Timer,
3. Storage
4. activity picker
5. Pie Chart
6. polish
