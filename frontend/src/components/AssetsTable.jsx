import { Table, Space, Typography, Form, InputNumber, Input, Popconfirm } from 'antd';
import { useCrypto } from '../context/crypto-context';
import { useState } from 'react';

const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === 'number' ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Please Input ${title}!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

const AssetsTable = () => {
  const { assets, deleteAsset, updateAsset } = useCrypto()

    const data = assets.map(a => ({
        key: a.id,
        name: a.name,
        price: a.price,
        amount: a.amount,
        date: a.date.toISOString(),
        delete: () => deleteAsset(a.id),
          // .slice(0, 19).replace('T', ' ')
    }))

    const [form] = Form.useForm()
    const [editingKey, setEditingKey] = useState('')
    const isEditing = (record) => record.key === editingKey

    const edit = (record) => {
      form.setFieldsValue({
        price: '',
        amount: '',
        ...record,
      })
      setEditingKey(record.key)
    }

    const cancel = () => {
      setEditingKey('')
    }

    const save = async (key) => {
      try {
        const row = await form.validateFields();
        updateAsset(key, row)
        setEditingKey('')
      } catch (errInfo) {
        console.log('Validate Failed:', errInfo);
      }
    };

    const columns = [
      {
        title: 'Name',
        dataIndex: 'name',
        sorter: (a, b) => a.name.length - b.name.length,
        sortDirections: ['descend'],
      },
      {
        title: 'Price, $',
        dataIndex: 'price',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.price - b.price,
        editable: true,
      },
      {
        title: 'Amount',
        dataIndex: 'amount',
        defaultSortOrder: 'descend',
        sorter: (a, b) => a.amount - b.amount,
        editable: true,
      },
      {
        title: 'Date',
        dataIndex: 'date',
        defaultSortOrder: 'descend',
        sorter: (a, b) => Date.parse(a.date) - Date.parse(b.date),
      },
      {
        title: 'Action',
        key: 'action',
        render: (_, record) => {
          const editable = isEditing(record);
          return editable ? (
            <span>
              <Typography.Link
                onClick={() => save(record.key)}
                style={{
                  marginRight: 8,
                }}
              >
                Save
              </Typography.Link>
              <Popconfirm title="Sure to cancel?" onConfirm={cancel}>
                <a>Cancel</a>
              </Popconfirm>
            </span>
          ) : (
            <Space size="middle">
              <Typography.Link disabled={editingKey !== ''} onClick={() => edit(record)}>Edit</Typography.Link>
              <Typography.Link type="danger" onClick={record.delete}>Delete</Typography.Link>
            </Space>
          )
        },
      },
    ];

    const mergedColumns = columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: (record) => ({
          record,
          inputType: 'number',
          dataIndex: col.dataIndex,
          title: col.title,
          editing: isEditing(record),
        }),
      };
    });

    return (
      <Form form={form} component={false}>
        <Table
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            pagination={false} 
            columns={mergedColumns} 
            dataSource={data}
        />
      </Form>
    )
}

export default AssetsTable