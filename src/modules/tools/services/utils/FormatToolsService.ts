import Tool from '@modules/tools/infra/typeorm/entities/Tool';
import ITagsRepository from '@modules/tools/repositories/ITagsRepository';
import { container, inject, injectable } from 'tsyringe';
import IToolDTO from '../../dtos/IToolDTO';
import FormatTagService from './FormatTagsService';

@injectable()
class FormatToolService {
  constructor(
    @inject('TagsRepository')
    private tagsRepository: ITagsRepository
  ) {}

  async execute(tools: Tool[]): Promise<IToolDTO[]> {
    const formatTags = container.resolve(FormatTagService);

    const formattedTools: IToolDTO[] = [];

    for (let i = 0; i < tools.length; i++) {
      const allTags = await this.tagsRepository.findByTool(tools[i].id);
      const tags = formatTags.execute(allTags);

      const newTool: IToolDTO = {
        id: tools[i].id,
        title: tools[i].title,
        description: tools[i].description,
        link: tools[i].description,
        tags,
      };

      formattedTools.push(newTool);
    }

    return formattedTools;
  }
}

export default FormatToolService;
