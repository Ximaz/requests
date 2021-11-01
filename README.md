# Requests
Requests is a browser-side TS module which acts like an interface between XHRs and the developer. It helps to make asynchronous requests rather than using it's default callbacks.


# Methods
There are some usefull methods to handle "pure" requests, but also the JSON requests.

### Pure requests method :
*The data gathering* : Return any server's response as a ``Response`` object.
-   ``get``,
-   ``head``,

*The data sending* : Send any ``body`` data as **plain text** if not specifying the ``Content-Type: application/json`` header.
-   ``post``,
-   ``delete``,
-   ``put``,
-   ``options``.

### JSON requests method :
*The data gathering* : Return any server's response as a JSON object.
-   ``getJSON``,
-   ``headJSON``.

*The data sending* : Send any ``body`` data as **JSON** without specifying the ``Content-Type: application/json`` header.
-   ``postJSON``,
-   ``deleteJSON``,
-   ``putJSON``,
-   ``optionsJSON``.

# Example
You can see a usage example in the ``app.ts`` file and an import example in ``index.html``.