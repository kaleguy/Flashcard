import sys
import zipfile
import os
import sqlite3
import json
import shutil

def get_deck_ids():
    # Look at the `col` table, parse the json in the `decks` column, return deck id and deck name.
    # We'll be using these values to pair the cards to their corresponding decks.
    # nah but WHY would anki structure their decks like this? it didn't used to be like this xd..
    query = '''
        SELECT decks
        FROM col
    '''
    cursor.execute(query)
    result = cursor.fetchone()
    decks = json.loads(result[0])
    out = {}

    for key, item in decks.items():
        pair = (item["id"], item["name"])
        out[item["name"]] = pair

    return out

def get_corresponding_cards(did):
    # Take in deck id, find all cards with corresponding deck id, parse the card front/back and return
    query = f'''
        SELECT flds
        FROM notes
        WHERE id IN (
          SELECT nid
          FROM cards
          WHERE did = "{did}"
        );
    '''
    out = []
    cursor.execute(query)
    result = cursor.fetchall()
    for item in result:
        parts = item[0].split("\x1f") #Anki cards use the \x1f separator for card front/back in the db
        out.append({"front": parts[0], "back": parts[1]})

    return out
    
apkg_file_path = sys.argv[1]
extract_dir = "./extract_dir/"

# Extract .apkg file to ./extract_dir/ it contains 'collection.anki2' which is an Sqlite db containing
# all the card info that we will be parsing. get ready for spaghetti
with zipfile.ZipFile(apkg_file_path, "r") as zip_ref:
    zip_ref.extractall(extract_dir)

conn = sqlite3.connect(os.path.join(extract_dir, "collection.anki2"))
cursor = conn.cursor()
out = {} 

for deck_name, deck_info in get_deck_ids().items():
    out[deck_name] = get_corresponding_cards(deck_info[0])

conn.close()
print(json.dumps(out, indent=4, separators=(","," : ")))
# These were the most annoying few hours of my life <:-D works now so doesnt matter
shutil.rmtree(extract_dir) # your storage space will thank me, mine certainly didn't 
