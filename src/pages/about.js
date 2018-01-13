import React from 'react';
import Link from 'gatsby-link';
import Page from '../components/Page';

const AboutPage = ({ data }) =>
  console.log(data) || (
    <Page>
      <h1>Welcome to {data.site.siteMetadata.title}</h1>
      <p>
        Instead of scattering my podcasts across multiple websites, I just
        wanted one simple place to put them all. There are currently{' '}
        <Link to="/shows">{data.allContentfulPodcast.edges.length} shows</Link>{' '}
        on the site. So it's kind of like a podcast network, but it's more like
        a website with multiple podcasts.
      </p>

      <h2>History</h2>
      <p>
        I started podcasting back in 2015 with my friend Jonathan. We made a
        show called <Link to="/talkingdudes">Talking Dudes</Link> and we just
        talked about whatever we wanted to. No one listened, but it was a ton of
        fun.
      </p>
      <p>
        In 2015, my friend Riley Carasquillo, asked me if I wanted to start a
        podcast about web development. I said yes and we called it{' '}
        <Link to="/weboftomorrow">Web of Tomorrow</Link>. Riley and I talked
        about Web Dev on the show for about a year, and then I took over and
        started bringing on more guests.
      </p>
      <p>- Adam Garrett-Harris</p>
    </Page>
  );

export default AboutPage;

export const query = graphql`
  query AboutQuery {
    site {
      siteMetadata {
        title
        description
      }
    }
    allContentfulPodcast(filter: { active: { eq: true } }) {
      edges {
        node {
          id
          name
          fields {
            slug
          }
        }
      }
    }
  }
`;
