import React from 'react';
import PropTypes from 'prop-types';
import { StaticQuery, graphql, Link } from 'gatsby';
import styled from 'react-emotion';
import Helmet from 'react-helmet';

const Footer = styled.div`
  text-align: right;
  padding: 40px;
  background-color: #222;

  img {
    margin-bottom: 0;
  }
`;

const ListItem = styled.li`
  display: inline-block;
  margin: 0 1rem 0 0;
`;

const ListLink = props => (
  <ListItem>
    <Link to={props.to}>{props.children}</Link>
  </ListItem>
);

const TitleContainer = styled.div`
  margin: 0px auto;
  max-width: 1200px;
  padding: 1.45rem 1.0875rem;
  display: flex;
  justify-content: space-between;
`;

const Title = ({ title }) => (
  <TitleContainer>
    <h1>
      <Link
        to="/"
        style={{
          color: 'white',
          textDecoration: 'none',
        }}
      >
        {title}
      </Link>
    </h1>
    <ul>
      <ListLink to="/about/">About</ListLink>
      <ListLink to="/shows/">Shows</ListLink>
      <ListLink to="/sponsors/">Sponsors</ListLink>
    </ul>
  </TitleContainer>
);

const Header = () => (
  <StaticQuery
    query={graphql`
      query LayoutQuery {
        site {
          siteMetadata {
            title
            description
          }
        }
      }
    `}
    render={data => (
      <div>
        <Helmet
          title={data.site.siteMetadata.title}
          meta={[
            {
              name: 'description',
              content: data.site.siteMetadata.description,
            },
            { name: 'keywords', content: 'orbit.fm, podcast, audio, radio' },
          ]}
        >
          <html lang="en" />
        </Helmet>
        <Title title={data.site.siteMetadata.title} />
      </div>
    )}
  />
);

const Layout = ({ children, data }) => (
  <div
    style={{
      height: '100%',
    }}
  >
    <Header />
    <div>{children}</div>
    <Footer>
      <a
        href="https://www.contentful.com/"
        rel="noopener noreferrer"
        target="_blank"
      >
        <img
          src="https://images.ctfassets.net/fo9twyrwpveg/7Htleo27dKYua8gio8UEUy/0797152a2d2f8e41db49ecbf1ccffdaa/PoweredByContentful_DarkBackground_MonochromeLogo.svg"
          style={{ maxWidth: 100, width: '100%' }}
          alt="Powered by Contentful"
        />
      </a>
    </Footer>
  </div>
);

Layout.propTypes = {
  children: PropTypes.node,
};

export default Layout;
