package main

import (
	"context"
	"log"

	"github.com/gofiber/fiber/v2"
	"github.com/unsuman/webapp/api"
	"github.com/unsuman/webapp/db"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func main() {
	ctx := context.Background()
	app := fiber.New()

	client, err := mongo.Connect(ctx, options.Client().ApplyURI("mongodb://localhost:27017"))
	if err != nil {
		log.Fatal(err)
	}

	contactStore := db.NewMongoContactStore(client, "Project-Surabhi")
	contactHandler := api.NewContactHandler(contactStore)

	app.Static("/", "./client")

	apiv1 := app.Group("/api/v1")

	apiv1.Post("/donate", api.HandleDonate)
	apiv1.Post("/contact", contactHandler.HandleContact)
	apiv1.Post("/newsletter", contactHandler.HandleNewsletter)
	app.Listen(":3333")
}
