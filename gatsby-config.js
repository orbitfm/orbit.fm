require("dotenv").config();
const { DateTime } = require("luxon");
var humanizeList = require("humanize-list");

const serialize = ({ podcast, siteMetadata }) =>
  podcast.episode
    ? podcast.episode
        .sort((a, b) => {
          if (a.publicationDate > b.publicationDate) {
            return -1;
          }
          if (b.publicationDate > a.publicationDate) {
            return 1;
          }
          return 0;
        })
        .map(episode => ({
          title: `${episode.podcast.name} ${episode.name}`,
          description:
            episode.shortDescription || `Episode ${episode.episodeNumber}`,
          url: `${siteMetadata.siteUrl}/${episode.fields.path}`,
          guid: episode.id,
          author: episode.hosts.map(h => h.name, {
            oxfordComma: true
          }),
          enclosure: {
            url: `https://www.podtrac.com/pts/redirect.mp3/${episode.audioUrl}`,
            length: episode.audioLength,
            type: "audio/mp3"
          },
          custom_elements: [
            {
              pubDate: DateTime.fromISO(episode.publicationDate).toHTTP()
            },
            {
              "itunes:author": humanizeList(
                episode.hosts.map(h => h.name, { oxfordComma: true })
              )
            },
            {
              "itunes:subtitle": episode.shortDescription
            },
            {
              "itunes:summary": episode.shortDescription
            },
            {
              "content:encoded": `<p>${episode.shortDescription}</p>${
                episode.fields ? episode.fields.showNotesFormatted : ``
              }`
            },
            { "itunes:explicit": "clean" },
            {
              "itunes:image": {
                _attr: {
                  href: episode.image
                    ? `https:${episode.image.file.url}`
                    : episode.podcast.image
                      ? `https:${episode.podcast.image.file.url}`
                      : ``
                }
              }
            },
            { "itunes:duration": episode.duration }
          ]
        }))
    : [];

module.exports = {
  siteMetadata: {
    title: `Orbit FM`,
    description: `Orbit FM is a place with podcasts.`,
    coverArt: ``,
    siteUrl: `https://www.orbit.fm`,
    owner: `Orbit FM`,
    ownerEmail: `hello@orbit.fm`,
    categories: ["Technology", "Education"]
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
              coverArt
              siteUrl
              owner
              ownerEmail
              categories
            }
          }
          allContentfulPodcast(filter: { active: { eq: true } }) {
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
        }
      `,
        setup: (
          { query: { site: { siteMetadata }, allContentfulPodcast } },
          i
        ) => {
          // If allContentfulPodcast.edges[i] then this is a normal feed
          // Else it's the master feed
          const podcast = allContentfulPodcast.edges[i]
            ? allContentfulPodcast.edges[i].node
            : {
                name: `${siteMetadata.title} master feed`,
                fields: {
                  slug: "master"
                },
                description: { description: siteMetadata.description },
                image: { file: { url: siteMetadata.coverArt } }
              };
          return {
            title: podcast.name,
            description: podcast.description.description,
            feed_url: `${siteMetadata.siteUrl}/${podcast.fields.slug}/feed.rss`,
            site_url:
              podcast.fields.slug === `master`
                ? siteMetadata.siteUrl
                : `${siteMetadata.siteUrl}/${podcast.fields.slug}`,
            image_url: podcast.image ? `https:${podcast.image.file.url}` : ``,
            managingEditor: `${siteMetadata.ownerEmail} (${
              siteMetadata.owner
            })`,
            webMaster: `${siteMetadata.ownerEmail} (${siteMetadata.owner})`,
            copyright: `${new Date().getFullYear()} ${siteMetadata.owner}`,
            language: "en",
            categories: siteMetadata.categories,
            pubDate: DateTime.fromISO(new Date()).toHTTP(),
            ttl: "60",
            custom_namespaces: {
              itunes: "http://www.itunes.com/dtds/podcast-1.0.dtd"
            },
            custom_elements: [
              { "itunes:subtitle": siteMetadata.description },
              { "itunes:author": siteMetadata.owner },
              { "itunes:explicit": "clean" },
              {
                "itunes:summary": siteMetadata.description
              },
              {
                "itunes:owner": [
                  { "itunes:name": siteMetadata.owner },
                  { "itunes:email": siteMetadata.ownerEmail }
                ]
              },
              {
                "itunes:image": {
                  _attr: {
                    href: podcast.image ? `https:${podcast.image.file.url}` : ``
                  }
                }
              },
              ...siteMetadata.categories.map(c => ({
                "itunes:category": {
                  _attr: {
                    text: c
                  }
                }
              }))
            ]
          };
        },
        feeds: ({
          query: { site: { siteMetadata }, allContentfulPodcast }
        }) => [
          ...allContentfulPodcast.edges.map(({ node }, i) => ({
            serialize: ({ query: { site, allContentfulPodcast } }) =>
              serialize({
                podcast: allContentfulPodcast.edges[i].node,
                siteMetadata
              }),
            output: `${node.fields.slug}/feed.rss`
          })),
          {
            serialize: ({
              query: { site: { siteMetadata }, allContentfulPodcast }
            }) =>
              serialize({
                podcast: {
                  episode: allContentfulPodcast.edges.reduce(
                    (a, { node }) => [...a, ...(node.episode || [])],
                    []
                  )
                },
                siteMetadata
              }),
            output: `master.rss`
          }
        ]
      }
    },

    `gatsby-plugin-react-helmet`,
    `gatsby-plugin-emotion`,
    {
      resolve: `gatsby-plugin-typography`,
      options: {
        pathToConfigModule: `src/utils/typography.js`
      }
    },
    {
      resolve: `gatsby-source-contentful`,
      options: {
        spaceId: process.env.CONTENTFUL_SPACE_ID,
        accessToken: process.env.CONTENTFUL_ACCESS_TOKEN
      }
    },
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: process.env.GOOGLE_ANALYTICS_TRACKING_ID,
        anonymize: true
      }
    }
  ]
};
