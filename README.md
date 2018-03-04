## How to run:

From the root directory of the project, run the following scripts:

- `./admin/build.sh`
- `./admin/start.sh`

## URLs:

- Frontend: http://localhost
- API: http://localhost/api

## IMPORTANT NOTE:

### Why nginx?
The reason I added nginx is because I'm used to put a proxy in front of all services,
and not directly push traffic into the service itself.

I know it wasn't required in the coding challenge.


### Elasticsearch service:

If you see it's logs after build, this service have 2 primary processes:

- Elasticsearch itself. (name: elasticsearch)
- NodeJS app to manage microserviceskit. (name: kit)

You'll see that the "kit" process will keep failing and restarting itself many times, 
this is due to "elasticsearch" process isn't ready (up) yet.

Just give it a couple of minutes, and it'll recover automatically as soon as "elasticsearch" is up.

### API service:

API service utilizes microserviceskit, and hence, it depends on RabbitMQ (rabbit) service. 
"rabbit" takes sometime to boot up, so you'll need to wait a couple of minutes too in order 
for API service to start working fine.

### Frontend service:

- I've made it run in prod mode, so you can see the optimizations made on JS/CSS.
- I'm using [Webpack](https://webpack.js.org/) instead of Gulp/Grunt, Webpack can do 
everything they do, and more.

### Notes on the coding challenge doc:
At the top of the document, you mentioned `search/full`, and to disable all keywords < 3.
But later in the backend section you mentioned `search/quick`. 

I've used `search/quick` for all cases.