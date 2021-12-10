import json
import logging


class VocabularyDB:
    def __init__(self, database_file):
        self.vocabulary = []
        self.database_file = database_file

    def get_vocabulary(self):
        return self.vocabulary

    def update_vocabulary(self):
        with open(self.database_file) as f:
            dictionary = json.load(f)
        vocabulary = dictionary["vocabulary"]
        # resolve the LUT it might be better to do this after (optional)
        # filtering, but we're caching this function's output anyways
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
        self.vocabulary = vocabulary
