#[macro_use]
extern crate actix_web;
use actix_cors::Cors;
use actix_web::{web, App, HttpResponse, HttpServer, Responder};
use dotenv::dotenv;
use mongodb::bson::{doc, Bson};
use mongodb::{options::ClientOptions, Client, Collection};
use nanoid::nanoid;
use serde::{Deserialize, Serialize};
use std::env;

struct AppState {
    pub collection: Collection,
}

#[derive(Deserialize)]
struct Drop {
    content: String,
}

#[derive(Serialize)]
struct CreateResponse {
    id: String,
}

#[derive(Serialize)]
struct GetResponse {
    content: String,
}

#[get("/")]
async fn index() -> impl Responder {
    HttpResponse::Ok().body("welcome to droptext")
}

#[get("/{id}")]
async fn get_by_id(web::Path(id): web::Path<String>, state: web::Data<AppState>) -> impl Responder {
    let find = state.collection.find_one(doc! {"_id": &id}, None).await;
    match find {
        Ok(res) => match res {
            Some(doc) => {
                if let Some(content) = doc.get("content").and_then(Bson::as_str) {
                    HttpResponse::Ok().json(GetResponse {
                        content: content.to_string(),
                    })
                } else {
                    HttpResponse::BadRequest()
                        .body("Could not find drop with the given id".to_string())
                }
            }
            None => {
                HttpResponse::BadRequest().body("Could not find drop with the given id".to_string())
            }
        },
        Err(e) => HttpResponse::BadRequest().body(format!("Error: {}", e)),
    }
}

#[post("/create")]
async fn create_drop(req_body: String, state: web::Data<AppState>) -> impl Responder {
    let deserialized: Drop = serde_json::from_str(&req_body).unwrap();

    if deserialized.content.trim().is_empty() {
        HttpResponse::BadRequest().body("Invalid content".to_string());
    }

    let mut id: String;
    loop {
        id = nanoid!(10);
        let find_id = state.collection.find_one(doc! {"_id": &id}, None).await;
        match find_id {
            Ok(res) => match res {
                Some(_) => continue,
                None => break,
            },
            Err(e) => {
                HttpResponse::BadRequest().body(format!("Error: {}", e));
            }
        }
    }

    state
        .collection
        .insert_one(doc! {"_id": &id, "content": deserialized.content}, None)
        .await
        .expect("Could not insert to database");

    HttpResponse::Ok().json(CreateResponse { id: id.to_string() })
}

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    // MongoDB
    dotenv().ok();
    let mongo_url = env::var("MONGO_URL").expect("MONGO_URL environment variable not set!");
    let options = ClientOptions::parse(&mongo_url)
        .await
        .expect("Could not create mongodb client options");
    let client = Client::with_options(options).expect("Could not connect to mongodb");

    // Initialize app
    HttpServer::new(move || {
        App::new()
            .data(AppState {
                collection: client.database("droptext").collection("drops"),
            })
            .wrap(Cors::permissive()) // TODO: Change this for production
            .service(index)
            .service(get_by_id)
            .service(create_drop)
    })
    .bind("localhost:8080")?
    .run()
    .await
}
