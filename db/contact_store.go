package db

import (
	"context"

	"github.com/unsuman/webapp/types"
	"go.mongodb.org/mongo-driver/mongo"
)

type ContactStore interface {
	InsertContact(context.Context, types.ContactMessage) error
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
	_, err := m.coll.InsertOne(ctx, msg)
	if err != nil {
		return err
	}

	return nil
}
