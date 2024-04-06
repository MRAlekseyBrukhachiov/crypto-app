import { ClockCircleOutlined } from '@ant-design/icons';
import React from 'react';
import { Card, List, Space, Typography } from 'antd';
import { getTimeAgo } from '../utils';

  const IconText = ({ icon, text }) => (
    <Space>
      {React.createElement(icon)}
      {text}
    </Space>
  );

const showTime = (timeAgo) => {
    const { days, hours, minutes, seconds } = timeAgo;
    if (days) {
        return `${days}d ago`
    } else if (hours) {
        return `${hours}h ago`
    } else if (minutes) {
        return `${minutes}m ago`
    } else if (seconds) {
        return `${seconds}s ago`
    }
}

const ListNews = ({news, label}) => {
    const data = news.map(a => ({
        href: a.shareURL,
        title: a.title,
        description: a.source,
        sourceLink: a.sourceLink,
        content: a.description,
        imgUrl: a.imgUrl,
        timeAgo: getTimeAgo(a.feedDate),
    }))

    return (
        <Card style={{marginBottom: '1rem'}}>
            <List
                itemLayout="vertical"
                style={{background: 'white' }}
                size="large"
                pagination={{
                    onChange: (page) => {
                        console.log(page);
                    },
                    pageSize: 4,
                }}
                dataSource={data}
                header={
                    <Typography.Title level={2} style={{textAlign: 'left', padding: '1rem'}}>
                        {label} News
                    </Typography.Title>
                }
                renderItem={(item) => (
                    <List.Item
                        key={item.title}
                        style={{textAlign: 'left'}}
                        actions={[
                            <IconText icon={ClockCircleOutlined} text={showTime(item.timeAgo)} key="list-vertical-clock" />,
                        ]}
                        extra={
                            <img
                                style={{objectFit: 'cover'}}
                                width={272}
                                height={182}
                                alt="news logo"
                                src={item.imgUrl}
                            />
                        }
                    >
                        <List.Item.Meta
                            title={<a href={item.href}>{item.title}</a>}
                            description={<a href={item.sourceLink}>{item.description}</a>}
                        />
                            {item.content}
                        </List.Item>
                )}
            />
        </Card>
    )
}

export default ListNews