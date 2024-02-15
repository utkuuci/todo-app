
import { DataSource } from "typeorm";
import {config} from 'dotenv'
import { ConfigService } from "@nestjs/config";




config();

const configService = new ConfigService();

export default new DataSource({
    type: 'postgres',
    host: configService.get("DB_HOST"),
    port: configService.get("DB_PORT"),
    database: configService.get("DB_DATABASE"),
    username: configService.get('DB_USERNAME'),
    password: configService.get('DB_PASSWORD'),
    migrations:['migrations/**'],
    entities: ["src/entities/**/*.entity.ts"]
})