import { Module, Get } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { ConfigService } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      useFactory: async (configService: ConfigService) => ({
        type: "mongodb", // for sql : "mysql"
        url: configService.get('LOCAL_MONGODB_URL'),
        useNewUrlParser: true,
        useUnifiedTopology: true,
        // type: "mysql",
        // host : configService.get("LOCAL_DB_HOST"),
        // port: 3306,
        // username: configService.get("LOCAL_DB_USER"),
        // password: configService.get("LOCAL_DB_PASSWORD"),
        // database: configService.get("LOCAL_DB_NAME"),
        synchronize: true,
        // entities: ['dist/**/*.entity{.ts,.js}'],
        bigNumberStrings: false,
        logging: true,
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([]),
  ],
  controllers: [AppController],
  providers: [AppService],
  exports: [AppService],
})
export class AppModule {
}