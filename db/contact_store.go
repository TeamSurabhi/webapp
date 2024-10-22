package db

import (
	"context"
	"fmt"

	"github.com/unsuman/webapp/types"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
)

type ContactStore interface {
	InsertContact(context.Context, types.ContactMessage) error
	InsertNewsletterSubscription(context.Context, types.NewsletterSubscription) error
}

type MongoContactStore struct {
	client *mongo.Client
	coll   *mongo.Collection
}

func NewMongoContactStore(client *mongo.Client, dbname string) *MongoContactStore {
	return &MongoContactStore{
		client: client,
		coll:   client.Database(dbname).Collection("contact"),
	}
}

func (m *MongoContactStore) InsertContact(ctx context.Context, msg types.ContactMessage) error {
	msg.Context = "contact"
	_, err := m.coll.InsertOne(ctx, msg)
	if err != nil {
		return err
	}

	return nil
}

func (m *MongoContactStore) InsertNewsletterSubscription(ctx context.Context, email types.NewsletterSubscription) error {
	if isEmailPresent(ctx, m, email.Email) {
		return fmt.Errorf("email already present")
	}

	email.Context = "newsletter"
	_, err := m.coll.InsertOne(ctx, email)
	if err != nil {
		return err
	}

	return nil
}

func isEmailPresent(ctx context.Context, m *MongoContactStore, email string) bool {
	res := m.coll.FindOne(ctx, bson.M{"email": email, "context": "newsletter"})
	return res.Err() == nil
}
