import React from 'react'
import { graphql, Link } from 'gatsby'

import Layout from '../components/Layout'
import Page from '../components/Page'

const AboutPage = ({ data }) => (
  <Layout>
    <Page
      title={`Welcome to ${data.site.siteMetadata.title}`}
      headTitle="About"
    >
      <p>
        If you like technology, web development, books, or anything nerdy,
        there's probably something here for you.
      </p>

      <h2>History</h2>
      <p>
        Orbit FM is the place where all of Adam Garrett-Harris' podcasts live.
      </p>
      <p>
        He started podcasting back in 2015 with his friend Jonathan Caldwell.
        They made a show called <Link to="/talkingdudes">Talking Dudes</Link>{' '}
        and they talked about technology, movies, and whatever was on their
        mind.
      </p>
      <p>
        Later in 2015, he started another podcast with his friend Riley
        Carasquillo, about web development, called{' '}
        <Link to="/weboftomorrow">Web of Tomorrow</Link>. He and Riley talked
        about web development on the show for about a year, and then Adam took
        over and started bringing on more guests to talk about cool stuff they
        built or experiences they've had.
      </p>
      <p>
        In 2018, he started <Link to="/bookbytes">BookBytes</Link> in order to
        read and discuss great programming books with interesting people.
      </p>
    </Page>
  </Layout>
)

export default AboutPage

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
`
