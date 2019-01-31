const generatePodcastFeedConfig = require('./generate-podcast-feed-config');
const serializePodcastFeed = require('./serialize-podcast-feed');
const setupPodcastFeed = require('./setup-podcast-feed');

const generatePodcastFeedConfigs = () => [
  generatePodcastFeedConfig({ index: 0 }),
  generatePodcastFeedConfig({ index: 1 }),
  generatePodcastFeedConfig({ index: 2 }),
  {
    output: `master.rss`,
    setup: ({ query }) =>
      setupPodcastFeed({
        siteMetadata: query.site.siteMetadata,
        podcast: {
          name: `${query.site.siteMetadata.title} master feed`,
          fields: {
            slug: 'master',
          },
          description: {
            description: query.site.siteMetadata.description,
          },
          image: {
            file: { url: query.site.siteMetadata.coverArt },
          },
        },
      }),
    serialize: ({ query }) =>
      serializePodcastFeed({
        podcast: {
          episode: query.allContentfulPodcast.edges.reduce(
            (a, { node }) => [...a, ...(node.episode || [])],
            []
          ),
        },
        siteMetadata: query.site.siteMetadata,
      }),
  },
];

module.exports = generatePodcastFeedConfigs;
