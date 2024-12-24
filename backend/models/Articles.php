<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "articles".
 *
 * @property int $ArticleID
 * @property string $Title
 * @property string|null $Content
 * @property string|null $PublicationDate
 *
 * @property Articlecomments[] $articlecomments
 */
class Articles extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'articles';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['Title'], 'required'],
            [['Content'], 'string'],
            [['PublicationDate'], 'safe'],
            [['Title'], 'string', 'max' => 255],
            [['LikesCount'], 'integer'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'ArticleID' => 'Article ID',
            'Title' => 'Title',
            'Content' => 'Content',
            'PublicationDate' => 'Publication Date',
            'LikesCount' => 'LikesCount',
        ];
    }

    /**
     * Gets query for [[Articlecomments]].
     *
     * @return \yii\db\ActiveQuery
     */
    public function getArticlecomments()
    {
        return $this->hasMany(Articlecomments::class, ['ArticleID' => 'ArticleID']);
    }
    
}
