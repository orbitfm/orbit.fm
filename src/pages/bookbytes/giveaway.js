import React from 'react'

import Layout from '../../components/Layout'
import PageWithSidebar from '../../components/PageWithSidebar'

const GiveawayPage = ({ data }) => (
  <Layout>
    <PageWithSidebar
      title={`Book Giveaway!`}
      headTitle="Book Givaway"
      description={`Because books are awesome`}
      color="#33444c"
    >
      <p>
        We're done with the giveaway, but we'd still appreciate it if you would
        leave us a review{' '}
        <a
          href="https://itunes.apple.com/us/podcast/bookbytes/id1355549752"
          style={{ textDecoration: 'underline' }}
          target="_blank"
          rel="noopener noreferrer"
        >
          on iTunes
        </a>{' '}
        And we would also appreciate you tweeting about the show, and telling
        your friends about it!
      </p>
    </PageWithSidebar>
  </Layout>
)

export default GiveawayPage
