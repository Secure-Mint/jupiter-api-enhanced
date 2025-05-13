/*
  Warnings:

  - A unique constraint covering the columns `[minted_at]` on the table `token` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `token` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[symbol]` on the table `token` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "token_minted_at_key" ON "token"("minted_at");

-- CreateIndex
CREATE UNIQUE INDEX "token_name_key" ON "token"("name");

-- CreateIndex
CREATE UNIQUE INDEX "token_symbol_key" ON "token"("symbol");
