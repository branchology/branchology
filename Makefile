CLI = docker-compose run api npm

docker-lint:
	${CLI} run lint

docker-migrate-latest:
	${CLI} migrate:latest

docker-migrate-rollback:
	${CLI} migrate:rollback

docker-migration-make:
	${CLI} migrations:make ${name}

docker-packages-add:
	$(CLI) add ${name}

docker-packages-add-dev:
	$(CLI) add --dev ${name}

docker-packages-install:
	$(CLI) install

docker-packages-remove:
	$(CLI) remove ${name}

docker-seed-create:
	${CLI} seed:create name ${name}

docker-seed-run:
	${CLI} seed:run

docker-test:
	$(CLI) test
