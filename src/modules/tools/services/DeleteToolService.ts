import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import Tag from '../infra/typeorm/entities/Tag';
import IToolsRepository from '../repositories/IToolsRepository';

@injectable()
class DeleteToolService {
  constructor(
    @inject('ToolsRepository')
    private toolsRepository: IToolsRepository
  ) {}

  async execute(id: string): Promise<void> {
    const tool = await this.toolsRepository.findById(id);

    if (!tool) throw new AppError('A ferramenta informada não existe', 404);

    await this.toolsRepository.remove(id);
  }
}

export default DeleteToolService;
