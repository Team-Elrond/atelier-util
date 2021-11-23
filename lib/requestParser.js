/// <reference path="../node_modules/@types/react/index.d.ts" />

/**
 * @param {Object} parsed
 * @param {string} key
 * @param {number=} def - default
 */
function getInt(parsed, key, def) {
  const sVal = parsed[key];
  if (sVal === undefined) {
    if (def === undefined) {
      const err = new Error(`${key} is required`);
      err.status = 400;
      throw err;
    }
    return def;
  }
  const nVal = Number(sVal);
  if (Number.isInteger(nVal)) {
    return nVal;
  }
  const err = new Error(`${key} must be an integer`);
  err.status = 400;
  throw err;
}

/**
 * @template T
 * @param {string} type
 * @param {Object} parsed
 * @param {T} key
 * @param {T=} def - default
 */
function getTyped(type, parsed, key, def) {
  const val = parsed[key];
  if (val === undefined) {
    if (def === undefined) {
      const err = new Error(`${key} is required`);
      err.status = 400;
      throw err;
    }
    return def;
  }
  if (typeof val === type) {
    return val;
  }

  const err = new Error(`${key} must be of type ${type}`);
  err.status = 400;
  throw err;
}

/**
 * @param {Request} req
 * @param {Response} res
 * @param {NextFunction} next
 */
function requestParser(req, res, next) {
  req.queryInt = function queryInt(key, def) {
    return getInt(req.query, key, def);
  };
  req.paramInt = function paramInt(key, def) {
    return getInt(req.params, key, def);
  };
  req.bodyInt = function bodyInt(key, def) {
    return getInt(req.body, key, def);
  };

  req.queryString = function queryString(key, def) {
    return getTyped('string', req.query, key, def);
  };
  req.paramString = function paramString(key, def) {
    return getTyped('string', req.params, key, def);
  };
  req.bodyString = function bodyString(key, def) {
    return getTyped('string', req.body, key, def);
  };

  req.bodyBoolean = function bodyBoolean(key, def) {
    return getTyped('boolean', req.body, key, def);
  };

  next();
}

module.exports = requestParser;
