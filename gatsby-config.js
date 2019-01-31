require('dotenv').config();
const generatePodcastFeedConfig = require('./scripts/gatsby-config-utils/generate-podcast-feed-config');
const serializePodcastFeed = require('./scripts/gatsby-config-utils/serialize-podcast-feed');
const setupPodcastFeed = require('./scripts/gatsby-config-utils/setup-podcast-feed');

module.exports = {
  siteMetadata: {
    title: `Orbit FM`,
    description: `Orbit FM is a place with podcasts.`,
    coverArt: ``,
    siteUrl: `https://www.orbit.fm`,
    owner: `Orbit FM`,
    ownerEmail: `hello@orbit.fm`,
    categories: ['Technology', 'Education'],
  },
  plugins: [
    {
      resolve: `gatsby-plugin-feed`,
      options: {
        query: `
        {
          site {
            siteMetadata {
              title
              description
              coverArt
              siteUrl
              owner
              ownerEmail
              categories
            }
          }
          allContentfulPodcast(filter: { active: { eq: true } } sort: { fields: name }) {
            edges {
              node {
                id
                name
                description {
                  description
                }
                image {
                  file {
                    url
                  }
                }
                fields {
                  slug
                }
                episode {
                  id
                  episodeNumber
                  audioUrl
                  name
                  shortDescription
                  publicationDate
                  audioLength
                  duration
                  hosts {
                    name
                  }
                  fields {
                    showNotesFormatted
                    path
                  }
                  podcast {
                    name
                    image {
                      file {
                        url
                      }
                    }
                    fields {
                      slug
                    }
                  }
                }
              }
            }
          }
        }`,
        feeds: [
          generatePodcastFeedConfig({ index: 0, name: 'bookbytes' }),
          generatePodcastFeedConfig({ index: 1, name: 'talkingdudes' }),
          generatePodcastFeedConfig({ index: 2, name: 'weboftomorrow' }),
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
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `data`,
        path: `${__dirname}/src/`,
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    `gatsby-transformer-json`,
    `gatsby-plugin-netlify`,
  ],
};
