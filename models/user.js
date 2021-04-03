const Schema = sqltool.Schema;

const UserSchema = new Schema({
    email: 'VARCHAR',
    password: 'VARCHAR',
    firstname: 'VARCHAR',
    lastname: 'VARCHAR'
});