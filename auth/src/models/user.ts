import mongoose from "mongoose";
import { Password } from "../services/password";

interface IUserAttrs {
  email: string;
  password: string;
}

interface IUserModel extends mongoose.Model<IUserDoc> {
  build(attrs: IUserAttrs): IUserDoc;
}

// interface of created user
interface IUserDoc extends mongoose.Document {
  email: string;
  password: string;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    trim: true,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    trim: true,
    required: true,
  },
});

// pre-save hook:
userSchema.pre("save", async function (done) {
  // this will trigger when user was created or password was changed
  if (this.isModified("password")) {
    const hashedPass = await Password.toHash(this.get("password"));
    this.set("password", hashedPass);
  }

  done();
});

userSchema.statics.build = (attr: IUserAttrs) => {
  return new UserModel(attr);
};

const UserModel = mongoose.model<IUserDoc, IUserModel>("User", userSchema);

export { UserModel };
