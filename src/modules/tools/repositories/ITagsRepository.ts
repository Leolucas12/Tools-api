import Tag from '@modules/tools/infra/typeorm/entities/Tag';

export default interface IUsersRepository {
  create(title: string): Promise<Tag>;
  findByTitle(title: string): Promise<Tag | undefined>;
}
