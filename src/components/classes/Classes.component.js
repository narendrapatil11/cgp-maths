import React, { useEffect, useState } from 'react'
import { Card, Spin } from 'antd';
import { withRouter } from 'react-router-dom';
import { getClassList } from '../../shared/api';
import { SiGoogleclassroom } from "react-icons/si";
import './Classes.scss';

const { Meta } = Card;

function Classes(props) {
  const [loader, setLoader] = useState(false);
  const [classList, setClassList] = useState([]);

  const _goToClassDetails = (item) => {
    props.history.push(`/subject/${item.id}`);
  }

  useEffect(() => {
    setLoader(true);
    const classList = getClassList();
    classList.then(snapshot => {
      let classList = [];
      snapshot.forEach(snap => {
        classList.push(snap.val());
      });
      setClassList(classList)
      setLoader(false);
    })
  }, [props.match.url])

  return (
    <Spin spinning={loader} >
      <div className="Classes">
        {
          classList.map((item) => (
            <Card className="Classes__Card"
              key={item.id} id={item.id}
              style={{ width: 300, marginBottom: 16, display: 'inline-block' }}
              hoverable onClick={() => { _goToClassDetails(item) }}
            >
              <Meta
                avatar={
                  <SiGoogleclassroom style={{ fontSize: 44, color: '#1890ff' }} />
                }
                title={item.title}
                description={item.desc}
              />
            </Card>
          ))
        }
      </div >
    </Spin>
  )
}

export default withRouter(Classes)
