import IToolsRepository from '@modules/tools/repositories/IToolsRepository';
import { container, inject, injectable } from 'tsyringe';
import IToolDTO from '../dtos/IToolDTO';
import FormatToolService from './utils/FormatToolsService';

@injectable()
class FindToolByTagNameService {
  constructor(
    @inject('ToolsRepository')
    private toolsRepository: IToolsRepository
  ) {}

  async execute(query: string): Promise<IToolDTO[]> {
    const tools = await this.toolsRepository.findByTag(query);

    const formatTools = container.resolve(FormatToolService);

    const formattedTools = formatTools.execute(tools);

    return formattedTools;
  }
}

export default FindToolByTagNameService;
