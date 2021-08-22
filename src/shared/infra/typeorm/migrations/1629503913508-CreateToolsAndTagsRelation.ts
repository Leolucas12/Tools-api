import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateToolsAndTagsRelation1629503913508
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'tools_tags_tags',
        columns: [
          {
            name: 'toolsId',
            type: 'uuid',
          },
          {
            name: 'tagsTitle',
            type: 'varchar',
          },
        ],
        foreignKeys: [
          {
            columnNames: ['toolsId'],
            referencedColumnNames: ['id'],
            referencedTableName: 'tools',
          },
          {
            columnNames: ['tagsTitle'],
            referencedColumnNames: ['title'],
            referencedTableName: 'tags',
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('tools_tags_tags');
  }
}
