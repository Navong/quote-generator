/*
  Warnings:

  - You are about to drop the column `tags` on the `quotes` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_quotes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "authorSlug" TEXT NOT NULL,
    "length" INTEGER NOT NULL,
    "dateAdded" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModified" DATETIME NOT NULL,
    "externalId" TEXT NOT NULL
);
INSERT INTO "new_quotes" ("author", "authorSlug", "content", "dateAdded", "dateModified", "externalId", "id", "length") SELECT "author", "authorSlug", "content", "dateAdded", "dateModified", "externalId", "id", "length" FROM "quotes";
DROP TABLE "quotes";
ALTER TABLE "new_quotes" RENAME TO "quotes";
CREATE UNIQUE INDEX "quotes_externalId_key" ON "quotes"("externalId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
