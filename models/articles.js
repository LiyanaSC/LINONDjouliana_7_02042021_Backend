const Schema = sqltool.Schema;

const ArticleSchema = new Schema({
    userId: { type: 'TINYINT UNSIGNED', require: true },
    publicationDate: { type: 'DATETIME', require: true },
    title: { type: 'VARCHAR', require: true },
    imageUrl: { type: 'MEDIUMBLOB', require: true },
    description: { type: 'LONGTEXT', require: true }
});