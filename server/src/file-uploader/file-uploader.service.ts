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
      
        // Generate a unique filename using a random string
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
      
        await bucket.upload(tempFilePath, options);
      
        await fs.promises.unlink(tempFilePath);
      
        const publicUrl = `https://storage.googleapis.com/${bucket.name}/${filename}`;
      
        console.log(publicUrl);
        return publicUrl;
    }
}