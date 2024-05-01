import { MigrationInterface, QueryRunner } from "typeorm";

export class InitDatabase1714563552494 implements MigrationInterface {
    name = 'InitDatabase1714563552494'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`exams\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`score\` int NOT NULL DEFAULT '0', \`type\` varchar(255) NOT NULL, \`status\` varchar(255) NOT NULL, \`register_course_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`registered_courses\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`is_registered\` varchar(255) NOT NULL DEFAULT 1, \`user_id\` varchar(36) NULL, \`course_id\` varchar(36) NULL, UNIQUE INDEX \`IDX_fbc9587b218000acc37d7c6385\` (\`user_id\`, \`course_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`learned_words\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`progress\` int NOT NULL DEFAULT '0', \`is_difficult\` varchar(255) NOT NULL DEFAULT 0, \`is_skip\` varchar(255) NOT NULL DEFAULT 0, \`voca_id\` varchar(36) NULL, \`register_course_id\` varchar(36) NULL, UNIQUE INDEX \`IDX_2c4454871f847447532ed85fc9\` (\`voca_id\`, \`register_course_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`vocas\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`en_meaning\` varchar(255) NOT NULL, \`vi_meaning\` varchar(255) NOT NULL, \`audio\` varchar(255) NULL, \`note\` varchar(255) NULL, \`type\` varchar(255) NOT NULL, \`lesson_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`lessons\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`order\` int NOT NULL, \`course_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`courses\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`name\` varchar(255) NOT NULL, \`is_audio_quiz\` tinyint NOT NULL DEFAULT 1, \`is_en_quiz_mode\` tinyint NOT NULL DEFAULT 1, \`thumnail\` varchar(255) NULL, \`author_id\` varchar(36) NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`followers\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`following_id\` varchar(36) NULL, \`follower_id\` varchar(36) NULL, UNIQUE INDEX \`IDX_8fc3b802b0b818a7f4c2b4c30c\` (\`following_id\`, \`follower_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`users\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`type\` varchar(255) NOT NULL, \`username\` varchar(255) NOT NULL, \`first_name\` varchar(255) NOT NULL, \`last_name\` varchar(255) NOT NULL, \`gender\` varchar(255) NULL, \`date_of_birth\` datetime NULL, \`avatar\` varchar(255) NULL, UNIQUE INDEX \`IDX_97672ac88f789774dd47f7c8be\` (\`email\`), UNIQUE INDEX \`IDX_fe0bb3f6520ee0469504521e71\` (\`username\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`voca_settings\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`learn_word_amount\` int NOT NULL DEFAULT '10', \`review_word_amount\` int NOT NULL DEFAULT '15', \`quick_review_word_amount\` int NOT NULL DEFAULT '30', \`is_audio_quiz\` tinyint NOT NULL DEFAULT 1, \`user_id\` varchar(36) NULL, UNIQUE INDEX \`REL_5a3445d417fa83738d9dd42301\` (\`user_id\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`expired_refresh_tokens\` (\`id\` varchar(36) NOT NULL, \`created_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6), \`updated_at\` datetime(6) NOT NULL DEFAULT CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6), \`deleted_at\` datetime(6) NULL, \`refresh_token\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`exams\` ADD CONSTRAINT \`FK_e127a91f633615cdabc8a911ede\` FOREIGN KEY (\`register_course_id\`) REFERENCES \`registered_courses\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`registered_courses\` ADD CONSTRAINT \`FK_4b3b2554c5a479cfe08ae02d8a2\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`registered_courses\` ADD CONSTRAINT \`FK_b2cc9656eada64cb24704506d9b\` FOREIGN KEY (\`course_id\`) REFERENCES \`courses\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`learned_words\` ADD CONSTRAINT \`FK_d91909522193d6d6e6f7ace540c\` FOREIGN KEY (\`voca_id\`) REFERENCES \`vocas\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`learned_words\` ADD CONSTRAINT \`FK_ed29bc4b40be8124f91da98d743\` FOREIGN KEY (\`register_course_id\`) REFERENCES \`registered_courses\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`vocas\` ADD CONSTRAINT \`FK_35f4d4e9f1b35c240943e67dcce\` FOREIGN KEY (\`lesson_id\`) REFERENCES \`lessons\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`lessons\` ADD CONSTRAINT \`FK_3c4e299cf8ed04093935e2e22fe\` FOREIGN KEY (\`course_id\`) REFERENCES \`courses\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`courses\` ADD CONSTRAINT \`FK_cce7a734fa75f9f3051c50d3283\` FOREIGN KEY (\`author_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`followers\` ADD CONSTRAINT \`FK_95627c64d9f57814010a003032e\` FOREIGN KEY (\`following_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`followers\` ADD CONSTRAINT \`FK_e11d02e2a1197cfb61759da5a87\` FOREIGN KEY (\`follower_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`voca_settings\` ADD CONSTRAINT \`FK_5a3445d417fa83738d9dd423016\` FOREIGN KEY (\`user_id\`) REFERENCES \`users\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`voca_settings\` DROP FOREIGN KEY \`FK_5a3445d417fa83738d9dd423016\``);
        await queryRunner.query(`ALTER TABLE \`followers\` DROP FOREIGN KEY \`FK_e11d02e2a1197cfb61759da5a87\``);
        await queryRunner.query(`ALTER TABLE \`followers\` DROP FOREIGN KEY \`FK_95627c64d9f57814010a003032e\``);
        await queryRunner.query(`ALTER TABLE \`courses\` DROP FOREIGN KEY \`FK_cce7a734fa75f9f3051c50d3283\``);
        await queryRunner.query(`ALTER TABLE \`lessons\` DROP FOREIGN KEY \`FK_3c4e299cf8ed04093935e2e22fe\``);
        await queryRunner.query(`ALTER TABLE \`vocas\` DROP FOREIGN KEY \`FK_35f4d4e9f1b35c240943e67dcce\``);
        await queryRunner.query(`ALTER TABLE \`learned_words\` DROP FOREIGN KEY \`FK_ed29bc4b40be8124f91da98d743\``);
        await queryRunner.query(`ALTER TABLE \`learned_words\` DROP FOREIGN KEY \`FK_d91909522193d6d6e6f7ace540c\``);
        await queryRunner.query(`ALTER TABLE \`registered_courses\` DROP FOREIGN KEY \`FK_b2cc9656eada64cb24704506d9b\``);
        await queryRunner.query(`ALTER TABLE \`registered_courses\` DROP FOREIGN KEY \`FK_4b3b2554c5a479cfe08ae02d8a2\``);
        await queryRunner.query(`ALTER TABLE \`exams\` DROP FOREIGN KEY \`FK_e127a91f633615cdabc8a911ede\``);
        await queryRunner.query(`DROP TABLE \`expired_refresh_tokens\``);
        await queryRunner.query(`DROP INDEX \`REL_5a3445d417fa83738d9dd42301\` ON \`voca_settings\``);
        await queryRunner.query(`DROP TABLE \`voca_settings\``);
        await queryRunner.query(`DROP INDEX \`IDX_fe0bb3f6520ee0469504521e71\` ON \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_97672ac88f789774dd47f7c8be\` ON \`users\``);
        await queryRunner.query(`DROP TABLE \`users\``);
        await queryRunner.query(`DROP INDEX \`IDX_8fc3b802b0b818a7f4c2b4c30c\` ON \`followers\``);
        await queryRunner.query(`DROP TABLE \`followers\``);
        await queryRunner.query(`DROP TABLE \`courses\``);
        await queryRunner.query(`DROP TABLE \`lessons\``);
        await queryRunner.query(`DROP TABLE \`vocas\``);
        await queryRunner.query(`DROP INDEX \`IDX_2c4454871f847447532ed85fc9\` ON \`learned_words\``);
        await queryRunner.query(`DROP TABLE \`learned_words\``);
        await queryRunner.query(`DROP INDEX \`IDX_fbc9587b218000acc37d7c6385\` ON \`registered_courses\``);
        await queryRunner.query(`DROP TABLE \`registered_courses\``);
        await queryRunner.query(`DROP TABLE \`exams\``);
    }

}
