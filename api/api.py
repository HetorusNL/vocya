import json
from flask import Flask, jsonify

api = Flask(__name__)


@api.route("/words")
def all_words():
    return jsonify(_get_vocabulary())


@api.route("/word/id/<string:id>")
def word_id(id):
    vocabulary = _get_vocabulary()
    res = list(filter(lambda a: a["id"] == id, vocabulary))
    return jsonify(res)


@api.route("/word/chapter/<string:id>")
def word_chapter(id):
    vocabulary = _get_vocabulary()
    res = list(filter(lambda a: a["chapter"] == id, vocabulary))
    return jsonify(res)


@api.route("/search/word/<string:fields>/<path:query>")
def search_word(fields, query):
    # distinguish between wildcard search (fields=*) and search in fields
    wildcard_search = fields == "*"
    fields = fields.split(",")
    print(wildcard_search, fields)

    vocabulary = _get_vocabulary()
    res = []
    for entry in vocabulary:
        querywords_found = 0
        for queryword in query.split(" "):
            for key in entry.keys() if wildcard_search else fields:
                # search case-insensitive (and testing if key exists)
                if key in entry and queryword.lower() in entry[key].lower():
                    querywords_found += 1
                    break
        if querywords_found == len(query.split(" ")):
            res.append(entry)
    return jsonify(res)


def _get_vocabulary():
    with open("/opt/vocjem/dictionary.json") as f:
        dictionary = json.load(f)
    vocabulary = dictionary["vocabulary"]
    # resolve the LUT, it might be better to do this after (optional) filtering
    for entry in vocabulary:
        new_keys = {}
        for key in entry.keys():
            if key in dictionary["lut"].keys():
                lut = dictionary["lut"]
                lutval = dictionary.get(lut.get(key))
                if not lutval:
                    continue
                res = list(filter(lambda a: a["id"] == entry[key], lutval))
                if not res:
                    continue
                new_keys[f"{key}_name"] = res[0].get("name")
        entry.update(new_keys)
    return vocabulary


if __name__ == "__main__":
    api.run()
