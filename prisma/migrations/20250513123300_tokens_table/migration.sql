/*
  Warnings:

  - You are about to drop the `user` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "user";

-- CreateTable
CREATE TABLE "token" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "address" TEXT NOT NULL,
    "daily_volume" DOUBLE PRECISION NOT NULL,
    "decimals" INTEGER NOT NULL,
    "extensions" TEXT,
    "freeze_authority" TEXT,
    "logo_uri" TEXT,
    "mint_authority" TEXT,
    "minted_at" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "permanent_delegate" TEXT,
    "symbol" TEXT NOT NULL,
    "tags" TEXT[] DEFAULT ARRAY[]::TEXT[]
);

-- CreateIndex
CREATE UNIQUE INDEX "token_id_key" ON "token"("id");

-- CreateIndex
CREATE UNIQUE INDEX "token_address_key" ON "token"("address");
