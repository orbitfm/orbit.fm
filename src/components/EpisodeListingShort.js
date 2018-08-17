import React from 'react';
import { Link } from 'gatsby';
import styled from 'react-emotion';
import { DateTime } from 'luxon';

const Header = styled.header`
  font-size: 1.5em;
  padding-bottom: 16px;
`;

const EpisodeContainer = styled.ul`
  margin-left: 0;
`;

const EpisodeItem = styled.li`
  display: flex;
  align-items: center;
  list-style: none;
`;

const Title = styled.span`
  margin-right: 20px;
`;

const EpisodeDate = styled.span`
  font-size: 0.7em;
`;

const EpisodePodcastImage = styled.img`
  height: 20px;
  width: auto;
  margin: 0 20px 0 0;
`;

const Episode = ({ episode }) => (
  <EpisodeContainer>
    <EpisodeItem>
      <Link to={episode.fields.path}>
        <EpisodePodcastImage
          src={episode.podcast.image.file.url}
          alt={`${episode.podcast.name} logo`}
        />
      </Link>
      <Link to={episode.fields.path}>
        <Title>
          {episode.podcast.name} {episode.name}
        </Title>
      </Link>
      <EpisodeDate>
        {DateTime.fromISO(episode.publicationDate).toLocaleString()}
      </EpisodeDate>
    </EpisodeItem>
  </EpisodeContainer>
);

const EpisodeListingShort = ({ episodes }) => {
  return (
    <section>
      <Header>Appearances</Header>
      {episodes
        .sort(
          (a, b) => new Date(b.publicationDate) - new Date(a.publicationDate)
        )
        .map(episode => (
          <Episode episode={episode} />
        ))}
    </section>
  );
};

export default EpisodeListingShort;
