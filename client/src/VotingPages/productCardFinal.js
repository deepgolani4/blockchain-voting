import React from 'react';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import PropTypes from 'prop-types';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';

const ProductCard = ({ product }) => {
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
      };
      const [selectedValue, setSelectedValue] = React.useState('a');
  return (
    <TableRow>
      <TableCell>
        <img
          alt={product.name}
          height="150px"
          width="150px"
          src={product.src}
        />
      </TableCell>
      <TableCell>{product.title}</TableCell>
      <TableCell> {product.subTitle} </TableCell>
      <TableCell> {product.party} </TableCell>
      <TableCell>
  
        <FormControlLabel value={product.title} control={<Radio />}  label="vote" />
  

      </TableCell>
    </TableRow>
  );
};

ProductCard.propTypes = {
  product: PropTypes.object.isRequired,
};

export default ProductCard;
