import React from 'react';
import Link from 'gatsby-link';
import styled from 'react-emotion';
import PageWithSidebar from '../../components/PageWithSidebar';
import bookCover from '../../images/apprenticeship-patterns.jpg';

const Image = styled.img`
  margin-top: -150px;
  @media (max-width: 700px) {
    margin-top: 0;
  }
`;

const GiveawayPage = ({ data }) => (
  <PageWithSidebar
    title={`Book Giveaway!`}
    description={`Because books are awesome`}
    sidePanelChildren={<Image src={bookCover} />}
  >
    <p>
      We're giving away <em>5 copies</em> of Apprenticeship Patterns signed by
      the author, David Hoover.
    </p>
    <h2>How to Enter</h2>
    <ol>
      <li>Leave a review for BookBytes on iTunes.</li>
      <li>Fill out this form.</li>
      <li>Pretty simple (actually, that's not a step, but it's true).</li>
    </ol>
    <form
      action="https://docs.google.com/forms/d/e/1FAIpQLSfFvrs4IIOYFqlcninBnYdHzUHXHQFZYKBNiAnYf2BG3gikWw/formResponse"
      target="_self"
      method="POST"
      id="mG61Hd"
    >
      <input
        aria-label="Name used for the review"
        name="entry.1945084331"
        value=""
        type="text"
      />
      <input
        aria-label="Email address"
        name="entry.1751179764"
        value=""
        type="text"
      />
    </form>
  </PageWithSidebar>
);

export default GiveawayPage;
