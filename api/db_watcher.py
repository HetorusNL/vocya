from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler
from vocabulary_db import VocabularyDB


class Handler(FileSystemEventHandler):
    def __init__(self, vocabulary_db: VocabularyDB):
        super().__init__()
        self.vocabulary_db = vocabulary_db

    def on_closed(self, event):
        self.vocabulary_db.update()
        return super().on_closed(event)


class DBWatcher:
    def __init__(self, database_file: str, vocabulary_db: VocabularyDB):
        self.vocabulary_db = vocabulary_db
        self.database_file = database_file

    def watch(self):
        event_handler = Handler(self.vocabulary_db)
        self.observer = Observer()
        self.observer.schedule(event_handler, self.database_file)
        self.observer.start()

    def stop(self):
        self.observer.stop()
        self.observer.join()
