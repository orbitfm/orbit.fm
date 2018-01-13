import React from 'react';
import styled from 'react-emotion';
import humanizeList from 'humanize-list';

const Image = styled.div`
  margin-top: -150px;
`;

const LatestEpisode = ({ episode }) => (
  <div>
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
  </div>
);

export default LatestEpisode;
