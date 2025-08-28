-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "uniqueLink" TEXT NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."AnonymousMessage" (
    "id" SERIAL NOT NULL,
    "text" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "receiverId" INTEGER NOT NULL,

    CONSTRAINT "AnonymousMessage_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "public"."User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "User_uniqueLink_key" ON "public"."User"("uniqueLink");

-- AddForeignKey
ALTER TABLE "public"."AnonymousMessage" ADD CONSTRAINT "AnonymousMessage_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
