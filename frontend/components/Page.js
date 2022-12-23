import React from 'react';
import PropTypes from "prop-types";
import Header from './Header';
import Footer from './Footer';

export default function Page({ children }) {
  return (
    <div>
		<Header />
      <h2> I am the page Component.</h2>
      {children}
	  <Footer />
    </div>
  );
}

Page.propTypes = {
  children: PropTypes.any,
};
