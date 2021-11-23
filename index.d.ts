import * as http from 'http';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

declare module 'express' {
    /**
     * @param P  For most requests, this should be `ParamsDictionary`, but if you're
     * using this in a route handler for a route that uses a `RegExp` or a wildcard
     * `string` path (e.g. `'/user/*'`), then `req.params` will be an array, in
     * which case you should use `ParamsArray` instead.
     *
     * @see https://expressjs.com/en/api.html#req.params
     *
     * @example
     *     app.get('/user/:id', (req, res) => res.send(req.params.id)); // implicitly `ParamsDictionary`
     *     app.get<ParamsArray>(/user\/(.*)/, (req, res) => res.send(req.params[0]));
     *     app.get<ParamsArray>('/user/*', (req, res) => res.send(req.params[0]));
     */
    export interface Request<
        P = ParamsDictionary,
        ResBody = any,
        ReqBody = any,
        ReqQuery = ParsedQs,
        Locals extends Record<string, any> = Record<string, any>
    > extends http.IncomingMessage,
            Express.Request {
        bodyInt(key: string, fallback?: number): number;
        paramInt(key: string, fallback?: number): number;
        queryInt(key: string, fallback?: number): number;
        
        bodyString(key: string, fallback?: string): string;
        paramString(key: string, fallback?: string): string;
        queryString(key: string, fallback?: string): string;
    }
}
