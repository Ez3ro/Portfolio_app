/* eslint-disable */
import { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
import { createRouter } from 'next-connect';
import path from 'path';
import fs from 'fs';
import { PrismaClient } from '@prisma/client';

interface MulterRequest extends NextApiRequest {
  file?: Express.Multer.File;
}

const prisma = new PrismaClient();

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const uploadPath = path.join(process.cwd(), 'public', 'uploads');
      if (!fs.existsSync(uploadPath)) {
        fs.mkdirSync(uploadPath, { recursive: true });
      }
      cb(null, uploadPath);
    },
    filename: (req, file, cb) => {
      cb(null, `${Date.now()}-${file.originalname}`);
    },
  }),
});

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
  try {
    if (!req.file) {
      return res.status(400).json({ error: 'No file uploaded' });
    }

    const { title, description } = req.body;
    const imagePath = `/uploads/${req.file.filename}`;

    const project = await prisma.project.create({
      data: {
        title,
        description,
        image: imagePath,
      },
    });

    res.status(200).json(project);
  } catch (error) {
    console.error('Error during file upload:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    res.status(500).json({ error: `Something went wrong: ${errorMessage}` });
  }
});

export default router.handler();

export const config = {
  api: {
    bodyParser: false,
  },
};