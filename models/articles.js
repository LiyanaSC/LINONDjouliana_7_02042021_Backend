const Schema = sqltool.Schema;

const ArticleSchema = new Schema({
    userId: 'TINYINT UNSIGNED',
    publicationDate: 'DATETIME',
    title: 'VARCHAR',
    imageUrl: 'MEDIUMBLOB',
    description: 'LONGTEXT'
});