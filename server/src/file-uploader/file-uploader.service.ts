import { Injectable, Inject } from '@nestjs/common';
import * as admin from 'firebase-admin';
import * as path from 'path';
import * as os from 'os';
import * as fs from 'fs';
import * as crypto from 'crypto';

@Injectable()
export class FileUploaderService {
    constructor(@Inject('FIREBASE') private readonly firebase: typeof admin) {}

    async uploadFile(file: Express.Multer.File): Promise<string> {
        const bucket = admin.storage().bucket();
        const fileExtension = path.extname(file.originalname);
      
        const filename = `${crypto.randomBytes(16).toString('hex')}${fileExtension}`;
        
        const tempFilePath = path.join(os.tmpdir(), filename);
      
        await fs.promises.writeFile(tempFilePath, file.buffer);
      
        const options = {
          destination: filename,
          gzip: true,
          metadata: {
            cacheControl: 'public, max-age=31536000',
          },
        };
      
        const [uploadedFile] = await bucket.upload(tempFilePath, options);
      
        await fs.promises.unlink(tempFilePath);
      

      const [publicUrl] = await uploadedFile.getSignedUrl({
        action: 'read',
        expires: '03-01-2500',
      });
      
      console.log('File available at', uploadedFile);
      return publicUrl;
  }
}