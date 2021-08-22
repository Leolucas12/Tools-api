import { Router } from 'express';

import ToolsController from '@modules/tools/infra/http/controllers/ToolsController';
import ensureAuthenticated from '@modules/users/infra/http/middlewares/ensureAuthenticated';

const toolsRouter = Router();
const toolsController = new ToolsController();

toolsRouter.get('/', toolsController.index);
toolsRouter.use(ensureAuthenticated);
toolsRouter.post('/', toolsController.create);
toolsRouter.delete('/:id', toolsController.delete);

export default toolsRouter;
