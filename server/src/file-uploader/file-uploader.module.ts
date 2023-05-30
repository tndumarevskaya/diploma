import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as admin from 'firebase-admin';
import { FileUploaderController } from './file-uploader.controller';
import { FileUploaderService } from './file-uploader.service';

@Module({
  providers: [
    {
      provide: 'FIREBASE',
      useFactory: (configService: ConfigService) => {
        const firebasePrivateKey = configService.get<string>('FIREBASE_PRIVATE_KEY').replace(/\\n/g, '\n');
        const firebaseProjectId = configService.get<string>('FIREBASE_PROJECT_ID');
        const firebaseClientEmail = configService.get<string>('FIREBASE_CLIENT_EMAIL');
        const firebaseBucketUrl = configService.get<string>('FIREBASE_BUCKET_URL');

        return admin.initializeApp({
          credential: admin.credential.cert({
            projectId: firebaseProjectId,
            clientEmail: firebaseClientEmail,
            privateKey: firebasePrivateKey,
          }),
          storageBucket: firebaseBucketUrl,
        });
      },
      inject: [ConfigService],
    },
    FileUploaderService
  ],
  controllers: [FileUploaderController],
  exports: ['FIREBASE', FileUploaderService],
})
export class FileUploaderModule {}