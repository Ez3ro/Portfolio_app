/* eslint-disable */
import { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
import { createRouter } from 'next-connect';
import { PrismaClient } from '@prisma/client';
import cloudinary from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

interface MulterRequest extends NextApiRequest {
  file?: Express.Multer.File;
}

const prisma = new PrismaClient();

cloudinary.v2.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = multer.memoryStorage();
const upload = multer({ storage });

const uploadMiddleware = upload.single('file');

const router = createRouter<NextApiRequest, NextApiResponse>();
const runMiddleware = (req: NextApiRequest, res: NextApiResponse, fn: Function) => {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
};

router.use(async (req, res, next) => {
  try {
    await runMiddleware(req, res, uploadMiddleware);
    next();
  } catch (err) {
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: `File upload error: ${errorMessage}` });
  }
});

router.post(async (req: MulterRequest, res: NextApiResponse) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No file uploaded' });
  }

  try {
    const result = await new Promise((resolve, reject) => {
      cloudinary.v2.uploader.upload_stream(
        { resource_type: 'auto' },
        (error, result) => {
          if (error) {
            return reject(error);
          }
          resolve(result);
        }
      ).end(req.file!.buffer);
    });

    const imageUrl = (result as any).secure_url;

    // Save the URL to the database
    const project = await prisma.project.create({
      data: {
        title: req.body.title,
        description: req.body.description,
        image: imageUrl,
      },
    });

    res.status(200).json({ project });
  } catch (err) {
    console.error('Error uploading file:', err); // Log the error
    const errorMessage = err instanceof Error ? err.message : 'Unknown error';
    res.status(500).json({ error: `File upload error: ${errorMessage}` });
  }
});

export default router.handler({
  onError: (err, req, res) => {
    res.status(500).json({ error: `Unexpected error: ${err.message}` });
  },
});