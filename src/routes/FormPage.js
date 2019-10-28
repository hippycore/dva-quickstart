import React from 'react';
import { connect } from 'dva';

const TestForm = ({ dispatch, products }) => {
  return (
    <div>
      <h2>List of Products</h2>


    </div>
  );
};

// export default Products;
export default connect(({ products }) => ({
  products,
}))(TestForm);
