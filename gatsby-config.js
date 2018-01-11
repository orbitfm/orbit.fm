require('dotenv').config();
const { DateTime } = require('luxon');
var humanizeList = require('humanize-list');

const serialize = podcast =>
  podcast.episode
    ? podcast.episode.map(episode => ({
        title: episode.name,
        description:
          episode.shortDescription || `Episode ${episode.episodeNumber}`,
        url: episode.audioUrl,
        guid: episode.id,
        author: episode.hosts.map(h => h.name, {
          oxfordComma: true,
        }),
        enclosure: {
          url: episode.audioUrl,
          length: episode.audioLength,
          type: 'audio/mp3',
        },
        custom_elements: [
          {
            pubDate: DateTime.fromISO(episode.publicationDate).toHTTP(),
          },
          {
            'itunes:author': humanizeList(
              episode.hosts.map(h => h.name, { oxfordComma: true })
            ),
          },
          {
            'itunes:subtitle': episode.shortDescription,
          },
          {
            'itunes:summary': episode.shortDescription,
          },
          {
            'content:encoded': `<p>${episode.shortDescription}</p>${
              episode.fields ? episode.fields.showNotesFormatted : ``
            }`,
          },
          { 'itunes:explicit': 'clean' },
          {
            'itunes:image': {
              _attr: {
                href: episode.image
                  ? episode.image.file.url
                  : podcast.image ? podcast.image.file.url : ``,
              },
            },
          },
          { 'itunes:duration': episode.duration },
        ],
      }))
    : [];

module.exports = {
  siteMetadata: {
    title: `Orbit FM`,
    description: `Orbit FM is a place with podcasts.`,
    siteUrl: `http://www.orbit.fm`,
    owner: `Orbit FM`,
    ownerEmail: `hello@orbit.fm`,
    categories: ['Technology', 'Education'],
  },
  plugins: [
    {
      resolve: `gatsby-plugin-podcast-feed`,
      options: {
        query: `
        {
          site {
            siteMetadata {
              title
              description
              siteUrl
              owner
              ownerEmail
              categories
            }
          }
          allContentfulPodcast {
            edges {
              node {
                id
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
                  }
                }
              }
            }
          }
        }
      `,
        setup: ({
          query: { site: { siteMetadata }, allContentfulPodcast },
        }) => {
          const podcast = allContentfulPodcast.edges[0].node;
          return {
            title: siteMetadata.title,
            description: siteMetadata.description,
            feed_url: `${siteMetadata.siteUrl}/${podcast.fields.slug}/feed.rss`,
            site_url: siteMetadata.siteUrl,
            image_url: podcast.image ? podcast.image.file.url : ``,
            managingEditor: `${siteMetadata.ownerEmail} (${
              siteMetadata.owner
            })`,
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
                    href: podcast.image ? podcast.image.file.url : ``,
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
          };
        },
        feeds: ({
          query: { site: { siteMetadata }, allContentfulPodcast },
        }) => [
          ...allContentfulPodcast.edges.map(({ node }, i) => ({
            serialize: ({ query: { site, allContentfulPodcast } }) =>
              serialize(allContentfulPodcast.edges[i].node),
            output: `${node.fields.slug}/feed.rss`,
          })),
          {
            serialize: ({ query: { site, allContentfulPodcast } }) =>
              serialize({
                image: {
                  file: {
                    url: 'testImage',
                  },
                },
                fields: {
                  slug: 'master',
                },
                episode: allContentfulPodcast.edges.reduce(
                  (a, { node }) => [...a, ...(node.episode || [])],
                  []
                ),
              }),
            output: `master.rss`,
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
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN,
      },
    },
  ],
};
