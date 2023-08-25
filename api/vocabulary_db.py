import json
import requests


class VocabularyDB:
    DATABASE_URL = "https://raw.githubusercontent.com/HetorusNL/vocjem/master/dictionary.json"

    def __init__(self):
        self.courses: list[dict[str, str]] = []
        self.chapters: list[dict[str, str]] = []
        self.vocabulary: list[dict[str, str]] = []

    def get_courses(self):
        return self.courses

    def get_chapters(self):
        return self.chapters

    def get_vocabulary(self):
        return self.vocabulary

    def update(self):
        print("Updating the database...")
        result = requests.get(self.DATABASE_URL)
        database = json.loads(result.content.decode("utf-8"))
        self.courses = self._resolve_type(database, "courses")
        self.chapters = self._resolve_type(database, "chapters")
        self.vocabulary = self._resolve_type(database, "vocabulary")

    def _resolve_type(self, database: dict, type_name: str) -> list[dict[str, str]]:
        entries: list[dict[str, str]] = database[type_name]
        lut: dict = database["lut"]
        lut_keys = lut.keys()
        # resolve the LUT it might be better to do this after (optional)
        # filtering, but we're caching this function's output anyways
        for entry in entries:
            new_kvs = {}
            for key in entry.keys():
                if key in lut_keys:
                    lutval = database.get(lut[key])
                    if not lutval:
                        continue
                    res = list(filter(lambda a: a["id"] == entry[key], lutval))
                    if not res:
                        continue
                    new_kvs[f"{key}_name"] = res[0].get("name")
            entry.update(new_kvs)
        return entries
