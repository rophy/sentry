# from django.conf import settings

from sentry.nodestore.base import NodeStorage

class MemoryNodeStorage(NodeStorage):
    """
    A simple backend that saves each node in memory. Only appropriate for
    debugging and development!
    """

    def __init__(self, max_entries: int = -1):
        self.max_entries = max_entries
        self.cache = {}
        # if not settings.DEBUG:
        #     raise ValueError("MemoryNodeStorage should only be used in development!")

    def get(self, id):
        """
        >>> data = nodestore.get('key1')
        >>> print data
        """
        return self.cache.get(id, None)

    def set(self, id, data):
        """
        >>> nodestore.set('key1', {'foo': 'bar'})
        """
        self.cache[id] = data

    def delete(self, id):
        """
        >>> nodestore.delete('key1')
        """
        if id in self.cache:
            del self.cache[id]

