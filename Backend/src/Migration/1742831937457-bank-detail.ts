import { MigrationInterface, QueryRunner } from "typeorm";

export class BankDetail1742831937457 implements MigrationInterface {
    name = 'BankDetail1742831937457'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`bank_details\` (\`id\` int NOT NULL AUTO_INCREMENT, \`bank_name\` varchar(255) NOT NULL, \`branch\` varchar(255) NOT NULL, \`ifsc_code\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`DROP TABLE \`bank_details\``);
    }

}
