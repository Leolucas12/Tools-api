import Tool from '@modules/tools/infra/typeorm/entities/Tool';
import { container, injectable } from 'tsyringe';
import IToolDTO from '../../dtos/IToolDTO';
import FormatTagService from './FormatTagsService';

@injectable()
class FormatToolService {
  constructor(
  ) { }

  async execute(tools: Tool[]): Promise<IToolDTO[]> {
    const formatTags = container.resolve(FormatTagService);

    const formattedTools: IToolDTO[] = [];

    for (let i = 0; i < tools.length; i++) {
      const tags = formatTags.execute(tools[i].tags);

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
