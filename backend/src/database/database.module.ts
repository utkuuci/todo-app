import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
    imports: [
        TypeOrmModule.forRootAsync({
            useFactory: (configService: ConfigService) => ({
                type: 'postgres',
                host: configService.get("DB_HOST"),
                port: configService.get("DB_PORT"),
                database: configService.get("DB_DATABASE"),
                username: configService.get('DB_USERNAME'),
                password: configService.get('DB_PASSWORD'),
                entities: ['dist/src/entities/**/*.entity.js'],
                autoLoadEntities: true,
                synchronize: true
            }),
            inject: [ConfigService] 
        })
    ]
})
export class DatabaseModule {}