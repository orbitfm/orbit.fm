import React from 'react';
import Link from 'gatsby-link';
import styled from 'react-emotion';
import PageWithSidebar from '../components/PageWithSidebar';
import LatestEpisode from '../components/LatestEpisode';
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
  const episode = episodes[0];
  return (
    <PageWithSidebar
      title={podcast.name}
      headTitle={podcast.name}
      description={podcast.description.description}
      color={podcast.primaryColor}
      sidePanelChildren={
        episode && (
          <LatestEpisode
            imageUrl={
              episode.podcast.image && `https:${episode.podcast.image.file.url}`
            }
            name={episode.name}
            path={episode.fields.path}
            shortDescription={episode.shortDescription}
            podcastName={episode.podcast.name}
            podcastHosts={episode.podcast.hosts.map(h => h.name)}
            podcastPath={episode.podcast.fields.slug}
          />
        )
      }
    >
      <Subscribe links={podcast.subscriptionLinks} />
      <h2>Latest Episodes</h2>
      {episodes
        ? episodes.map(e => (
            <EpisodeListing
              shortDescription={e.shortDescription || ''}
              publicationDate={e.publicationDate}
              name={e.name}
              path={e.fields.path}
              imageUrl={e.podcast.image && `https:${e.podcast.image.file.url}`}
              podcastHosts={e.podcast.hosts.map(h => h.name)}
              podcastName={e.podcast.name}
              podcastPath={e.podcast.fields.slug}
              key={e.id}
            />
          ))
        : null}
    </PageWithSidebar>
  );
};

export const query = graphql`
  query PodcastQuery($id: String!) {
    contentfulPodcast(id: { eq: $id }) {
      name
      description {
        description
      }
      subscriptionLinks {
        id
        url
        linkType {
          image {
            file {
              url
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
      }
      image {
        id
        file {
          url
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
          image {
            file {
              url
            }
          }
          hosts {
            name
          }
          fields {
            slug
          }
        }
      }
    }
  }
`;
