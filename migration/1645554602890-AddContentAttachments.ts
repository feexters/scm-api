import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddContentAttachments1645554602890 implements MigrationInterface {
  name = 'AddContentAttachments1645554602890';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      'CREATE TYPE "public"."content_attachments_orientation_enum" AS ENUM(\'LANDSCAPE\', \'PORTRAIT\')',
    );
    await queryRunner.query(
      'CREATE TABLE "content_attachments" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "source" text NOT NULL, "orientation" "public"."content_attachments_orientation_enum", "width" integer, "height" integer, "contentId" uuid NOT NULL, CONSTRAINT "PK_eb4c9c0b4e532faadaec336f6e0" PRIMARY KEY ("id"))',
    );
    await queryRunner.query(
      'ALTER TABLE "content_attachments" ADD CONSTRAINT "FK_3b259a6f535dbacf1a8beb04acc" FOREIGN KEY ("contentId") REFERENCES "content"("id") ON DELETE NO ACTION ON UPDATE NO ACTION',
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('ALTER TABLE "content_attachments" DROP CONSTRAINT "FK_3b259a6f535dbacf1a8beb04acc"');
    await queryRunner.query('DROP TABLE "content_attachments"');
    await queryRunner.query('DROP TYPE "public"."content_attachments_orientation_enum"');
  }
}
