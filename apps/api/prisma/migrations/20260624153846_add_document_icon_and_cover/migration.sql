-- AlterTable
ALTER TABLE "Document" ADD COLUMN     "archived_at" TIMESTAMP(3),
ADD COLUMN     "cover_url" TEXT,
ADD COLUMN     "icon" TEXT;

-- CreateTable
CREATE TABLE "alembic_version" (
    "version_num" VARCHAR(32) NOT NULL,

    CONSTRAINT "alembic_version_pkey" PRIMARY KEY ("version_num")
);
