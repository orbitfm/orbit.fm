import React from 'react';
import PropTypes from 'prop-types';
import styled from 'react-emotion';
import InfoBar from './InfoBar';
import LatestEpisode from './LatestEpisode';
import SidePanel from './SidePanel';

const Container = styled.div`
  display: grid;
  grid-template-columns: minmax(300px, 400px) 1fr;
  margin: 0 auto;
  max-width: 1200px;
  padding-top: 0;
  min-height: 100%;
`;

const MainArea = styled.div`
  padding: 20px;
`;

const PageWithSidebar = ({
  children,
  primaryColor,
  title,
  description,
  episode,
}) => (
  <div>
    <InfoBar title={title} tagline={description} color={primaryColor} />
    <Container>
      <SidePanel>
        {episode && (
          <LatestEpisode
            imageUrl={
              episode.podcast.image && `http:${episode.podcast.image.file.url}`
            }
            name={episode.name}
            shortDescription={episode.shortDescription}
            podcastName={episode.podcast.name}
            podcastHosts={episode.podcast.hosts.map(h => h.name)}
          />
        )}
      </SidePanel>
      <MainArea>{children}</MainArea>
    </Container>
  </div>
);

PageWithSidebar.propTypes = {
  children: PropTypes.node.isRequired,
  primaryColor: PropTypes.string,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  episode: PropTypes.shape({
    imageUrl: PropTypes.string,
    name: PropTypes.string.isRequired,
    shortDescription: PropTypes.string.isRequired,
    podcast: PropTypes.shape({
      name: PropTypes.string.isRequired,
      hosts: PropTypes.arrayOf(
        PropTypes.shape({ name: PropTypes.string.isRequired })
      ).isRequired,
    }).isRequired,
  }).isRequired,
};

export default PageWithSidebar;
