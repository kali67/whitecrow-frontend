# White Crow PM Frontend

You will need the [backend](https://bitbucket.org/kali67/whitecrow-backend/src/master) running in order for the frontend to be able
to make requests. In order to set the url for the backend, you can do this by modifying `axios.defaults.baseURL = "http://localhost:8080"` in
`src/index.js`.


## Local Development
Before proceeding, you will need to run `yarn` to install all the project dependencies. If you don't already have `yarn` installed, then please
visit [here](https://yarnpkg.com/lang/en/docs/install/#mac-stable) to do so.

In the project directory, run `yarn start`. This runs the app in development mode. You can view this by navigating to `http://localhost:3000/login`
in your browser.

The page will reload if you make edits to files.
You will also see any lint errors in the console.


## Production Deployment

### Docker Deployment
All you need to do is build the docker image by running `docker build -t whitecrow-frontend .` from the root directory. A word of caution, don't build
or install any dependencies of the project if you are building the docker image. 
If you have, remove the build directory and the `/node_modules` directory and the `package-lock.json` file from root. This can be done with
`rm -rf package-lock.json node_modules`.

Once you have built the image, you can run it by running this command `docker run docker run -p 3000:5000 whitecrow-frontend` this will take care of everything for you. 
-p indicates that port 3000 on the physical machine maps to port 5000 on the virtual. Change port 3000 if you wish to recieve requests from a different port.
Serve is being used to serve the static app. Read about it [here](https://www.npmjs.com/package/serve).




You can build the production application to the `build` directory by running `npm run build`. It correctly bundles React in production mode and optimizes the build for the best performance.
The build is minified and the filenames include the hashes. 
