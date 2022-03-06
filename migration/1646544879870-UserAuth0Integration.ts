import { MigrationInterface, QueryRunner } from 'typeorm';

export class UserAuth0Integration1646544879870 implements MigrationInterface {
  name = 'UserAuth0Integration1646544879870';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "users" DROP COLUMN "password"');
    await queryRunner.query('ALTER TABLE "users" ADD "authId" text NOT NULL');
    await queryRunner.query('ALTER TABLE "users" ADD CONSTRAINT "UQ_f8ecddfc60e9d1c2719ab17fe6a" UNIQUE ("authId")');
    await queryRunner.query('ALTER TABLE "users" ALTER COLUMN "username" DROP NOT NULL');
    await queryRunner.query('ALTER TABLE "users" ALTER COLUMN "email" DROP NOT NULL');
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "users" ALTER COLUMN "email" SET NOT NULL');
    await queryRunner.query('ALTER TABLE "users" ALTER COLUMN "username" SET NOT NULL');
    await queryRunner.query('ALTER TABLE "users" DROP CONSTRAINT "UQ_f8ecddfc60e9d1c2719ab17fe6a"');
    await queryRunner.query('ALTER TABLE "users" DROP COLUMN "authId"');
    await queryRunner.query('ALTER TABLE "users" ADD "password" text NOT NULL');
  }
}
