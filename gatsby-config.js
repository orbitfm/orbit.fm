require('dotenv').config();
const generatePodcastFeedConfig = require('./scripts/gatsby-config-utils/generate-podcast-feed-config');
const serializePodcastFeed = require('./scripts/gatsby-config-utils/serialize-podcast-feed');
const setupPodcastFeed = require('./scripts/gatsby-config-utils/setup-podcast-feed');
const query = require('./scripts/gatsby-config-utils/podcast-query');
const topQuery = require('./scripts/gatsby-config-utils/podcast-top-query');

module.exports = {
  siteMetadata: {
    title: `Orbit FM`,
    description: `Orbit FM is a place with podcasts.`,
    coverArt: ``,
    siteUrl: `https://www.orbit.fm`,
    owner: `Orbit FM`,
    ownerEmail: `hello@orbit.fm`,
    categories: [
      { name: `Technology`, sub: [] },
      { name: `Education`, sub: [] },
    ],
  },
  plugins: [
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: topQuery,
        feeds: [
          generatePodcastFeedConfig({
            index: 0,
            name: 'bookbytes',
            categories: [
              { name: `Technology`, sub: [] },
              { name: `Education`, sub: [] },
              { name: `Arts`, sub: ['Books'] },
            ],
          }),
          generatePodcastFeedConfig({
            index: 1,
            name: 'imprint',
            categories: [
              { name: `Religion & Spirituality`, sub: [`Christianity`] },
              { name: `Arts`, sub: [`Books`] },
            ],
          }),
          generatePodcastFeedConfig({
            index: 2,
            name: 'talkingdudes',
            categories: [
              { name: `Society & Culture`, sub: [] },
              { name: `Education`, sub: [] },
            ],
          }),
          generatePodcastFeedConfig({
            index: 3,
            name: 'weboftomorrow',
            categories: [
              { name: `Technology`, sub: [] },
              { name: `Education`, sub: [] },
            ],
          }),
          {
            query,
            output: `master.rss`,
            setup: ({ query }) =>
              setupPodcastFeed({
                categories: [
                  { name: `Technology`, sub: [] },
                  { name: `Education`, sub: [] },
                  { name: `Religion`, sub: [] },
                  { name: `Arts`, sub: ['Books'] },
                ],
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
        ],
      },
    },

    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography.js`,
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/transcripts`,
        name: 'markdown-pages',
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/`,
      },
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_TRACKING_ID,
        anonymize: true,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-json`,
    `gatsby-plugin-netlify`,
  ],
};
