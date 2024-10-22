package api

import (
	"github.com/gofiber/fiber/v2"
	"github.com/unsuman/webapp/types"
)

func HandleDonate(c *fiber.Ctx) error {
	var donateInfo types.DonateInfo

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
}
