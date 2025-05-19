import lodash from "lodash";
import { Low } from "lowdb";
import { JSONFile } from "lowdb/node";
export type User = {
  id: string;
  name: string;
  email: string;
  password: string;
};

export type Account = {
  id: string;
  userId: string;
  balance: number;
  currency: "BDT" | "USD" | "EUR";
  lastUpdatedAt: Date;
};

export type Transaction = {
  id: string;
  accountId: string;
  amount: number;
  type: "credit" | "debit";
  lastBalance: number;
  createdAt: Date;
};

export type Data = {
  users: User[];
  accounts: Account[];
  transactions: Transaction[];
};
// Extend Low class with a new `chain` field
class LowWithLodash<T> extends Low<T> {
  chain: lodash.ExpChain<this["data"]> = lodash.chain(this).get("data");
}

const defaultData: Data = {
  users: [],
  accounts: [],
  transactions: [],
};
const adapter = new JSONFile<Data>("db.json");
const db = new LowWithLodash(adapter, defaultData);
db.read();

export { db };
