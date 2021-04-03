const Schema = sqltool.Schema;

const commentSchema = new Schema({
    userId: { type: 'TINYINT UNSIGNED', require: true },
    articleId: { type: 'TINYINT UNSIGNED', require: true },
    publicationDate: { type: 'DATETIME', require: true },
    content: { type: 'LONGTEXT', require: true }
});