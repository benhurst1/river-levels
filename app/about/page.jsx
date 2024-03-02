export default function Page() {
  const h1Class = "font-bold text-lg pt-5";

  return (
    <div className="w-3/6 mx-auto mt-10 flex flex-col gap-2">
      <h1 className={h1Class}>About this project</h1>
      <p>
        This project came about as a result of the UK's recent flooding which
        affected my area, despite being on a flood alert system and not getting
        one. I found an API by the Environment Agency which provides flood
        warnings and levels from stations across the UK. I decided to build a
        simple web app to display this data in a more user-friendly way.
      </p>
      <p>
        You can use the Maps page to find individual stations that track water
        levels. You can then click through to see more information about that
        station, dynamically creating a route for that station fetching more
        information from the API such as highest recorded level, and the time it
        was recorded.
      </p>
      <p>
        The home page displays flood warnings and groups them by severity. Then
        by selecting severity and then area, you can click through to see more
        information about that specific warning.
      </p>
      <h1 className={h1Class}>Technologies</h1>
      <ul className="ml-3">
        <li>Next.js</li>
        <li>React</li>
        <li>Tailwind CSS</li>
        <li>Vercel</li>
        <li>Jest</li>
        <li>React Testing Library</li>
        <li>Google Maps API</li>
        <li>Environment Agency's flood monitoring API</li>
      </ul>

      <h1 className={h1Class}>Challenges</h1>
      <p>
        The first main challenge was working out how to retrieve data from an
        API using a backend server and then delivering that data to the
        frontend. The answer ended up being serverless functions built-in to
        Vercel, and creating those API routes.
      </p>
      <p>
        The next challenge was figuring out the data was structured and making
        sure I am only delivering the data required by React. For a while, all
        the transformations were in a single function, but I wanted to split
        them out to make it more manageable. Tests helped a lot with this.
      </p>
      <h1 className={h1Class}>Learnings</h1>
      <p>
        I am not likely to add any more to this project, it works, but it has
        become a bit messy for my liking. In the future I will be implementing
        more robust testing from the start, splitting functions out further so
        that each make smaller changes, but so that each function only does one
        thing. I will also like to move onto using Typescript to create a safer
        environment to work in.
      </p>
    </div>
  );
}
