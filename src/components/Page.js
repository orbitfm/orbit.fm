import React from 'react'
import PropTypes from 'prop-types'
import styled from 'react-emotion'
import InfoBar from '../components/InfoBar'
import { Helmet } from 'react-helmet'

const Container = styled.div`
  margin: 0 auto;
  max-width: 1200px;
  padding-top: 0;
  padding: 20px;
`

const Page = ({ children, title, headTitle }) => (
  <div>
    {headTitle ? <Helmet title={`${headTitle} - Orbit FM`} /> : null}
    <InfoBar>
      <Container>
        <h1>{title}</h1>
      </Container>
    </InfoBar>
    <Container>{children}</Container>
  </div>
)

Page.propTypes = {
  title: PropTypes.string.isRequired,
  headTitle: PropTypes.string,
}

export default Page
