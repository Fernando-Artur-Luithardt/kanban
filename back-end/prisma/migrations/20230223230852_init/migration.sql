-- CreateTable
CREATE TABLE "colunas" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "titulo" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- CreateTable
CREATE TABLE "card" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tarefa" TEXT NOT NULL,
    "colunaId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "card_colunaId_fkey" FOREIGN KEY ("colunaId") REFERENCES "colunas" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
