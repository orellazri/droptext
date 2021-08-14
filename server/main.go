package main

import (
	"fmt"
	"log"
	"net/http"

	badger "github.com/dgraph-io/badger/v3"
	"github.com/gin-gonic/gin"
)

var db *badger.DB

func main() {
	db, err := badger.Open(badger.DefaultOptions("./badger"))
	if err != nil {
		log.Fatal(err)
	}

	router := gin.Default()

	router.GET("/", getIndex)
	router.GET("/:id", getById)
	router.POST("/create", postCreate)

	router.Run("localhost:8080")

	defer db.Close()
}

func getIndex(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "welcome to droptext",
	})
}

func getById(c *gin.Context) {
	// id := c.Param("id")

	err := db.View(func(txn *badger.Txn) error {
		item, err := txn.Get([]byte("id"))
		if err != nil {
			return err
		}

		err = item.Value(func(val []byte) error {
			fmt.Printf("The value is %s\n", val)
			return nil
		})

		if err != nil {
			sendError(c, err)
		}

		return nil
	})

	if err != nil {
		sendError(c, err)
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"message": "OK!",
	})
}

func postCreate(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"message": "Created",
	})
}

func sendError(c *gin.Context, err error) {
	c.JSON(http.StatusBadRequest, gin.H{
		"message": fmt.Sprintf("An error occured: %v", err),
	})
}
