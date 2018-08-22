import React from 'react';
import styled from 'react-emotion';
import { graphql } from 'gatsby';

import Layout from '../../components/Layout';
import PageWithSidebar from '../../components/PageWithSidebar';

const TextArea = styled.textarea`
  width: 500px;
  height: 100px;

  margin: 10px 20px 20px 0;
  border: 0;
  padding: 10px;
  border-radius: 5px;
`;

const Input = styled.input`
  display: inline-block;

  margin: 10px 20px 20px 0;
  border: 0;
  padding: 10px;
  border-radius: 5px;
`;

const Label = styled.label`
  display: block;
  font-weight: 600;
`;

const Button = styled.button`
  display: block;
  margin: 10px 20px 20px 0;

  border: 0;
  padding: 10px 20px;
  border-radius: 5px;
  background-color: #2486a1;
  color: white;
  font-size: 24px;
  cursor: pointer;
  box-shadow: 0px 2px 5px 0px #232323;

  &:hover {
    background-color: #207890;
  }
  &:active {
    background-color: #2486a1;
  }
`;

const ContactPage = ({ data, location }) => {
  let show = null;
  /*let show;*/
  //let url;
  //try {
  //url = new URL(`http://www.fake.com${location.pathname}${location.search}`);
  //show = url && url.searchParams.get('show');
  /*}*/

  return (
    <Layout>
      <PageWithSidebar
        title="Contact"
        headTitle="Contact"
        description="We'd love to hear from you"
        color="#33444c"
        sidePanelChildren=""
      >
        <form
          name="contact"
          method="POST"
          action="/contact/thankyou"
          data-netlify="true"
        >
          <Label>Podcast:</Label>
          <select name="podcast">
            {data.allContentfulPodcast.edges.map(({ node }) => (
              <option
                value={node.name}
                key={node.id}
                selected={node.name.toLowerCase().replace(/\s/g, '') === show}
              >
                {node.name}
              </option>
            ))}
          </select>
          <Label>Topic:</Label>
          <select name="topic">
            <option value="Suggest a topic">Suggest a topic</option>
            <option value="Suggest a guest">Suggest a guest</option>
            <option value="Sponsor a show">Sponsor a show</option>
            <option value="Other">Other</option>
          </select>
          <Label>Subject:</Label>
          <Input type="text" name="subject" />
          <Label>Message:</Label>
          <TextArea name="message" />
          <Button type="submit">Send!</Button>
        </form>
      </PageWithSidebar>
    </Layout>
  );
};

export default ContactPage;

export const query = graphql`
  query ContactQuery {
    allContentfulPodcast(filter: { active: { eq: true } }) {
      edges {
        node {
          id
          name
        }
      }
    }
  }
`;
