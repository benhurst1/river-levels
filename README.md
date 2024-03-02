# River Levels

This project came about due to me being on a flooding alert system in my area, and the river near my house flooding and not getting an alert.

Live link: https://river-levels-two.vercel.app/

## Current build

- Map page
  - Clicking on a marker on the map will display quick information about that station.
  - The more info link will take you to a page about that station to display more details.
- Home page
  - This lists all the most recent flood warnings in order of severity, then by area. You can click through on the warning to see more details including location on a map.

## Challenges

The first main challenge was working out how to retrieve data from an API using a backend server and then delivering that data to the frontend. The answer ended up being serverless functions built-in to Vercel, and creating those API routes.

The next challenge was figuring out the data was structured and making sure I am only delivering the data required by React. For a while, all the transformations were in a single function, but I wanted to split them out to make it more manageable. Tests helped a lot with this.

## Future
I'm not likely to contribute any more to this project, and if I would do anything, I would remake it using Typescript, better tests, and make functions smaller and simpler.