import { Router } from 'express';

import { auth } from './auth';
import { users} from './users';
import { categories } from './categories';
import { posts } from './posts';

export default (): Router => {
    const app = Router();

    app.use('/auth', auth);
    app.use('/users', users);
    app.use('/categories', categories);
    app.use('/posts', posts);

    return app;
};
