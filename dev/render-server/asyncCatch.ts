import { type RequestHandler } from 'express';

export type Async<T> = T extends (...args: infer Args) => infer Result
    ? (...args: Args) => Promise<Result>
    : T;

export type AsyncRequestHandler = Async<RequestHandler>;

export function asyncCatch(handler: AsyncRequestHandler): RequestHandler {
    return (request, response, next) => {
        const promise = handler(request, response, next);
        promise.catch(next);
    }
}
