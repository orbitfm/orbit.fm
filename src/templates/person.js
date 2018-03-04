import React from "react";
import Link from "gatsby-link";
import styled from "react-emotion";
import Page from "../components/Page";

const CircleImage = styled.img`
  float: left;
  border-radius: 50%;
  shape-outside: circle();
  margin-right: 20px;
`;

export default ({ data }) => {
  const person = data.contentfulPerson;
  return (
    <Page title={person.name}>
      {person.image && (
        <CircleImage src={person.image.file.url} width="100px" height="100px" />
      )}
      <div
        dangerouslySetInnerHTML={{
          __html: person.descriptionFormatted
        }}
      />
      {person.links &&
        person.links.map(link => (
          <a href={link.url} target="
      _blank" rel="noopener" key={link.id}>
            <img
              title={link.linkType.name}
              src={link.linkType.image.file.url}
              width="20px"
              height="20px"
            />
          </a>
        ))}
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
      descriptionFormatted
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
    }
  }
`;
