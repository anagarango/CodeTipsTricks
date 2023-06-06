## CodeTipsTricks
CodeTipsTricks is a full-stack web application with authorization that allows web developers share their favourite links that helped them expand their coding knowledge in sections either in Front-end, Back-end, and Machine Learning / AI. As someone who spends a lot of time looking for great resources to help me in this field, that's what motivated me to create a web app that would allow so (similar to Reddit).

## Technologies Used
* [Next.js](https://nextjs.org/) - framework that handles both the front and back end in one spot, I added RESTful APIs under pages > api to handle methods of both posts and comments. 
* [Next-Auth](https://next-auth.js.org/) - adding authorization to allow only logged in users to create posts and comments.
* [Axios](https://axios-http.com/) - HTTP Client to make requests and receive responses from the request and manipulate the data sent back if needed.
* [PostgreSQL (Prisma)](https://www.prisma.io/) - simplified way to build a database where data will be read and written.
* [TailwindCSS](https://tailwindcss.com/) - handles all styling for each component, simpler than writing CSS or styled-components.
* [CockroachDB]() - in order to make the database public, this cloud database will take care of the setup, maintenance, and security and allows the app to read and write data.

## Challenges
Setting up CockroachDB was a bit confusing since I wasn't sure why I had to use it for, but after a quick Google Search, this [Prisma's link](https://www.prisma.io/cockroachdb) helped explain it a bit. 
Next-Auth was also a bit intimating since I hadn't any kind of authorization on the app but after reading the documentation and watching a few videos on how to set it up, I understood it a bit more.

## Future Features
Some features i would like to add (actually fix) is to only allow one like per post when you are logged in, cause right now, i didn't set up a database schema for liking posts so right now users can click on the like button as many times as they like.
I would also need to fix the email authentication since right now, only the Github authentication to sign in works, so i would check out how to fix that.
