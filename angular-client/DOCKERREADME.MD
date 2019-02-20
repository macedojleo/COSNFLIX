Then, spin up the container once the build is done:

`$ docker run -it \
  -v ${PWD}:/usr/src/app \
  -v /usr/src/app/node_modules \
  -p 4200:4200 \
  --rm \
  feupflix`
  
Open your browser to http://localhost:4200 and you should see the app. Try making a change to the AppComponent’s template (src/app/app.component.html) within your code editor. You should see the app hot-reload. Kill the server once done.