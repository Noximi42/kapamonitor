SHELL := /bin/bash
MAKEFLAGS += --silent
ARGS = $(filter-out $@,$(MAKECMDGOALS))
UNAME=$(shell uname -s)
bold=\033[0;32m
normal=\033[0m

export COMPOSE_PROJECT_NAME=kapamonitor

clientPath=app/client/
dockerPath=docker/dev/

## command override
docker-compose=docker-compose -f $(dockerPath)docker-compose.yml

.PHONY: help
.banner:
	./bin/banner.sh

help: .banner
	@awk 'BEGIN {FS = ":.*##"; printf "\033[33mUsage:\033[0m \n make \033[32m<command>\033[0m \033[32m\"<arguments>\"\033[0m\n\n\033[33mAvailable commands:\033[0m \n"} /^[a-zA-Z_-]+:.*?##/ { printf "  \033[32m%-10s\033[0m %s\n", $$1, $$2 } /^##@/ { printf "\n\033[1m%s\033[0m\n", substr($$0, 5) } ' $(MAKEFILE_LIST)

##@ Docker commands
up: .banner ## Start Project
	$(docker-compose) up -d --remove-orphans $(ARGS)
	@make urls

stop: .banner ## Stop Project
	$(docker-compose) stop $(ARGS)

restart: ## Restart all containers
	$(docker-compose) kill $(ARGS)
	$(docker-compose) start $(ARGS)

rebuild: ## Rebuild the app container
	$(docker-compose) rm --force $(ARGS)
	$(docker-compose) build
	make up

state: ## List containers
	$(docker-compose) ps

logs: ## Get logs from all containers or a specific container e.g make logs frontend
	$(docker-compose) logs -f --tail=100 $(ARGS)

destroy: .banner ## Stop Project, remove containers their direct images and volumes
	$(docker-compose) down --rmi all -v


##@ System commands
shell-client: ## Get Bash of app container
	$(docker-compose) exec client sh
bash-client: shell-client

shell-api: ## Get Bash of app container
	$(docker-compose) exec api bash
bash-api: shell-api

recreate-database:
	make stop
	docker volume rm kapamonitor_db_volume
	make up


urls: ## Print Project URIs
	echo -e "---------------------------------------------------"
	echo -e "You can access your project at the following URLS:"
	echo -e "---------------------------------------------------"
	echo -e ""
	echo -e "${bold}Website${normal}         http://localhost:1313/"
	echo -e "${bold}Frontend${normal}        http://localhost:3000/"
	echo -e "${bold}Authentication${normal}  http://localhost:4000/"
	echo -e "${bold}API${normal}             http://localhost:5000/api/"
	echo -e "${bold}API Swagger${normal}     http://localhost:5000/swagger/index.html"
	echo -e ""
	echo -e "${bold}Login${normal}           kapamonitor@gmail.com"
	echo -e "${bold}Password${normal}        123456"
	echo -e ""


##@ Prettier
pretty: .banner ## Format client code files with Prettier
	npm run pretty --prefix $(clientPath)


#############################
# Argument fix workaround
#############################
%:
	@:
