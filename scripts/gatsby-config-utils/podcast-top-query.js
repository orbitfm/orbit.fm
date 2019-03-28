const podcastTopQuery = `
  {
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
  }`;

module.exports = podcastTopQuery;
