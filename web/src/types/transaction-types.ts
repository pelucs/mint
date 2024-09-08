export interface ITransaction {
  id: string;
  userId: string;
  description: string;
  amount: number;
  dateAt: Date;
  createAt: Date;
  attachment: string[];
  category: string;
  account: string;
  method?: string;
  type: string;
  note: string;
}