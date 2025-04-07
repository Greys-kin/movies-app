import React from 'react';
import { Typography } from 'antd';

import './genre.css';

const { Text } = Typography;

const Genre = ({ movieGenres }) => {
  return (
    <>
      <Text code>{movieGenres}</Text>
    </>
  );
};

export default Genre;
