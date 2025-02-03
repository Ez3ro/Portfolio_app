-- CreateTable
CREATE TABLE "Project" (
    "id" SERIAL NOT NULL,
    "title" TEXT,
    "description" TEXT,
    "image" TEXT,

    CONSTRAINT "Project_pkey" PRIMARY KEY ("id")
);
