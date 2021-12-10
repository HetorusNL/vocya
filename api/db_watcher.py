from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler


class Handler(FileSystemEventHandler):
    def __init__(self, vocabulary_db):
        super().__init__()
        self.vocabulary_db = vocabulary_db

    def on_any_event(self, event):
        self.vocabulary_db.update_vocabulary()
        return super().on_any_event(event)


class DBWatcher:
    def __init__(self, database_file, vocabulary_db):
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
