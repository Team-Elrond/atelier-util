/// <reference path="../node_modules/@types/express/index.d.ts" />
/// <reference path="../node_modules/@types/pg/index.d.ts" />

/**
 * @param {Client} conn
 * @param {Response} res
 * @param {Submittable} query
 */
async function tryPut(conn, res, query) {
  try {
    const { rowCount } = await conn.query(query);
    res.sendStatus(rowCount === 0 ? 404 : 204);
  } catch (err) {
    console.error(err.stack);
    res.status(500).send(err.message);
  }
}

module.exports = tryPut;
