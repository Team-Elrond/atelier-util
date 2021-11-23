import * as http from 'http';
import { ParamsDictionary } from 'express-serve-static-core';
import { NextFunction, Request, Response } from 'express';
import { ParsedQs } from 'qs';
import { Client, Submittable } from 'pg';

export function asyncTry(func: (req: Request, res: Response) => Promise<void>): (req: Request, res: Response, next: NextFunction) => void;

export function requestParser(req: Request, res: Response, next: NextFunction): void;

export function tryPut(conn: Client, res: Response, query: Submittable): void;

declare module 'express-serve-static-core' {
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

        bodyBoolean(key: string, fallback?: boolean): boolean;
    }
}
