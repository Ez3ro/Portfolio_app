import { NextApiRequest, NextApiResponse } from "next";
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const projects = await prisma.project.findMany();
        res.json(projects);
    } else if (req.method === 'POST') {
        const { title, description, image} = req.body;
        const project = await prisma.project.create({
          data: { title, description, image: image || null },
        });
        res.status(201).json(project);
    } else if (req.method === 'DELETE') {
        await prisma.project.deleteMany();
        res.status(204).end();}
        else {
        res.setHeader('Allow', ['GET', 'POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}