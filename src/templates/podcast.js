import React from 'react';
import { graphql } from 'gatsby';

import Layout from '../components/Layout';
import PageWithSidebar from '../components/PageWithSidebar';
import PodcastInfo from '../components/PodcastInfo';
import Subscribe from '../components/Subscribe';
import EpisodeListing from '../components/EpisodeListing';

export default ({ data }) => {
  const podcast = data.contentfulPodcast;

  const episodes = podcast.episode
    ? podcast.episode.sort((a, b) => {
        if (a.publicationDate > b.publicationDate) {
          return -1;
        }
        if (b.publicationDate > a.publicationDate) {
          return 1;
        }
        return 0;
      })
    : [];

  return (
    <Layout description={podcast.shortDescription}>
      <PageWithSidebar
        title={podcast.name}
        headTitle={podcast.name}
        description={podcast.shortDescription}
        color={podcast.primaryColor}
        sidePanelChildren={
          <PodcastInfo
            fluidImage={podcast.image.fluid}
            podcastDescription={podcast.description.description}
            podcastName={podcast.name}
            podcastHosts={podcast.hosts}
            podcastPath={podcast.fields.slug}
          />
        }
      >
        <Subscribe links={podcast.subscriptionLinks} />
        <h2>Latest Episodes</h2>
        {episodes
          ? episodes.map(e => (
              <EpisodeListing
                key={e.id}
                shortDescription={e.shortDescription}
                publicationDate={e.publicationDate}
                name={e.name}
                path={e.fields.path}
                podcastHosts={e.podcast.hosts.map(h => h.name)}
                podcastName={e.podcast.name}
                podcastPath={e.podcast.fields.slug}
              />
            ))
          : null}
      </PageWithSidebar>
    </Layout>
  );
};

export const query = graphql`
  query PodcastQuery($id: String!) {
    contentfulPodcast(id: { eq: $id }) {
      name
      shortDescription
      description {
        description
      }
      image {
        fluid(maxWidth: 320) {
          ...GatsbyContentfulFluid
        }
      }
      fields {
        slug
      }
      subscriptionLinks {
        id
        url
        linkType {
          image {
            fixed(width: 40) {
              ...GatsbyContentfulFixed
            }
          }
        }
      }
      primaryColor
      hosts {
        id
        name
        fields {
          slug
        }
        image {
          fluid(maxWidth: 100) {
            ...GatsbyContentfulFluid
          }
        }
      }
      episode {
        id
        name
        shortDescription
        publicationDate
        fields {
          path
        }
        podcast {
          name
          description {
            description
          }
          hosts {
            name
            fields {
              slug
            }
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
