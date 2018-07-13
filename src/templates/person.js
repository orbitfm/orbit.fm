import React from "react";
import Link from "gatsby-link";
import styled from "react-emotion";
import Page from "../components/Page";

const CircleImage = styled.img`
  border-radius: 50%;
  margin-right: 20px;
`;

const PodcastImage = styled.img`
  height: 64px;
  width: auto;
  margin: 0 20px 20px 0;
`;

const PersonDetails = styled.div`
  display: flex;
`;

const Description = styled.div`
  flex: 1;
`;

const PodcastContainer = styled.div`
  display: flex;
`;

const PodcastDetails = styled.div`
  flex: 1;
`;

const PodcastTitle = styled.header`
  font-size: 1.1em;
`;

const EpisodeCount = styled.span`
  font-size: 0.7em;
  color: rgba(255, 255, 255, 0.6);
  text-transform: uppercase;
  letter-spacing: 1px;
  padding-left: 8px;
`;

const Podcast = ({podcast}) => (
    <PodcastContainer>
      <Link to={podcast.fields.slug}>
        <PodcastImage
          src={podcast.image.file.url}
          alt={`${podcast.name} logo`}
        />
      </Link>
      <PodcastDetails>
        <PodcastTitle>
          <Link to={podcast.fields.slug}>
            {podcast.name}
          </Link>
          <EpisodeCount>{podcast.episode.length} Episodes</EpisodeCount></PodcastTitle>
        <p>{podcast.description.description}</p>
      </PodcastDetails>
    </PodcastContainer>

)

const PodcastsHeader = styled.header`
  font-size: 1.5em;
  padding-bottom: 16px;
`;

const Podcasts = ({podcasts}) => {
  return (
    <section>
      <PodcastsHeader>Podcasts</PodcastsHeader>
      {podcasts.map(podcast => (<Podcast podcast={podcast} />))}
    </section>
  );
};

export default ({ data }) => {
  const person = data.contentfulPerson;
  return (
    <Page title={person.name} headTitle={person.name}>
      <PersonDetails>
        {person.image && (
          <CircleImage src={person.image.file.url} width="100px" height="100px" />
        )}
        <Description
          dangerouslySetInnerHTML={{
            __html: person.fields.descriptionFormatted
          }}
        />
      </PersonDetails>
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
              src={link.linkType.image.file.url}
              width="20px"
              height="20px"
            />
          </a>
        ))}
        {person.podcast ? <Podcasts podcasts={person.podcast} /> : null}
    </Page>
  );
};

export const query = graphql`
  query PersonQuery($id: String!) {
    contentfulPerson(id: {eq: $id}) {
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
    }
  }
`;
