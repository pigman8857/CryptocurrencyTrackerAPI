import { MigrationInterface, QueryRunner } from "typeorm";

export class InitSchema1753870082414 implements MigrationInterface {
    name = 'InitSchema1753870082414'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`crypto\` (\`id\` int NOT NULL, \`name\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`portfolio\` (\`id\` int NOT NULL AUTO_INCREMENT, \`purchasePrice\` decimal(20,8) NOT NULL, \`amount\` decimal(20,8) NOT NULL, \`dateOfPurchase\` datetime NOT NULL, \`userId\` int NULL, \`cryptoId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`portfolio\` ADD CONSTRAINT \`FK_9d041c43c782a9135df1388ae16\` FOREIGN KEY (\`userId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`portfolio\` ADD CONSTRAINT \`FK_26adf61ebb101e6784ccccc1dd5\` FOREIGN KEY (\`cryptoId\`) REFERENCES \`crypto\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`portfolio\` DROP FOREIGN KEY \`FK_26adf61ebb101e6784ccccc1dd5\``);
        await queryRunner.query(`ALTER TABLE \`portfolio\` DROP FOREIGN KEY \`FK_9d041c43c782a9135df1388ae16\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP TABLE \`portfolio\``);
        await queryRunner.query(`DROP TABLE \`crypto\``);
    }

}
