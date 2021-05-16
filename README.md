# Requests :
Requests is a little JavaScript module to perform easily web requests using XMLHttpRequest's. If you ever had problems to use callback and Promises in function with XHR, that's the solution.
<br><br>
The module is wrote as a class containing functions to perform requests. See some basic examples below.

# Sample usages :
```html
<!-- Simple GET request -->
<script src="./scripts/requests.js"></script>
<script>
    const requests = new Requests()
    requests
        .get('/api/list', { Authorization: 'Bearer <TOKEN>' })
        .then((response) => console.log(response))
        .catch((response) => console.error(response))
</script>
```

```html
<!-- Simple POST request -->
<script src="./scripts/requests.js"></script>
<script>
    const requests = new Requests()
    requests
        .post(
            '/api/create',
            { Authorization: 'Bearer <TOKEN>' },
            { id: 'secret_id', description: 'some description' }
        )
        .then((response) => console.log(response))
        .catch((response) => console.error(response))
</script>
```
<br><br>

# Requests schema :
- GET, DELETE : url, headers?
- POST, PATCH, PUT, OPTIONS : url, headers?, body?
<br><br>

# Return value :
```json
{
    "status": "<number>",
    "body": "<string>",
    "headers": "<object> (Response headers)",
    "raw_request": "<XMLHttpRequest>"
}
```