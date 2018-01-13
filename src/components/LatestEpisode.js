import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import humanizeList from 'humanize-list';

const Image = styled.div`
  margin-top: -150px;
`;

const LatestEpisode = ({
  imageUrl,
  name,
  shortDescription,
  podcastName,
  podcastHosts,
}) => (
  <div>
    {imageUrl && (
      <Image>
        <img src={imageUrl} />
      </Image>
    )}
    <p>Latest Episode</p>
    <p>{podcastName}</p>
    <p>{name}</p>
    <p>Hosted by {humanizeList(podcastHosts, { oxfordComma: true })}</p>
    <p>{shortDescription}</p>
  </div>
);

LatestEpisode.propTypes = {
  imageUrl: PropTypes.string,
  name: PropTypes.string.isRequired,
  shortDescription: PropTypes.string.isRequired,
  podcastName: PropTypes.string.isRequired,
  podcastHosts: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default LatestEpisode;
