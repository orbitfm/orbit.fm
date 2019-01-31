const setupPodcastFeed = require('./setup-podcast-feed');
const serializePodcastFeed = require('./serialize-podcast-feed');

const generatePodcastFeedConfig = ({ index, name }) => ({
  serialize: ({ query }) =>
    serializePodcastFeed({
      podcast: query.allContentfulPodcast.edges[index].node,
      siteMetadata: query.site.siteMetadata,
    }),
  output: `${name}/feed.rss`,
  setup: ({ query }) =>
    setupPodcastFeed({
      siteMetadata: query.site.siteMetadata,
      podcast: query.allContentfulPodcast.edges[index].node,
    }),
});

module.exports = generatePodcastFeedConfig;
