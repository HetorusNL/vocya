import json
from typing import List


class VocabularyDB:
    def __init__(self, database_file: str):
        self.courses: List[dict[str, str]] = []
        self.chapters: List[dict[str, str]] = []
        self.vocabulary: List[dict[str, str]] = []
        self.database_file = database_file

    def get_courses(self):
        return self.courses

    def get_chapters(self):
        return self.chapters

    def get_vocabulary(self):
        return self.vocabulary

    def update(self):
        self.courses = self._resolve_type("courses")
        self.chapters = self._resolve_type("chapters")
        self.vocabulary = self._resolve_type("vocabulary")

    def _resolve_type(self, type_name) -> "List[dict[str, str]]":
        with open(self.database_file) as f:
            dictionary: dict = json.load(f)
        entries: List[dict[str, str]] = dictionary[type_name]
        lut: dict = dictionary["lut"]
        lut_keys = lut.keys()
        # resolve the LUT it might be better to do this after (optional)
        # filtering, but we're caching this function's output anyways
        for entry in entries:
            new_kvs = {}
            for key in entry.keys():
                if key in lut_keys:
                    lutval = dictionary.get(lut[key])
                    if not lutval:
                        continue
                    res = list(filter(lambda a: a["id"] == entry[key], lutval))
                    if not res:
                        continue
                    new_kvs[f"{key}_name"] = res[0].get("name")
            entry.update(new_kvs)
        return entries
