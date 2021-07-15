import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedDB1624496892902 implements MigrationInterface {
  name = 'SeedDB1624496892902';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // password admin
    await queryRunner.query(
      `INSERT INTO users (login, name, password) VALUES ('admin', 'admin', '$2a$10$u6AA7vrlTelKr2ynf8LxuObPu2fT4g4ihVU8BGuE3WK2SIYaE/Vl.')`,
    );
  }

  public async down(): Promise<void> {
    console.log('Down');
  }
}
