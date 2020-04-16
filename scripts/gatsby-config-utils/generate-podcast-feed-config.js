const setupPodcastFeed = require('./setup-podcast-feed');
const serializePodcastFeed = require('./serialize-podcast-feed');
const query = require('./podcast-query');

const generatePodcastFeedConfig = ({ index, name, categories }) => ({
  serialize: ({ query }) =>
    serializePodcastFeed({
      podcast: query.allContentfulPodcast.edges[index].node,
      siteMetadata: query.site.siteMetadata,
    }),
  output: `${name}/feed.rss`,
  query,
  setup: ({ query }) =>
    setupPodcastFeed({
      siteMetadata: query.site.siteMetadata,
      podcast: query.allContentfulPodcast.edges[index].node,
      categories,
    }),
});

module.exports = generatePodcastFeedConfig;
