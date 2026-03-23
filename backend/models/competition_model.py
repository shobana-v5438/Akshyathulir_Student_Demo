from configration import db


def save_competition_application(data):

    college = data["college_name"].replace(" ", "_")
    competition = data["competition_name"].replace(" ", "_")

    collection_name = f"{college}_{competition}"

    competition_collection = db[collection_name]

    competition_collection.insert_one(data)

    return {"message": "Application submitted successfully"}

