import React from 'react';
import PropTypes from 'prop-types';
import Link from 'gatsby-link';
import Img from 'gatsby-image';
import styled from 'react-emotion';
import humanizeList from 'humanize-list';

const Image = styled.div`
  max-width: 100%;
  margin: -150px 0 1.45rem;
  @media (max-width: 700px) {
    margin-top: 0;
  }
`;

const LatestEpisode = ({
  imageSizes,
  name,
  path,
  shortDescription,
  podcastName,
  podcastHosts,
  podcastPath,
}) => (
  <div>
    {imageSizes && (
      <Image>
        <Img sizes={imageSizes} />
      </Image>
    )}
    <h2>Latest Episode</h2>
    <p>
      <Link to={podcastPath}>{podcastName}</Link>
    </p>
    <p>
      <Link to={path}>{name}</Link>
    </p>
    <p>Hosted by {humanizeList(podcastHosts, {oxfordComma: true})}</p>
    <p>{shortDescription}</p>
  </div>
);

LatestEpisode.propTypes = {
  imageUrl: PropTypes.string,
  name: PropTypes.string.isRequired,
  path: PropTypes.string.isRequired,
  shortDescription: PropTypes.string.isRequired,
  podcastName: PropTypes.string.isRequired,
  podcastHosts: PropTypes.arrayOf(PropTypes.string).isRequired,
  podcastPath: PropTypes.string.isRequired,
};

export default LatestEpisode;
