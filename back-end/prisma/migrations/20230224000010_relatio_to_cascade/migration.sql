-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_card" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "tarefa" TEXT NOT NULL,
    "colunaId" INTEGER NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "card_colunaId_fkey" FOREIGN KEY ("colunaId") REFERENCES "colunas" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_card" ("colunaId", "createdAt", "id", "tarefa") SELECT "colunaId", "createdAt", "id", "tarefa" FROM "card";
DROP TABLE "card";
ALTER TABLE "new_card" RENAME TO "card";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
