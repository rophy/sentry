from sentry.nodestore.base import NodeStorage

class MemoryNodeStorage(NodeStorage):
    """
    A simple backend that saves each node in memory. Only appropriate for
    debugging and development!
    """

    def __init__(self, max_entries=-1):
        self.max_entries = max_entries
        self.cache = {}

    def delete(self, id):
        """
        >>> nodestore.delete('key1')
        """
        if id in self.cache:
            del self.cache[id]


    # def get_bytes(self, id: str) -> bytes | None:
    #     """
    #     >>> nodestore._get_bytes('key1')
    #     b'{"message": "hello world"}'
    #     """
    #     return self._get_bytes(id)

    def get(self, id, subkey=None):
        """
        >>> nodestore.get('key1')
        {"message": "hello world"}
        """
        if not id in self.cache:
            return None
        if not subkey in self.cache[id]:
            return None
        return self.cache[id][subkey]

    def get_multi(self, id_list, subkey=None):
        """
        >>> nodestore.get_multi(['key1', 'key2')
        {
            "key1": {"message": "hello world"},
            "key2": {"message": "hello world"}
        }
        """
        items = {}
        for id in id_list:
            items[id] = self.get(id, subkey)
        return items

    def set(self, item_id, data, ttl=None):
        """
        Set value for `item_id`. Note that this deletes existing subkeys for `item_id` as
        well, use `set_subkeys` to write a value + subkeys.

        >>> nodestore.set('key1', {'foo': 'bar'})
        """
        self.cache[item_id] = {
            None: data
        }

    def set_subkeys(self, item_id, data, ttl=None):
        """
        Set value for `item_id` and its subkeys.

        >>> nodestore.set_subkeys('key1', {
        ...    None: {'foo': 'bar'},
        ...    "reprocessing": {'foo': 'bam'},
        ... })

        >>> nodestore.get('key1')
        {'foo': 'bar'}
        >>> nodestore.get('key1', subkey='reprocessing')
        {'foo': 'bam'}
        """
        self.cache[item_id] = data

    def cleanup(self, cutoff_timestamp):
        pass

    def bootstrap(self):
        pass

