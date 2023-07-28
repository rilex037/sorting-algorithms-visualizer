APP=docker-compose exec -T app sh -c

dockerize:
	@echo "Installing and starting project..."
	@docker-compose down --remove-orphans
	@docker-compose up -d --build
	@$(APP) "npm install && npm run dev"

start-dev:
	@echo "Starting project..."
	@docker-compose down --remove-orphans
	@docker-compose up -d
	@$(APP) "yarn install && yarn dev"

