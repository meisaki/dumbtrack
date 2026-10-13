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

### Screens

**Timer (index):**

- shows button that can be pressed to start tracking
- while tracking, shows time elapsed and stop button
- once stopped, shows activity picker.
- once activity is picked, shows confirmation and gives the start and end times to Storage.

**Stats:**

- adds up time logged per activity and draws it.
- gets record from Storage, then draw.

**other(unnamed):**

- saves and loads records from a local file.
- lets user create and manage activities
- gets record from Timer
- gievs record for PieChart

### Data:

`Activities: act_id(PK), name, category`

- having id allows editing name later on without causing issues.

`Records: rec_id(PK), activity_id(FK), start_time, end_time`

- activity_id(FK) references activity.act_id
- Records store ID, so renaming activity does not affect past Records.

### Use Case

#### User tracks an acitivity

1. User presses Timer button
2. Timer notes start time and show running time and stop sign.
3. User presses stop. Timer notes end time.
4. Timer asks Storage for the activity list and displays it.
5. User selects an activity. Timer sends times & acitivty to storage.
6. Storage saves received data as new `Record`
7. Timer displays confirmation screen

#### User wants to add/edit acitivity

1. User switches to 'other' tab
2. 'other' screen loads the activity list from Storage
3. User picks an pre-existing activity or new one, and edits it
4. User presses complete, new data is sent to Storage.
5. Storage saves data.

#### User wantst to see the stats

1. User switches to the stats page
2. Stats asks Storage for all `Records`
3. Stats adds up time per activity and draws it

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
