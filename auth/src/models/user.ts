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

const userSchema = new mongoose.Schema(
  {
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
  },
  {
    versionKey: false,
    toJSON: {
      // define how this document will be transformed into json; doc - the user document, ret - what will be turned into json
      transform(doc, ret) {
        ret.id = ret._id;

        delete ret._id;
        delete ret.password;
      },
    },
  }
);

// pre-save hook:
userSchema.pre("save", async function (done) {
  // this will trigger when user has updated his pass
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
