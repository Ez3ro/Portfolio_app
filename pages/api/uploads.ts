import { NextApiRequest, NextApiResponse } from 'next';
import multer from 'multer';
import { createRouter } from 'next-connect';
import path from 'path';
import fs from 'fs';
import { PrismaClient } from '@prisma/client';

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

const router = createRouter<NextApiRequest, NextApiResponse>();

router.use(upload.single('file'));

router.post(async (req: NextApiRequest & { file: Express.Multer.File }, res: NextApiResponse) => {
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
    res.status(500).json({ error: `Something went wrong: ${error.message}` });
  }
});

export default router.handler();

export const config = {
  api: {
    bodyParser: false,
  },
};