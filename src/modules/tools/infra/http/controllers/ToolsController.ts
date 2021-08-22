import { Request, Response } from 'express';
import { container } from 'tsyringe';

import CreateToolService from '@modules/tools/services/CreateToolService';
import FindToolByTagNameService from '@modules/tools/services/FindToolByTagNameService';
import DeleteToolService from '@modules/tools/services/DeleteToolService';
import AppError from '@shared/errors/AppError';

export default class ToolsController {
  public async create(req: Request, res: Response): Promise<Response> {
    const { title, link, description, tags } = req.body;

    const createTool = container.resolve(CreateToolService);

    const tool = await createTool.execute({ title, link, description, tags });

    return res.json(tool);
  }

  public async index(req: Request, res: Response): Promise<Response> {
    const { tag } = req.query;

    if (tag === undefined)
      throw new AppError('Informe uma tag para buscar as ferramentas.');

    const findTools = container.resolve(FindToolByTagNameService);

    const tools = await findTools.execute(tag as string);

    return res.json(tools);
  }

  public async delete(req: Request, res: Response): Promise<Response> {
    const toolId = req.params.id;

    if (toolId === undefined)
      throw new AppError('Id da Ferramenta não informado.');

    const deleteTool = container.resolve(DeleteToolService);

    await deleteTool.execute(toolId);

    return res.json('Ferramenta excluída com sucesso');
  }
}
