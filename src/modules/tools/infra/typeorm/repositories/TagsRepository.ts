import Tag from '@modules/tools/infra/typeorm/entities/Tag';
import ITagsRepository from '@modules/tools/repositories/ITagsRepository';
import { getRepository, Repository } from 'typeorm';

class TagsRepository implements ITagsRepository {
  private ormRepository: Repository<Tag>;

  constructor() {
    this.ormRepository = getRepository(Tag);
  }

  public async create(title: string): Promise<Tag> {
    const tag = this.ormRepository.create({ title });

    await this.ormRepository.save(tag);

    return tag;
  }

  public async findByTitle(title: string): Promise<Tag | undefined> {
    const tag = await this.ormRepository.findOne({ where: { title } });

    return tag;
  }

  public async findByTool(id: string): Promise<Tag[]> {
    const tags = await this.ormRepository
      .createQueryBuilder('tag')
      .leftJoinAndSelect('tag.tools', 'tool')
      .where('tool.id = :toolsId', { toolsId: id })
      .getMany();

    return tags;
  }
}

export default TagsRepository;
