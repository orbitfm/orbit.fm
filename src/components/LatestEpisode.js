import React from 'react';
import styled from 'react-emotion';
import humanizeList from 'humanize-list';

const Container = styled.div``;

const Image = styled.div`
  margin-top: -150px;
`;

const LatestEpisode = ({ episode }) => (
  <Container>
    <Image>
      <img src={`http:${episode.podcast.image.file.url}`} />
    </Image>
    <p>Latest Episode</p>
    <p>{episode.podcast.name}</p>
    <p>{episode.name}</p>
    <p>
      Hosted by{' '}
      {humanizeList(
        episode.podcast.hosts.map(h => h.name, { oxfordComma: true })
      )}
    </p>
    <p>{episode.shortDescription}</p>
  </Container>
);

export default LatestEpisode;
