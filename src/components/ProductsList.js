import React from 'react';
import PropTypes from 'prop-types';
import { Table, Popconfirm, Button } from 'antd';

const ProductList = ({ onDelete, products }) => {
  const columns = [{
    title: 'dsp id',
    dataIndex: 'dsp_id',
  },
    {
      title: 'date',
      dataIndex: 'date',
    },
    {
      title: 'Bid request',
      dataIndex: 'bidrequest',
    },
    {
      title: 'Bid response',
      dataIndex: 'bidresponse',
    },
    {
      title: 'Impressions',
      dataIndex: 'impressions',
    },
    {
      title: 'Spend',
      dataIndex: 'spend',
    }, {
    title: 'Actions',
    render: (text, record) => {
      return (
        <Popconfirm title="Delete?" onConfirm={() => onDelete(record.id)}>
          <Button>Delete</Button>
        </Popconfirm>
      );
    },
  }];
  return (
    <Table
      rowKey="id"
      dataSource={products}
      columns={columns}
    />
  );
};

ProductList.propTypes = {
  onDelete: PropTypes.func.isRequired,
  products: PropTypes.array.isRequired,
};

export default ProductList;
