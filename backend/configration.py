from pymongo import MongoClient

client = MongoClient("mongodb://localhost:27017")

db = client["FormDB"]

collection = db["students"]
hackathon_collection = db["hackathons"]
hackathon_application_collection = db["hackathon_applications"]
competition_collection = db["competitions"]
