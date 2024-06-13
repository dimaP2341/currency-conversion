// __mocks__/react-router-dom.js

import React from "react";

// Mock Link component
const Link = ({ to, children }) => {
  return <a href={to}>{children}</a>;
};

export { Link };
