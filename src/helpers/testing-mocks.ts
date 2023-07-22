import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";

export async function initInMemoryMongo(): Promise<void> {
    const mongoServer = await MongoMemoryServer.create();
    await mongoose.connect(mongoServer.getUri());
}

export async function clearInMemoryMongo(): Promise<void> {
    await mongoose.disconnect();
}

export async function clearDatabase(): Promise<void> {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        const collection = collections[key];
        await collection.deleteMany({});
    }
}
