import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import Img from 'gatsby-image';

const Container = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const Image = styled.span`
  > div {
    margin-right: 20px;
    margin-bottom: 20px;
  }
  img {
    max-width: 40px;
    border-radius: 8px;
  }
`;

const Subscribe = ({links}) => {
  if (!links) {
    return null;
  }
  console.log(links);
  const simpleLinks = links.map(l => ({
    id: l.id,
    resolutions: l.linkType.image.resolutions,
    link: l.url,
  }));
  return (
    <div>
      <h2>Subscribe</h2>
      <Container>
        {simpleLinks.map(l => (
          <a href={l.link} key={l.id} target="_blank" rel="noopener">
            <Image>
              <Img resolutions={l.resolutions} />
            </Image>
          </a>
        ))}
      </Container>
    </div>
  );
};

Subscribe.propTypes = {
  links: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string,
      linkType: PropTypes.shape({
        image: PropTypes.shape({
          file: PropTypes.shape({url: PropTypes.string}),
        }),
        link: PropTypes.arrayOf(PropTypes.shape({url: PropTypes.string})),
      }),
    })
  ).isRequired,
};

export default Subscribe;
