# River Levels

This project came about due to me being on a flooding alert system in my area, and the river near my house flooding and not getting an alert.

Live link: https://river-levels-two.vercel.app/

## Current build
You can go to the map page and view an interactive google map of the all the stations across the UK. Clicking on a marker will display some quick and most recent information about it. Clicking on more info will then take you through to a page about that station to display more information such as highest and lowest recorded values and date of opening.

## Still to do
There is still a lot of work to do to get to a point I feel satisfied with it:
- I need to get data collected automatically and stored into mongodb, currently just doing it manually when I am working on it.
- The data from the API is a bit of a mess, and I need to write better tests to understand it more.
    - for instance, one of the 4000 stations has two sensors at different locations so lat and long is an array.
- Add a search bar
- Fill out home page and add an about page.