YARN = docker-compose run api yarn

docker-lint:
	${YARN} run lint

docker-migrate-latest:
	${YARN} migrate:latest

docker-migrate-rollback:
	${YARN} migrate:rollback

docker-migration-make:
	${YARN} migrations:make ${name}

docker-packages-add:
	$(YARN) add ${name}

docker-packages-add-dev:
	$(YARN) add --dev ${name}

docker-packages-install:
	$(YARN) install

docker-packages-remove:
	$(YARN) remove ${name}

docker-seed-create:
	${YARN} seed:create name ${name}

docker-seed-run:
	${YARN} seed:run

docker-test:
	$(YARN) test
