-- AlterTable
ALTER TABLE "ResponsePost" ADD COLUMN     "responseId" INTEGER;

-- AddForeignKey
ALTER TABLE "ResponsePost" ADD CONSTRAINT "ResponsePost_responseId_fkey" FOREIGN KEY ("responseId") REFERENCES "ResponsePost"("id") ON DELETE SET NULL ON UPDATE CASCADE;
