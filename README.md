# middleware-formidable

This is Folk of [express-formidable](https://github.com/hatashiro/express-formidable) An [Express](http://expressjs.com) middleware of
[Formidable](https://github.com/felixge/node-formidable) that just works.

## What are Express, Formidable, and this?

[Express](http://expressjs.com) is a fast, unopinionated, minimalist web
framework for Node.js.

[Formidable](https://github.com/felixge/node-formidable) is a Node.js module
for parsing form data, including `multipart/form-data` file upload.

So, **`express-formidable`** is something like a bridge between them,
specifically an Express middleware implementation of Formidable. And **`middleware-formidable`** is an improved version of it.

It aims to just work.

## Install

```
npm install middleware-formidable
```

## How to use

### Basic usage

```js
const express = require('express');
const formidableMiddleware = require('middleware-formidable');

var app = express();

app.use(formidableMiddleware());

app.post('/upload', (req, res) => {
  req.fields; // contains non-file fields
  req.files; // contains files
});
```

### Using another way

If you separate between controller file and route file, you can use this method.

`route.js`

```js
const controller = require('[your-path]/controllerFile');
const formidableMiddleware = require('middleware-formidable');

router.post('/', formidableMiddleware({multiples: true, allowEmptyFiles: true}), controller.post);
```

`controller.js`

```js
const post = async (request, response, next) => {
  const bodyData = request.fields; // contains non-file fields
  const files = request.files; // contains files
  
  // if your file field name is "image", you can use
  const myImages = files.image;
  
  // and if your file field name is "another_file", you can use
  const myAnotherFile = files.another_file;
};
```

middleware-formidable already supports array fields and of course also supports arrays files.

middleware-formidable can basically parse form types Formidable can handle,
including `application/x-www-form-urlencoded`, `application/json`, and
`multipart/form-data`.

## Option

```js
app.use(formidableMiddleware(opts));
```

`opts` are options which can be set to `form` in Formidable. For example:

```js
app.use(formidableMiddleware({
  encoding: 'utf-8',
  uploadDir: '/my/dir',
  multiples: true, // req.files to be arrays of files
});
```

For the detail, please refer to the
[Formidable API](https://github.com/felixge/node-formidable#api).

## Events

```js
app.use(formidableMiddleware(opts, events));
```

`events` is an array of json with two field:

| Field | Description |
| ----- | ----------- |
| `event` | The event emitted by the form of formidable. A complete list of all the possible events, please refer to the [Formidable Events](https://github.com/felixge/node-formidable#events) |
| `action` | The callback to execute. The signature is `function (req, res, next, ...formidable_parameters)` |

For example:

```js
const events = [
  {
    event: 'fileBegin',
    action: function (req, res, next, name, file) { /* your callback */ }
  }, 
  {
    event: 'field',
    action: function (req, res, next, name, value) { /* your callback */ }
  }
];
```

### Error event

Unless an `error` event are provided by the `events` array parameter, it will handle by the standard `next(error)`.

## Contribute

```
git clone https://github.com/ragil000/middleware-formidable
cd middleware-formidable
npm install
```

To lint and test:

```
npm test
```

## License

[MIT](LICENSE)
