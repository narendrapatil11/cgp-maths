import React from 'react'
import { Card, Avatar } from 'antd';
import { withRouter } from 'react-router-dom';

const { Meta } = Card;

const CLASSES_LIST = [
  {
    id: '12_TH_CLASS',
    title: '12th Class',
    description: 'This is the description',
    route: '12'
  },
  {
    id: '11_TH_CLASS',
    title: '11th Class',
    description: 'This is the description',
    route: '11'
  }
]

function Classes(props) {
  const _goToClassDetails = (item) => {
    props.history.push(`/subject/${item.route}`);
  }
  return (
    <div className="Classes">
      {
        CLASSES_LIST.map((item) => (
          <Card key={item.id} id={item.id} style={{ width: 300, marginBottom: 16, display: 'inline-block' }} hoverable onClick={() => { _goToClassDetails(item) }}>
            <Meta
              avatar={
                <Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />
              }
              title={item.title}
              description={item.description}
            />
          </Card>
        ))
      }
    </div >
  )
}

export default withRouter(Classes)
