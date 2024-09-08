import { Replace } from "../../helpers/replace";
import { ObjectId } from "bson";

interface IUser {
  name: string;
  email: string;
  password: string;
  createAt: Date;
}

export class User {
  private _id : string;
  private props: IUser;
  
  constructor (props: Replace<IUser, { createAt?: Date }>, id?: string) {
    const currentDate = new Date();
    const localDate = new Date(currentDate.getTime() - currentDate.getTimezoneOffset() * 60000);

    this._id = id ?? new ObjectId().toHexString();
    this.props = {
      ...props,
      createAt: props.createAt ?? localDate,
    };
  }

  public get id() { return this._id }
  public get name() { return this.props.name }
  public get email() { return this.props.email }
  public get password() { return this.props.password }
  public get createAt() { return this.props.createAt }

  public set name(name: string) { this.props.name = name }
  public set email(email: string) { this.props.email = email }
  public set password(password: string) { this.props.password = password }
  public set createAt(createAt: Date) { this.props.createAt = createAt }
}