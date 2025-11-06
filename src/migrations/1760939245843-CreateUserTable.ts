import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateUserTable1760939245843 implements MigrationInterface {
    name = 'CreateUserTable1760939245843'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`role\` enum ('user', 'admin') NOT NULL DEFAULT 'user', \`tasks\` varchar(255) NOT NULL, \`projects\` varchar(255) NOT NULL, \`provider\` varchar(255) NULL, \`providerId\` varchar(255) NULL, \`createdAt\` datetime NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`user\``);
    }

}
