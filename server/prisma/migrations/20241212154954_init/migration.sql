-- CreateTable
CREATE TABLE "quotes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "content" TEXT NOT NULL,
    "author" TEXT NOT NULL,
    "tags" TEXT NOT NULL,
    "authorSlug" TEXT NOT NULL,
    "length" INTEGER NOT NULL,
    "dateAdded" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "dateModified" DATETIME NOT NULL,
    "externalId" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "favorites" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "quoteId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "favorites_quoteId_fkey" FOREIGN KEY ("quoteId") REFERENCES "quotes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "quotes_externalId_key" ON "quotes"("externalId");

-- CreateIndex
CREATE UNIQUE INDEX "favorites_userId_quoteId_key" ON "favorites"("userId", "quoteId");
