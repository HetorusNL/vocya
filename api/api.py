from flask import Flask, jsonify

from vocabulary_db import VocabularyDB
from db_watcher import DBWatcher

api = Flask(__name__)


@api.route("/courses")
def courses():
    return jsonify(_vocabulary_db.get_courses())


@api.route("/course/<string:co_id>")
def course(co_id):
    courses = _vocabulary_db.get_courses()
    course = list(filter(lambda a: a["id"] == co_id, courses))
    return jsonify(course)


@api.route("/course/<string:co_id>/chapters")
def course_chapters(co_id):
    chapters = _vocabulary_db.get_chapters()
    co_chapters = list(filter(lambda a: a["course"] == co_id, chapters))
    return jsonify(co_chapters)


@api.route("/course/<string:co_id>/chapter/<string:ch_id>")
def course_chapter(co_id, ch_id):
    chapters = _vocabulary_db.get_chapters()
    co_chapters = list(filter(lambda a: a["course"] == co_id, chapters))
    co_chapter = list(filter(lambda a: a["id"] == ch_id, co_chapters))
    return jsonify(co_chapter)


@api.route("/course/<string:co_id>/chapter/<string:ch_id>/words")
def course_chapter_words(co_id, ch_id):
    vocabulary = _vocabulary_db.get_vocabulary()
    co_words = list(filter(lambda a: a["course"] == co_id, vocabulary))
    ch_words = list(filter(lambda a: a["chapter"] == ch_id, co_words))
    return jsonify(ch_words)


@api.route("/course/<string:co_id>/chapter/<string:ch_id>/word/<string:wo_id>")
def course_chapter_word(co_id, ch_id, wo_id):
    vocabulary = _vocabulary_db.get_vocabulary()
    co_words = list(filter(lambda a: a["course"] == co_id, vocabulary))
    ch_words = list(filter(lambda a: a["chapter"] == ch_id, co_words))
    word = list(filter(lambda a: a["id"] == wo_id, ch_words))
    return jsonify(word)


@api.route("/course/<string:co_id>/words")
def course_words(co_id):
    vocabulary = _vocabulary_db.get_vocabulary()
    co_words = list(filter(lambda a: a["course"] == co_id, vocabulary))
    return jsonify(co_words)


@api.route("/course/<string:co_id>/word/<string:wo_id>")
def course_word(co_id, wo_id):
    vocabulary = _vocabulary_db.get_vocabulary()
    co_words = list(filter(lambda a: a["course"] == co_id, vocabulary))
    word = list(filter(lambda a: a["id"] == wo_id, co_words))
    return jsonify(word)


@api.route("/chapters")
def chapters():
    return jsonify(_vocabulary_db.get_chapters())


@api.route("/chapter/<string:ch_id>")
def chapter(ch_id):
    chapters = _vocabulary_db.get_chapters()
    chapter = list(filter(lambda a: a["id"] == ch_id, chapters))
    return jsonify(chapter)


@api.route("/chapter/<string:ch_id>/words")
def chapter_words(ch_id):
    vocabulary = _vocabulary_db.get_vocabulary()
    ch_words = list(filter(lambda a: a["chapter"] == ch_id, vocabulary))
    return jsonify(ch_words)


@api.route("/chapter/<string:ch_id>/word/<string:wo_id>")
def chapter_word(ch_id, wo_id):
    vocabulary = _vocabulary_db.get_vocabulary()
    ch_words = list(filter(lambda a: a["chapter"] == ch_id, vocabulary))
    ch_word = list(filter(lambda a: a["id"] == wo_id, ch_words))
    return jsonify(ch_word)


@api.route("/words")
def words():
    return jsonify(_vocabulary_db.get_vocabulary())


@api.route("/word/<string:wo_id>")
def word(wo_id):
    vocabulary = _vocabulary_db.get_vocabulary()
    word = list(filter(lambda a: a["id"] == wo_id, vocabulary))
    return jsonify(word)


# deprecated: replaced by 'word(word_id)'!
@api.route("/word/id/<string:wo_id>")
def word_id(wo_id):
    vocabulary = _vocabulary_db.get_vocabulary()
    word = list(filter(lambda a: a["id"] == wo_id, vocabulary))
    return jsonify(word)


# deprecated!
@api.route("/word/chapter/<string:id>")
def word_chapter(id):
    vocabulary = _vocabulary_db.get_vocabulary()
    res = list(filter(lambda a: a["chapter"] == id, vocabulary))
    return jsonify(res)


# deprecated!
@api.route("/word/course/<string:id>")
def word_course(id):
    vocabulary = _vocabulary_db.get_vocabulary()
    res = list(filter(lambda a: a["course"] == id, vocabulary))
    return jsonify(res)


# deprecated: searching should be performed on client side!
@api.route("/course/<string:id>/search/word/<string:fields>/<path:query>")
def search_course_word(id, fields, query):
    vocabulary = _vocabulary_db.get_vocabulary()
    course_vocabulary = list(filter(lambda a: a["course"] == id, vocabulary))
    return _search_words(course_vocabulary, fields, query)


# deprecated: searching should be performed on client side!
@api.route("/search/word/<string:fields>/<path:query>")
def search_word(fields, query):
    vocabulary = _vocabulary_db.get_vocabulary()
    return _search_words(vocabulary, fields, query)


# deprecated internal function: searching should be performed on client side!
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
    _vocabulary_db.update()

    # initialize the DB watcher that updates the database on file system events
    _db_watcher = DBWatcher(database_file, _vocabulary_db)
    _db_watcher.watch()

    # run the api and when stopped/crashed stop the watcher
    try:
        api.run()
    finally:
        _db_watcher.stop()
