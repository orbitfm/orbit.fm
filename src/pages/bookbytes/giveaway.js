import React from "react";
import Link from "gatsby-link";
import styled from "react-emotion";
import PageWithSidebar from "../../components/PageWithSidebar";
import bookCover from "../../images/apprenticeship-patterns.jpg";

const Image = styled.img`
  margin-top: -150px;
  @media (max-width: 700px) {
    margin-top: 0;
  }
`;

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

const GiveawayPage = ({ data }) => (
  <PageWithSidebar
    title={`Book Giveaway!`}
    description={`Because books are awesome`}
    sidePanelChildren={<Image src={bookCover} />}
  >
    <p>
      We're giving away <em>5 copies</em> of Apprenticeship Patterns signed by
      David Hoover. All you have to do is leave a review for{" "}
      <a
        href=""
        style={{ textDecoration: "underline" }}
        target="_blank"
        rel="noopener"
      >
        BookBytes on iTunes
      </a>{" "}
      and fill out this form.
    </p>

    <form
      name="contact"
      method="POST"
      action="/bookbytes/giveaway/thankyou"
      data-netlify="true"
    >
      <Label>Name on the Review:</Label>
      <Input type="text" name="name" />
      <Label>Email or Twitter handle:</Label>
      <Input type="text" name="contact" />
      <Label>Anything you want to say?</Label>
      <TextArea name="message" />
      <Button type="submit">Enter!</Button>
    </form>
  </PageWithSidebar>
);

export default GiveawayPage;
