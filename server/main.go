package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"
	"time"

	"github.com/gin-gonic/gin"
	"github.com/joho/godotenv"
	gonanoid "github.com/matoous/go-nanoid/v2"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

type Request struct {
	content string `json:"content" binding:"required"`
}

var ctx context.Context
var collection *mongo.Collection

func main() {
	err := godotenv.Load()
	if err != nil {
		log.Fatal(err)
	}

	client, err := mongo.NewClient(options.Client().ApplyURI(os.Getenv("MONGO_URL")))
	if err != nil {
		log.Fatal(err)
	}
	ctx, _ := context.WithTimeout(context.Background(), 10*time.Second)
	err = client.Connect(ctx)
	if err != nil {
		log.Fatal(err)
	}
	defer client.Disconnect(ctx)

	collection = client.Database("droptext").Collection("texts")

	router := gin.Default()

	router.GET("/", getIndex)
	router.GET("/:id", getById)
	router.POST("/create", postCreate)

	router.Run("localhost:8080")
}

func getIndex(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "welcome to droptext",
	})
}

func getById(c *gin.Context) {
	id := c.Param("id")
	err := collection.FindOne(ctx, bson.D{primitive.E{Key: "_id", Value: id}})
	if err != nil {
		sendError(c, "ID Not found in database")
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "get by id!",
	})
}

func postCreate(c *gin.Context) {
	// Generate unique ID
	var id string
	var mongoErr *mongo.SingleResult = nil
	var err error

	for mongoErr == nil {
		id, err = gonanoid.New(10)
		if err != nil {
			sendError(c, "Could not generate nanoid")
			return
		}
		mongoErr = collection.FindOne(ctx, bson.D{primitive.E{Key: "_id", Value: id}})
	}

	var request Request
	if err = c.BindJSON(&request); err != nil {
		sendError(c, "Could not bind JSON")
		return
	}
	fmt.Printf("Content is : %s\n", request.content)

	// res, err := collection.InsertOne(ctx, bson.D{primitive.E{Key: "_id", Value: id}, {Key: "content", Value: }})

	c.JSON(http.StatusOK, gin.H{
		"message": "found free id: " + id,
	})
}

func sendError(c *gin.Context, err string) {
	// TODO: Check if in production/development to know which error to send
	c.JSON(http.StatusBadRequest, gin.H{
		"message": fmt.Sprintf("An error occured: %v", err),
	})
}
