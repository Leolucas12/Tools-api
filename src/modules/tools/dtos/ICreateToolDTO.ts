import Tag from '../infra/typeorm/entities/Tag';

export default interface ICreateToolDTO {
  title: string;
  link: string;
  description: string;
  toolTags: Tag[];
}
