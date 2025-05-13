-- CreateEnum
CREATE TYPE "BidStatus" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- CreateTable
CREATE TABLE "BidRequest" (
    "id" SERIAL NOT NULL,
    "hostId" INTEGER NOT NULL,
    "propertyId" INTEGER,
    "date" TIMESTAMP(3) NOT NULL,
    "frequency" TEXT NOT NULL,
    "serviceType" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BidRequest_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BidOffer" (
    "id" SERIAL NOT NULL,
    "requestId" INTEGER NOT NULL,
    "cleanerId" INTEGER NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "status" "BidStatus" NOT NULL DEFAULT 'PENDING',
    "message" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BidOffer_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "BidRequest" ADD CONSTRAINT "BidRequest_hostId_fkey" FOREIGN KEY ("hostId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BidRequest" ADD CONSTRAINT "BidRequest_propertyId_fkey" FOREIGN KEY ("propertyId") REFERENCES "Property"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BidOffer" ADD CONSTRAINT "BidOffer_requestId_fkey" FOREIGN KEY ("requestId") REFERENCES "BidRequest"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "BidOffer" ADD CONSTRAINT "BidOffer_cleanerId_fkey" FOREIGN KEY ("cleanerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
