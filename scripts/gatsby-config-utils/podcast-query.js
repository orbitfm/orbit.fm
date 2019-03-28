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
        categories
      }
    }
  }`;

module.exports = podcastQuery;
