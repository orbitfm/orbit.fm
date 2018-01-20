import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import styled from 'react-emotion';
import humanizeList from 'humanize-list';
import {DateTime} from 'luxon';
import * as COLORS from '../constants/colors';

const Container = styled.article`
  border-bottom: 1px solid ${COLORS.DIVIDER};
  margin-bottom: 40px;
  display: flex;
`;

const Image = styled.div`
  width: 20vw;
  max-width: 150px;
  margin-right: 20px;
`;

const EpisodeTitle = styled.h1`
  font-size: 1.3em;
`;

const PodcastTitle = styled(Link)`
  font-size: 0.8em;
  color: rgba(255, 255, 255, 0.6);
`;

const EpisodeDate = styled.span`
  font-size: 0.8em;
  color: rgba(255, 255, 255, 0.6);
  :after {
    display: inline;
    content: '▪';
    margin: 0 5px;
  }
`;

const Details = styled.div`
  flex: 1;
`;

const EpisodeListing = ({
  episode,
  shortDescription,
  publicationDate,
  name,
  path,
  imageUrl,
  podcastHosts,
  podcastName,
  podcastPath,
}) => (
  <Container>
    <Image>
      <Link to={path}>
        <img src={imageUrl} alt={podcastName} />
      </Link>
    </Image>
    <Details>
      <EpisodeDate>{DateTime.fromISO(publicationDate).toLocaleString()}</EpisodeDate>
      <PodcastTitle to={podcastPath}>{podcastName}</PodcastTitle>
      <EpisodeTitle>
        <Link to={path}>{name}</Link>
      </EpisodeTitle>
      <p>Hosts: {humanizeList(podcastHosts, {oxfordComma: true})}</p>
      <p>{shortDescription}</p>
    </Details>
  </Container>
);

EpisodeListing.propTypes = {
  shortDescription: PropTypes.string.isRequired,
  publicationDate: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  podcastHosts: PropTypes.arrayOf(PropTypes.string).isRequired,
  podcastName: PropTypes.string.isRequired,
  podcastPath: PropTypes.string.isRequired,
};

export default EpisodeListing;
