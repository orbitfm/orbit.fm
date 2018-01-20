import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

const Image = styled.img`
  max-width: 40px;
  margin-right: 20px;
  border-radius: 8px;
`;

const Subscribe = ({ links }) => {
  if (!links) {
    return null;
  }
  const simpleLinks = links.map(l => ({
    id: l.id,
    imageUrl: `http:${l.linkType.image.file.url}`,
    link: l.linkType.link[0].url,
  }));
  return (
    <div>
      <h2>Subscribe</h2>
      <div>
        {simpleLinks.map(l => (
          <a href={l.link} key={l.id} target="_blank" rel="noopener">
            <Image src={l.imageUrl} />
          </a>
        ))}
      </div>
    </div>
  );
};

Subscribe.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      linkType: PropTypes.shape({
        image: PropTypes.shape({
          file: PropTypes.shape({ url: PropTypes.string }),
        }),
        link: PropTypes.arrayOf(PropTypes.shape({ url: PropTypes.string })),
      }),
    })
  ).isRequired,
};

export default Subscribe;
