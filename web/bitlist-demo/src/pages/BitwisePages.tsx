import React, { useEffect, useState } from 'react';
import type { GetProp, TableProps } from 'antd';
import { Button, Space, Table, Flex, } from 'antd';
import type { SorterResult } from 'antd/es/table/interface';
import { useNavigate } from 'react-router-dom';
import { GetBitlistHttp } from '../api';
import { BitlistCreate } from '../components'
import { useWallet } from '@solana/wallet-adapter-react';

import { ListDataType } from '../types/global';
type ColumnsType<T extends object = object> = TableProps<T>['columns'];
type TablePaginationConfig = Exclude<GetProp<TableProps, 'pagination'>, boolean>;

interface TableParams {
  pagination?: TablePaginationConfig;
  sortField?: SorterResult<any>['field'];
  sortOrder?: SorterResult<any>['order'];
  filters?: Parameters<GetProp<TableProps, 'onChange'>>[1];
}


const BitlistFeature = () => {
  const { publicKey } = useWallet();
  const navigate = useNavigate();

  const [data, setData] = useState<ListDataType[]>([]);
  const [loading, setLoading] = useState(false);
  const [tableParams, setTableParams] = useState<TableParams>({
    pagination: {
      current: 1,
      pageSize: 10,
    },
  });
  const columns: ColumnsType<ListDataType> = [
    {
      title: 'Id',
      dataIndex: 'Id',
      key: 'Id',

    },
    {
      title: 'title',
      dataIndex: 'title',
    },

    {
      title: 'CreatedAt',
      dataIndex: 'CreatedAt',
    },
    {
      title: 'baseAmount',
      dataIndex: 'baseAmount',
      render: (text) => `$${text}`,
    },

    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="middle">
          <Button
            color="primary"
            variant="text"
            disabled={!publicKey}
            onClick={() => navigate('/about', { state: record })}
          >
            View
          </Button>
        </Space>
      ),
    },
  ];



  const fetchData = async (offset = 0) => {
    console.log('tableParams.pagination?.current--', tableParams?.pagination?.current);
    try {
      const result = await GetBitlistHttp({ limit: 10, offset: offset * 10 });
      console.log('result-data--', result);

      // 确保 result 是一个数组
      if (Array.isArray(result?.list)) {
        setData(result?.list);
        setTableParams({
          ...tableParams,
          pagination: {
            ...tableParams.pagination,
            total: result?.pageInfo?.totalRows,
            current: result?.pageInfo?.page,
            // 200 is mock data, you should read it from server
            // total: data.totalCount,
          },
        });
      } else {
        console.error("Fetched data is not an array:", result);
        setData([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setData([]);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);

  const handleTableChange: TableProps<ListDataType>['onChange'] = (pagination, filters, sorter) => {


    fetchData(Number(pagination.current) - 1);
    if (pagination.pageSize !== tableParams.pagination?.pageSize) {
      setData([]);
    }
  };

  return (
    <div style={{ margin: '50px' }}>
      <Table<ListDataType>
        title={() => <Flex justify='space-between' align='center' >
          <h1 className='text-2xl font-bold'>Bitlist info</h1>
          <BitlistCreate onFetchData={fetchData} />
        </Flex>
        }
        columns={columns}
        rowKey={(record) => record.Id?.toString() || ''}
        dataSource={data}
        // pagination={false}
        loading={loading}
        pagination={tableParams.pagination}
        onChange={handleTableChange}
      />
    </div>

  );
};

export default BitlistFeature;
