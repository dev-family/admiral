import { Request } from 'express';

type AuthContext = {
    userId: number;
};

class AuthHttpContext {
    private bindings = new WeakMap<Request, AuthContext>();

    public bind(req: Request, context: AuthContext) {
        this.bindings.set(req, context);
    }

    public get(req: Request) {
        const context = this.bindings.get(req);

        if (!context) {
            throw new Error('Unauthorized');
        }

        return context;
    }
}

export default new AuthHttpContext();
