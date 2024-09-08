-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "amount" REAL NOT NULL,
    "dateAt" DATETIME NOT NULL,
    "createAt" DATETIME NOT NULL,
    "category" TEXT,
    "account" TEXT,
    "method" TEXT,
    "type" TEXT,
    "note" TEXT,
    CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
