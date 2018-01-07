module.exports = {
  siteMetadata: {
    title: `Gatsby Default Starter`,
  },
  plugins: [
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
        spaceId: `2n9ydd4p827x`,
        accessToken: `c94edf490af3816ff3e99ff8feba33d32f28de78350a4380bfc8b28032380b50`,
      },
    },
  ],
};
