CLI = docker-compose run api npm

docker-lint:
	${CLI} run lint

docker-migrate-latest:
	${CLI} run migrate:latest

docker-migrate-rollback:
	${CLI} run migrate:rollback

docker-migration-make:
	${CLI} run migrations:make ${name}

docker-packages-add:
	$(CLI) add ${name}

docker-packages-add-dev:
	$(CLI) add --dev ${name}

docker-packages-install:
	$(CLI) install

docker-packages-remove:
	$(CLI) remove ${name}

docker-seed-create:
	${CLI} run seed:create name ${name}

docker-seed-run:
	${CLI} run seed:run

docker-test:
	$(CLI) test
