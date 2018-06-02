YARN = docker-compose run web yarn

docker-lint:
	${YARN} run lint

docker-migrate-latest:
	${YARN} migrations:latest

docker-migrate-rollback:
	${YARN} migrations:rollback

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
