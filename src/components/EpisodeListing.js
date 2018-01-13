import React from 'react';
import PropTypes from 'prop-types';
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
    <Top>
      <Image>{imageUrl && <img src={imageUrl} />}</Image>
      <div>
        <p>
          <Link to={podcastPath}>{podcastName}</Link>
        </p>
        <p>
          <Link to={path}>{name}</Link>
        </p>
        <p>{publicationDate}</p>
        <p>Hosted by {humanizeList(podcastHosts, { oxfordComma: true })}</p>
      </div>
    </Top>
    <p>{shortDescription}</p>
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
