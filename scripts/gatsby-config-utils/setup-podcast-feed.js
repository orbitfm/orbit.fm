const { DateTime } = require('luxon');

const setupPodcastFeed = ({ podcast, siteMetadata }) => ({
  title: podcast.name,
  description: podcast.description.description,
  feed_url: `${siteMetadata.siteUrl}/${podcast.fields.slug}/feed.rss`,
  site_url:
    podcast.fields.slug === `master`
      ? siteMetadata.siteUrl
      : `${siteMetadata.siteUrl}/${podcast.fields.slug}`,
  image_url: podcast.image ? `https:${podcast.image.file.url}` : ``,
  managingEditor: `${siteMetadata.ownerEmail} (${siteMetadata.owner})`,
  webMaster: `${siteMetadata.ownerEmail} (${siteMetadata.owner})`,
  copyright: `${new Date().getFullYear()} ${siteMetadata.owner}`,
  language: 'en',
  categories: siteMetadata.categories,
  pubDate: DateTime.fromISO(new Date()).toHTTP(),
  ttl: '60',
  custom_namespaces: {
    itunes: 'http://www.itunes.com/dtds/podcast-1.0.dtd',
  },
  custom_elements: [
    { 'itunes:subtitle': siteMetadata.description },
    { 'itunes:author': siteMetadata.owner },
    { 'itunes:explicit': 'clean' },
    {
      'itunes:summary': siteMetadata.description,
    },
    {
      'itunes:owner': [
        { 'itunes:name': siteMetadata.owner },
        { 'itunes:email': siteMetadata.ownerEmail },
      ],
    },
    {
      'itunes:image': {
        _attr: {
          href: podcast.image ? `https:${podcast.image.file.url}` : ``,
        },
      },
    },
    ...siteMetadata.categories.map(c => ({
      'itunes:category': {
        _attr: {
          text: c,
        },
      },
    })),
  ],
});

module.exports = setupPodcastFeed;
