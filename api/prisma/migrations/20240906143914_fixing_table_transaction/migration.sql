/*
  Warnings:

  - Made the column `type` on table `Transaction` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Transaction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "dateAt" DATETIME NOT NULL,
    "createAt" DATETIME NOT NULL,
    "attachment" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "category" TEXT,
    "account" TEXT,
    "method" TEXT,
    "note" TEXT,
    CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_Transaction" ("account", "amount", "attachment", "category", "createAt", "dateAt", "description", "id", "method", "note", "type", "userId") SELECT "account", "amount", "attachment", "category", "createAt", "dateAt", "description", "id", "method", "note", "type", "userId" FROM "Transaction";
DROP TABLE "Transaction";
ALTER TABLE "new_Transaction" RENAME TO "Transaction";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
