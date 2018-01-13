import React from 'react';
import Link from 'gatsby-link';
import styled from 'react-emotion';
import humanizeList from 'humanize-list';
import * as COLORS from '../constants/colors';

const Container = styled.div`
  border-bottom: 1px solid ${COLORS.DIVIDER};
  margin-bottom: 40px;
`;

const Image = styled.div`
  width: 100%;
  max-width: 150px;
  margin-right: 20px;
`;

const Top = styled.div`
  display: flex;
`;

const EpisodeListing = ({ episode }) => (
  <Container>
    <Top>
      <Image>
        {episode.podcast.image && (
          <img src={`http:${episode.podcast.image.file.url}`} />
        )}
      </Image>
      <div>
        <p>
          <Link to={episode.podcast.fields.slug}>{episode.podcast.name}</Link>
        </p>
        <p>
          <Link to={episode.fields.path}>{episode.name}</Link>
        </p>
        <p>{episode.publicationDate}</p>
        <p>
          Hosted by{' '}
          {humanizeList(
            episode.podcast.hosts.map(h => h.name, { oxfordComma: true })
          )}
        </p>
      </div>
    </Top>
    <p>{episode.shortDescription}</p>
  </Container>
);

export default EpisodeListing;
