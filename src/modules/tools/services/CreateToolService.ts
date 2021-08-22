import IToolsRepository from '@modules/tools/repositories/IToolsRepository';
import { container, inject, injectable } from 'tsyringe';
import IToolDTO from '../dtos/IToolDTO';
import CreateTagService from './CreateTagsService';
import FormatTagService from './utils/FormatTagsService';

interface IRequest {
  title: string;
  link: string;
  description: string;
  tags: string[];
}

@injectable()
class CreateToolService {
  constructor(
    @inject('ToolsRepository')
    private toolsRepository: IToolsRepository
  ) {}

  async execute({
    title,
    link,
    description,
    tags,
  }: IRequest): Promise<IToolDTO> {
    const createTags = container.resolve(CreateTagService);

    const toolTags = await createTags.execute(tags);

    const tool = await this.toolsRepository.create({
      title,
      link,
      description,
      toolTags,
    });

    const formatTags = container.resolve(FormatTagService);

    const tagValues = formatTags.execute(toolTags);

    const toolFormatted: IToolDTO = {
      id: tool.id,
      title: tool.title,
      link: tool.link,
      description: tool.description,
      tags: tagValues,
    };

    return toolFormatted;
  }
}

export default CreateToolService;
