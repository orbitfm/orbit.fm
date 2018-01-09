/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */
const path = require(`path`);
const urlify = a => a.replace(/\s/g, '').toLowerCase();

exports.onCreateNode = ({ node, getNode, boundActionCreators }) => {
  const { createNodeField } = boundActionCreators;
  if (node.internal.type === `ContentfulPodcast`) {
    createNodeField({
      node,
      name: `slug`,
      value: urlify(node.name),
    });
  }
  if (node.internal.type === `ContentfulEpisode`) {
    createNodeField({
      node,
      name: `path`,
      value: `${urlify(getNode(node.podcast___NODE).name)}/${node.episodeNumber}`,
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
            slug: node.fields.slug,
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
