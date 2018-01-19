import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';

const Subscribe = ({ links }) => {
  console.log(links);
  if (!links) {
    return null;
  }
  const simpleLinks = links.map(l => ({
    imageUrl: `http:${l.linkType.image.file.url}`,
    link: l.linkType.link[0].url,
  }));
  console.log(simpleLinks);
  return (
    <div>
      <h2>Subscribe</h2>
      <div>
        {simpleLinks.map(l => (
          <a href={l.link}>
            <img src={l.imageUrl} />
          </a>
        ))}
      </div>
    </div>
  );
};

Subscribe.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
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
