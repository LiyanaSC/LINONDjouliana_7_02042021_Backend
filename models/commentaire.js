const Schema = sqltool.Schema;

const commentSchema = new Schema({
    userId: 'TINYINT UNSIGNED',
    articleId: 'TINYINT UNSIGNED',
    publicationDate: 'DATETIME',
    content: 'LONGTEXT'
});