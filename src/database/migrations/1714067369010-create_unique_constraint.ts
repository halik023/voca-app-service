import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUniqueConstraint1714067369010 implements MigrationInterface {
    name = 'CreateUniqueConstraint1714067369010'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_fbc9587b218000acc37d7c6385\` ON \`registered_courses\` (\`user_id\`, \`course_id\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_2c4454871f847447532ed85fc9\` ON \`learned_words\` (\`voca_id\`, \`register_course_id\`)`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_8fc3b802b0b818a7f4c2b4c30c\` ON \`followers\` (\`following_id\`, \`follower_id\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP INDEX \`IDX_8fc3b802b0b818a7f4c2b4c30c\` ON \`followers\``);
        await queryRunner.query(`DROP INDEX \`IDX_2c4454871f847447532ed85fc9\` ON \`learned_words\``);
        await queryRunner.query(`DROP INDEX \`IDX_fbc9587b218000acc37d7c6385\` ON \`registered_courses\``);
    }

}
