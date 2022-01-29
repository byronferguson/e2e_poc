import { TypeOrmModuleOptions } from '@nestjs/typeorm';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

class DatabaseConfigService {
  constructor(private readonly env: { [k: string]: string | undefined }) {}

  private getValue(key: string, throwOnMissing = true): string {
    const value = this.env[key];
    if (!value && throwOnMissing) {
      throw new Error(`config error = missing env.${key}`);
    }

    return value;
  }

  public ensureValues(keys: string[]): this {
    keys.forEach(k => this.getValue(k, true));
    return this;
  }

  public getPort(): number {
    return Number(this.getValue('DB_PORT', true));
  }

  public isProduction(): boolean {
    const mode = this.getValue('MODE', false);
    return mode !== 'DEV';
  }

  public getTypeOrmConfig(): TypeOrmModuleOptions {
    return {
      type: 'postgres',
      host: this.getValue('DB_HOSTNAME'),
      // port: this.getPort(),
      username: this.getValue('DB_USERNAME'),
      password: this.getValue('DB_PASSWORD'),
      database: this.getValue('DB_DATABASE'),
      // UPDATE: Service Database Schema
      schema: 'example',
      dropSchema: false,
      synchronize: false,
      migrationsRun: true,
      logging: !this.isProduction(), // this should be returned as an array in production (e.g. ["error"])
      entities: ['dist/**/*.entity.{ts,js}'],
      subscribers: ['dist/**/*.subscribers.{ts,js}'],
      migrations: ['dist/migrations/**/*{.ts,.js}'],
      cli: {
        migrationsDir: 'src/migrations',
        subscribersDir: 'src/subscribers',
      },
    };
  }
}

const databaseConfigService = new DatabaseConfigService(process.env);

export { databaseConfigService };
