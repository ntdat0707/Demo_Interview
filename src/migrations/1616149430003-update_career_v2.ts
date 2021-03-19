import { MigrationInterface, QueryRunner } from 'typeorm';

export class UpdateCareerV21616149430003 implements MigrationInterface {
  name = 'updateCareerV21616149430003';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "career" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "title" character varying NOT NULL, "code" character varying NOT NULL, "language_id" character varying NOT NULL, "vacancies" numeric NOT NULL DEFAULT '0', "country" character varying NOT NULL, "city" character varying NOT NULL, "education_level" character varying NOT NULL DEFAULT 'none', "max_salary" numeric NOT NULL DEFAULT '0', "min_salary" numeric NOT NULL DEFAULT '0', "currency" character varying NOT NULL, "is_edit_salary" boolean NOT NULL DEFAULT false, "job_description" character varying NOT NULL, "requirements_and_benefits" character varying, "contact_information" character varying, "status" character varying NOT NULL DEFAULT 'active', "closing_date" TIMESTAMP WITH TIME ZONE, "created_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "updated_at" TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT CURRENT_TIMESTAMP, "deleted_at" TIMESTAMP WITH TIME ZONE, CONSTRAINT "PK_5f694c0aa9babcae2c4ad61c7d0" PRIMARY KEY ("id"))`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`DROP TABLE "career"`);
  }
}
