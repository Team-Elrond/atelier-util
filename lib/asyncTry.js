/// <reference path="../node_modules/@types/express/index.d.ts" />

/**
 * @param {(req: Request, res: Response, next: NextFunction) => Promise} func
 */
function asyncTry(func) {
  /** @type {(req: Request, res: Response) => void} */
  return function asyncTry(req, res, next) {
    func(req, res)
      .then(next)
      .catch(err => {
        const code = err.status || err.statusCode;
        if (res.headersSent) {
          res.end(err.message);
        } else if (err.message.indexOf('foreign key constraint') !== -1) {
          res.sendStatus(404);
        } else if (code !== undefined) {
          res.status(code).send(err.message);
        } else {
          console.error(err.stack);
          res.status(500).send(err.message);
        }
      });
  };
}

module.exports = asyncTry;
