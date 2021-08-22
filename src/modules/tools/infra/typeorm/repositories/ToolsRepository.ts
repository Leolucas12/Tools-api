import ICreateToolDTO from '@modules/tools/dtos/ICreateToolDTO';
import Tool from '@modules/tools/infra/typeorm/entities/Tool';
import IToolsRepository from '@modules/tools/repositories/IToolsRepository';
import { getRepository, Repository } from 'typeorm';



class ToolsRepository implements IToolsRepository {
  private ormRepository: Repository<Tool>;

  constructor() {
    this.ormRepository = getRepository(Tool);
  }

  public async findByTag(tag: string): Promise<Tool[]> {
    const tools = await this.ormRepository
      .createQueryBuilder('tool')
      .leftJoinAndSelect('tool.tags', 'tagsTitle')
      .leftJoin('tool.tags', 'tags')
      .where('tags.title LIKE :tagsTitle', { tagsTitle: `%${tag}%` })
      .getMany();

    return tools;
  }

  public async create({
    title,
    link,
    description,
    toolTags,
  }: ICreateToolDTO): Promise<Tool> {
    const tool = this.ormRepository.create({
      title,
      link,
      description,
    });

    tool.tags = toolTags;

    await this.ormRepository.save(tool);

    return tool;
  }

  public async findById(id: string): Promise<Tool | undefined> {
    const tool = await this.ormRepository.findOne(id);

    return tool;
  }

  public async remove(id: string): Promise<void> {
    const tool = await this.ormRepository.findOne(id);

    if (tool) {
      tool.tags = [];
      await this.ormRepository.save(tool);
    }

    await this.ormRepository.delete(id);
  }
}

export default ToolsRepository;
