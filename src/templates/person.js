import React from 'react';
import styled from 'react-emotion';
import Page from '../components/Page';
import PodcastListing from '../components/PodcastListing';
import EpisodeListingShort from '../components/EpisodeListingShort';

const CircleImage = styled.img`
  border-radius: 50%;
  margin-right: 20px;
`;

const Container = styled.div`
  display: flex;
`;

const Description = styled.div`
  flex: 0;
`;

const PersonDetails = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`;

const Links = styled.div`
  display: flex;

  a {
    margin-right: 12px;
  }
`;

export default ({ data }) => {
  const person = data.contentfulPerson;
  return (
    <Page title={person.name} headTitle={person.name}>
      <Container>
        {person.image && (
          <CircleImage
            src={person.image.file.url}
            alt={person.name}
            width="100px"
            height="100px"
          />
        )}
        <PersonDetails>
          <Description
            dangerouslySetInnerHTML={{
              __html: person.fields.descriptionFormatted,
            }}
          />
          <Links>
            {person.links &&
              person.links.map(link => (
                <a
                  href={link.url}
                  target="
      _blank"
                  rel="noopener"
                  key={link.id}
                >
                  <img
                    title={link.linkType.name}
                    alt={link.linkType.name}
                    src={link.linkType.image.file.url}
                    width="20px"
                    height="20px"
                  />
                </a>
              ))}
          </Links>
        </PersonDetails>
      </Container>
      {person.podcast && <PodcastListing podcasts={person.podcast} />}
      {person.episode && <EpisodeListingShort episodes={person.episode} />}
    </Page>
  );
};

export const query = graphql`
  query PersonQuery($id: String!) {
    contentfulPerson(id: { eq: $id }) {
      name
      image {
        file {
          url
          fileName
          contentType
        }
      }
      fields {
        descriptionFormatted
      }
      links {
        id
        url
        linkType {
          name
          image {
            file {
              url
              fileName
              contentType
            }
          }
        }
      }
      podcast {
        id
        name
        description {
          description
        }
        image {
          file {
            url
          }
        }
        fields {
          slug
        }
        episode {
          id
        }
      }
      episode {
        id
        name
        publicationDate
        fields {
          path
        }
        podcast {
          name
          image {
            file {
              url
            }
          }
        }
      }
    }
  }
`;
