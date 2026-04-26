export default {
  name: 'post',
  title: 'Blog Post',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Titre',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'publishedAt',
      title: 'Date de publication',
      type: 'datetime',
    },
    {
      name: 'mainImage',
      title: 'Image de couverture',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
    {
      name: 'excerpt',
      title: 'Résumé',
      type: 'text',
    },
    {
      name: 'body',
      title: 'Contenu',
      type: 'array',
      of: [
        { type: 'block' },
        { type: 'image' },
        {
          type: 'object',
          name: 'table',
          title: 'Tableau',
          fields: [
            {
              name: 'rows',
              title: 'Lignes',
              type: 'array',
              of: [{
                type: 'object',
                name: 'row',
                title: 'Ligne',
                fields: [{
                  name: 'cells',
                  title: 'Cellules',
                  type: 'array',
                  of: [{ type: 'string' }]
                }]
              }]
            }
          ]
        }
      ]
    },
    {
      name: 'category',
      title: 'Catégorie',
      type: 'string',
    },
    {
      name: 'faq',
      title: 'FAQ (Questions/Réponses)',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'question', title: 'Question', type: 'string' },
          { name: 'answer', title: 'Réponse', type: 'text' }
        ],
        preview: { select: { title: 'question' } }
      }]
    },
    {
      name: 'seoTitle',
      title: 'Meta Title (SEO)',
      type: 'string',
      description: 'Titre optimisé pour les moteurs de recherche (max 60 caractères)',
      validation: Rule => Rule.max(60).warning('Le titre ne devrait pas dépasser 60 caractères.')
    },
    {
      name: 'seoDescription',
      title: 'Meta Description (SEO)',
      type: 'text',
      rows: 3,
      description: 'Description optimisée pour les moteurs de recherche (max 160 caractères)',
      validation: Rule => Rule.max(160).warning('La description ne devrait pas dépasser 160 caractères.')
    }
  ],
}
