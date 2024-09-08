import { Replace } from "../../helpers/replace";
import { ObjectId } from "bson";

export interface ITransaction {
  userId: string;
  description: string;
  amount: number;
  dateAt: Date;
  createAt: Date;
  attachment: string[];
  type: string;
  category?: string | null | undefined;
  account?: string | null | undefined;
  method?: string | null | undefined;
  note?: string | null | undefined;
}

export class Transaction {
  private _id: string;
  private props: ITransaction;

  constructor(props: Replace<ITransaction, { createAt?: Date }>, id?: string) {
    const currentDate = new Date();
    const localDate = new Date(currentDate.getTime() - currentDate.getTimezoneOffset() * 60000);

    this._id = id ?? new ObjectId().toHexString()
    this.props = {
      ...props,
      createAt: props.createAt ?? localDate
    }
  }

  public get id() { return this._id }
  public get userId() { return this.props.userId }
  public get description() { return this.props.description }
  public get amount() { return this.props.amount }
  public get dateAt() { return this.props.dateAt }
  public get createAt() { return this.props.createAt }
  public get attachment() { return this.props.attachment }
  public get type(){ return this.props.type }
  public get category(): string | null | undefined { return this.props.category }
  public get account(): string | null | undefined { return this.props.account }
  public get method(): string | null | undefined { return this.props.method }
  public get note(): string | null | undefined { return this.props.note }

  public set userId(userId: string) { this.props.userId = userId }
  public set description(description: string) { this.props.description = description }
  public set amount(amount: number) { this.props.amount = amount }
  public set dateAt(dateAt: Date) { this.props.dateAt = dateAt }
  public set createAt(createAt: Date) { this.props.createAt = createAt }
  public set attachment(attachment: string[]) { this.props.attachment = attachment }
  public set category(category: string) { this.props.category = category }
  public set account(account: string) { this.props.account = account }
  public set method(method: string) { this.props.method = method }
  public set type(type: string) { this.props.type = type }
  public set note(note: string) { this.props.note = note }
}