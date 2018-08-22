import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'react-emotion';
import humanizeList from 'humanize-list';

const Image = styled.div`
  margin-top: -150px;
  @media (max-width: 700px) {
    margin-top: 0;
  }
`;

const PodcastInfo = ({
  fluidImage,
  podcastDescription,
  podcastName,
  podcastHosts,
  podcastPath,
}) => (
  <div>
    {fluidImage && (
      <Image>
        <Img fluid={fluidImage} />
      </Image>
    )}
    <p>
      <Link to={podcastPath}>{podcastName}</Link>
    </p>
    <p>Hosted by {humanizeList(podcastHosts, { oxfordComma: true })}</p>
    <p>{podcastDescription}</p>
  </div>
);

PodcastInfo.propTypes = {
  imageUrl: PropTypes.string,
  podcastDescription: PropTypes.string.isRequired,
  podcastName: PropTypes.string.isRequired,
  podcastHosts: PropTypes.arrayOf(PropTypes.string).isRequired,
  podcastPath: PropTypes.string.isRequired,
};

export default PodcastInfo;
