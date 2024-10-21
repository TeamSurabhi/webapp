package main

import "github.com/gofiber/fiber/v2"

type donateInfo struct {
	Name   string  `json:"name"`
	Email  string  `json:"email"`
	Amount float64 `json:"amount"`
}

func main() {
	app := fiber.New()

	app.Static("/", "./client")

	apiv1 := app.Group("/api/v1")

	apiv1.Post("/donate", func(c *fiber.Ctx) error {
		var donateInfo donateInfo

		if err := c.BodyParser(&donateInfo); err != nil {
			return c.Status(400).JSON(fiber.Map{
				"message": "Invalid request",
			})
		}

		return c.JSON(fiber.Map{
			"message": "Donation successful",
			"name":    donateInfo.Name,
			"email":   donateInfo.Email,
			"amount":  donateInfo.Amount,
		})
	})
	app.Listen(":3333")
}
