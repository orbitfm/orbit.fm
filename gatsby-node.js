/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require(`path`);
const Remarkable = require('remarkable');
const markdown = new Remarkable();
const slug = require(`slug`);
const urlify = a => a.replace(/\s/g, '').toLowerCase();

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
  const { createNodeField } = boundActionCreators;

  const types = {
    PODCAST: `ContentfulPodcast`,
    EPISODE: `ContentfulEpisode`,
    PERSON: `ContentfulPerson`,
    EPISODE__SHOW_NOTES: 'contentfulEpisodeShowNotesTextNode',
  };

  if (node.internal.type === types.PODCAST) {
    createNodeField({
      node,
      name: `slug`,
      value: urlify(node.name),
    });
  }
  if (node.internal.type === types.EPISODE) {
    createNodeField({
      node,
      name: `path`,
      value: `${urlify(getNode(node.podcast___NODE).name)}/${
        node.episodeNumber
      }`,
    });

    const showNotes = getNode(node.showNotes___NODE);
    createNodeField({
      node,
      name: 'showNotesFormatted',
      value: markdown.render(showNotes.internal.content),
    });
  }

  if (node.internal.type === types.PERSON) {
    createNodeField({
      node,
      name: `slug`,
      value: slug(node.name, { lower: true }),
    });
  }
};

exports.createPages = ({ graphql, boundActionCreators }) => {
  const { createPage } = boundActionCreators;
  return new Promise((resolve, reject) => {
    graphql(`
      {
        allContentfulPodcast {
          edges {
            node {
              id
              fields {
                slug
              }
            }
          }
        }
        allContentfulEpisode {
          edges {
            node {
              id
              fields {
                path
              }
            }
          }
        }
      }
    `).then(result => {
      result.data.allContentfulPodcast.edges.forEach(({ node }) => {
        createPage({
          path: node.fields.slug,
          component: path.resolve(`./src/templates/podcast.js`),
          context: {
            // Data passed to context is available in page queries as GraphQL variables.
            id: node.id,
          },
        });
      });
      result.data.allContentfulEpisode.edges.forEach(({ node }) => {
        createPage({
          path: node.fields.path,
          component: path.resolve(`./src/templates/episode.js`),
          context: {
            // Data passed to context is available in page queries as GraphQL variables.
            id: node.id,
          },
        });
      });
      resolve();
    });
  });
};
