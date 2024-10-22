package api

import (
	"github.com/gofiber/fiber/v2"
	"github.com/unsuman/webapp/db"
	"github.com/unsuman/webapp/types"
)

type ContactHandler struct {
	store db.ContactStore
}

func NewContactHandler(store db.ContactStore) *ContactHandler {
	return &ContactHandler{
		store: store,
	}
}

func (s *ContactHandler) HandleContact(c *fiber.Ctx) error {
	var msg types.ContactMessage

	if err := c.BodyParser(&msg); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"message": "Invalid request",
		})
	}

	if err := s.store.InsertContact(c.Context(), msg); err != nil {
		return c.Status(500).JSON(fiber.Map{
			"message": "Failed to store contact message",
		})
	}

	return c.JSON(fiber.Map{
		"message": "Message received successfully",
	})
}

func (s *ContactHandler) HandleNewsletter(c *fiber.Ctx) error {
	var subscription types.NewsletterSubscription

	if err := c.BodyParser(&subscription); err != nil {
		return c.Status(400).JSON(fiber.Map{
			"message": "Invalid request",
		})
	}

	if err := s.store.InsertNewsletterSubscription(c.Context(), subscription); err != nil {
		return c.Status(500).JSON(fiber.Map{
			"message": err.Error(),
		})
	}
	return c.JSON(fiber.Map{
		"message": "Subscribed to newsletter",
	})
}
