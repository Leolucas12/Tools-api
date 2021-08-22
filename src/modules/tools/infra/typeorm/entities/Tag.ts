import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import Tool from './Tool';

@Entity('tags')
class Tag {
  @PrimaryGeneratedColumn()
  title: string;

  @ManyToMany(() => Tool, (tools) => tools.tags)
  @JoinTable()
  tools: Tool[];
}

export default Tag;
