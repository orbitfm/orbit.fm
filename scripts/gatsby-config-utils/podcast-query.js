const podcastQuery = `
  {
    site {
      siteMetadata {
        title
        description
        coverArt
        siteUrl
        owner
        ownerEmail
        categories {
          name
        }
      }
    }
  }`;

module.exports = podcastQuery;
