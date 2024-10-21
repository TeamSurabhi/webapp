build:
		@go build -o bin/server

server: build
		@./bin/server