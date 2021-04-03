const Schema = sqltool.Schema;

const UserSchema = new Schema({
    email: { type: 'VARCHAR', require: true, unique: true },
    password: { type: 'VARCHAR', require: true },
    firstname: { type: 'VARCHAR', require: true },
    lastname: { type: 'VARCHAR', require: true }
});