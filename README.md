# Requests
Requests is an XHR wrapper written in JavaScript. It allows you to asynchronously make ``GET``, ``POST``, ``PATCH``, ``PUT``, ``DELETE``, ``HEAD`` and ``OPTIONS`` requests easier. You can see some usage example in ``tests.html``.


# Return value :
```ts
{
    status: Number, // The response status
    body: String, // The response content
    json: Object || null, // The response content as JSON if it can be parsed. Else, it's null
    headers: Object, // The response headers
    xhr: XMLHttpRequest // The created XMLHttpRequest
}
```