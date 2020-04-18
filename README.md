# kapamonitor
## local frontend development with docker

There's a docker-compose.yaml including frontend, backend and db-services located inside the app folder.

### start
```bash
cd app # change directory
docker-compose -f docker-compose-dev.yaml up # this might take a while

# the client directory is mounted to the frontend container
# if everything is up & running the frontend should reload once a file is changed and saved

# in order to stop -> press CTRL+C
```

### teardown
```bash
docker-compose -f docker-compose-dev.yaml down
```
