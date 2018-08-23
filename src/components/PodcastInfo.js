import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import Img from 'gatsby-image';
import styled from 'react-emotion';

const Host = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

const HostImage = styled.span`
  display: inline-block;
  width: 75px;
  margin-right: 20px;
`;

const Image = styled.div`
  margin-top: -150px;
  margin-bottom: 20px;
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
        <Img fluid={fluidImage} alt={podcastName} />
      </Image>
    )}
    <p>{podcastDescription}</p>
    <h3>Hosts</h3>
    {podcastHosts.map(h => (
      <Link to={`people/${h.fields.slug}`} key={h.id}>
        <Host>
          <HostImage>
            <Img fluid={h.image.fluid} />
          </HostImage>
          <p>{h.name}</p>
        </Host>
      </Link>
    ))}
  </div>
);

PodcastInfo.propTypes = {
  imageUrl: PropTypes.string,
  podcastDescription: PropTypes.string.isRequired,
  podcastName: PropTypes.string.isRequired,
  podcastHosts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      image: PropTypes.object.isRequired,
      fields: PropTypes.shape({
        slug: PropTypes.string.isRequired,
      }),
    })
  ).isRequired,
  podcastPath: PropTypes.string.isRequired,
};

export default PodcastInfo;
