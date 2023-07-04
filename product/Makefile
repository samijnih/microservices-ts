DC ?= docker-compose

docker/build: ### docker build
	$(DC) build

docker/down: ### docker down
	$(DC) rm -sfv

docker/up: docker/down ### docker up
	$(DC) up -d
