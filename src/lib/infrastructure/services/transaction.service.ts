import { Transaction, db } from "@/db";

export default class TransactionService {
    startTransaction<T>(clb: (tx: Transaction) => Promise<T>): Promise<T> {
        const invoker = db;
        return invoker.transaction(clb as any);
    }
}
