import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { TypeOrmModule } from '@nestjs/typeorm';
import { diskStorage } from 'multer';
import { basename, extname, resolve } from 'path';
import shortid = require('shortid');
import { FocusedEntity } from '../entities/focused.entity';
import { LanguageEntity } from '../entities/language.entity';
import { FocusedMarketController } from './focused-market.controller';
import { FocusedMarketService } from './focused-market.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([FocusedEntity, LanguageEntity]),
    MulterModule.registerAsync({
      useFactory: () => ({
        storage: diskStorage({
          destination: (req, file, cb) => cb(null, resolve('.', process.env.UPLOAD_FOCUSED_MARKET_PATH)),
          filename: (req: any, file: any, cb: any) => {
            cb(
              null,
              `${basename(file.originalname, extname(file.originalname).toLowerCase())}_${shortid.generate()}${extname(
                file.originalname,
              ).toLowerCase()}`,
            );
          },
        }),
        limits: {
          fileSize: parseInt(process.env.MAX_SIZE_PER_FILE_UPLOAD, 10),
          files: parseInt(process.env.MAX_NUMBER_FILE_UPLOAD, 10),
        },
      }),
    }),
  ],
  controllers: [FocusedMarketController],
  providers: [FocusedMarketService],
})
export class FocusedMarketModule {}
