import { MigrationInterface, QueryRunner } from 'typeorm'

export class WalletTable1603634668280 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(
            `INSERT INTO "wallet" ("id", "password", "currency", "balance") VALUES ('2958202a-4a4f-4610-9a4f-2c4a6513d792', 'abcd', 'BTC', '130.4')`,
        )
        await queryRunner.query(
            `INSERT INTO "wallet" ("id", "password", "currency", "balance") VALUES ('986cd625-fea7-41b6-ac5b-a06b2455cf02', 'abcd', 'ETH', '87')`,
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {}
}
