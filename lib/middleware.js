const formidable = require('formidable');

function parse(opts, events) {
  return (req, res, next) => {
    if (req.express_formidable && req.express_formidable.parsed) {
      next();
      return;
    }

    const form = formidable(opts);

    let manageOnError = false;
    if (events) {
      events.forEach((e) => {
        manageOnError = manageOnError || e.event === 'error';
        form.on(e.event, (...parameters) => { e.action(req, res, next, ...parameters); });
      });
    }

    if (!manageOnError) {
      form.on('error', (err) => {
        next(err);
      });
    }

    form.parse(req, (err, fields, files) => {
      console.log('coba2', files);
      if (err) {
        next(err);
        return;
      }

      Object.assign(req, { fields, files, express_formidable: { parsed: true } });
      next();
    });
  };
}

module.exports = parse;
exports.parse = parse;