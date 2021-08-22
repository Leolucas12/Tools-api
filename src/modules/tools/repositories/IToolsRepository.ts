import Tool from '@modules/tools/infra/typeorm/entities/Tool';
import ICreateToolDTO from '@modules/tools/dtos/ICreateToolDTO';

export default interface IUsersRepository {
  create(data: ICreateToolDTO): Promise<Tool>;
  findByTag(tag: string): Promise<Tool[]>;
  findById(id: string): Promise<Tool | undefined>;
  remove(id: string): Promise<void>;
}
