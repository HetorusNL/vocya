from flask import Flask, jsonify

from vocabulary_db import VocabularyDB
from db_watcher import DBWatcher

api = Flask(__name__)


@api.route("/words")
def all_words():
    return jsonify(_vocabulary_db.get_vocabulary())


@api.route("/word/id/<string:id>")
def word_id(id):
    vocabulary = _vocabulary_db.get_vocabulary()
    res = list(filter(lambda a: a["id"] == id, vocabulary))
    return jsonify(res)


@api.route("/word/chapter/<string:id>")
def word_chapter(id):
    vocabulary = _vocabulary_db.get_vocabulary()
    res = list(filter(lambda a: a["chapter"] == id, vocabulary))
    return jsonify(res)


@api.route("/word/course/<string:id>")
def word_course(id):
    vocabulary = _vocabulary_db.get_vocabulary()
    res = list(filter(lambda a: a["course"] == id, vocabulary))
    return jsonify(res)


@api.route("/course/<string:id>/search/word/<string:fields>/<path:query>")
def search_course_word(id, fields, query):
    vocabulary = _vocabulary_db.get_vocabulary()
    course_vocabulary = list(filter(lambda a: a["course"] == id, vocabulary))
    return _search_words(course_vocabulary, fields, query)


@api.route("/search/word/<string:fields>/<path:query>")
def search_word(fields, query):
    vocabulary = _vocabulary_db.get_vocabulary()
    return _search_words(vocabulary, fields, query)


def _search_words(vocabulary, fields, query):
    # distinguish between wildcard search (fields=*) and search in fields
    wildcard_search = fields == "*"
    fields = fields.split(",")

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


if __name__ == "__main__":
    database_file = "/opt/vocjem/dictionary.json"

    # initialize the vocabulary database
    _vocabulary_db = VocabularyDB(database_file)
    _vocabulary_db.update_vocabulary()

    # initialize the DB watcher that updates the database on file system events
    _db_watcher = DBWatcher(database_file, _vocabulary_db)
    _db_watcher.watch()

    # run the api and when stopped/crashed stop the watcher
    try:
        api.run()
    finally:
        _db_watcher.stop()
