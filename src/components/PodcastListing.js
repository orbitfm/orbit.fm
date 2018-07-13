import React from 'react';
import Link from 'gatsby-link';
import styled from 'react-emotion';

const PodcastContainer = styled.div`
  display: flex;
`;

const Header = styled.header`
  font-size: 1.5em;
  padding-bottom: 16px;
`;

const PodcastImage = styled.img`
  height: 64px;
  width: auto;
  margin: 0 20px 20px 0;
`;

const PodcastDetails = styled.div`
  flex: 1;
`;

const PodcastTitle = styled.header`
  font-size: 1.1em;
`;

const EpisodeCount = styled.span`
  font-size: 0.7em;
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
  letter-spacing: 1px;
  padding-left: 8px;
`;

const Podcast = ({ podcast }) => (
  <PodcastContainer>
    <Link to={podcast.fields.slug}>
      <PodcastImage src={podcast.image.file.url} alt={`${podcast.name} logo`} />
    </Link>
    <PodcastDetails>
      <PodcastTitle>
        <Link to={podcast.fields.slug}>{podcast.name}</Link>
        <EpisodeCount>{podcast.episode.length} Episodes</EpisodeCount>
      </PodcastTitle>
      <p>{podcast.description.description}</p>
    </PodcastDetails>
  </PodcastContainer>
);

const PodcastListing = ({ podcasts }) => {
  return (
    <section>
      <Header>Podcasts</Header>
      {podcasts.map(podcast => <Podcast key={podcast.id} podcast={podcast} />)}
    </section>
  );
};

export default PodcastListing;
