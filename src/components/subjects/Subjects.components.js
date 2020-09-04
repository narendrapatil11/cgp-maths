import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { getSubjectList } from '../../shared/api'
import { Spin, Card, Button, Avatar } from 'antd';
import MATHS_IMAGE from '../../styles/images/maths.jpg'
import PHYSICS_IMAGE from '../../styles/images/physics.jpg'
import './Subjects.scss';

const IMAGES = {
  '11_MSBSHSE_MATHEMATICS_STATISTICS': MATHS_IMAGE,
  '12_MSBSHSE_MATHEMATICS_STATISTICS': MATHS_IMAGE,
  '11_CBSE_MATHEMATICS_STATISTICS': MATHS_IMAGE,
  '12_CBSE_MATHEMATICS_STATISTICS': MATHS_IMAGE,
  '11_MSBSHSE_PHYSICS': PHYSICS_IMAGE,
  '12_MSBSHSE_PHYSICS': PHYSICS_IMAGE,
  '11_CBSE_PHYSICS': PHYSICS_IMAGE,
  '12_CBSE_PHYSICS': PHYSICS_IMAGE,
  '11_MSBSHSE_BIOLOGY': PHYSICS_IMAGE,
  '12_MSBSHSE_BIOLOGY': PHYSICS_IMAGE,
  '11_CBSE_BIOLOGY': PHYSICS_IMAGE,
  '12_CBSE_BIOLOGY': PHYSICS_IMAGE,
};

const { Meta } = Card;

function Subjects(props) {
  const [loader, setLoader] = useState(false);
  const [subjectList, setSubjectList] = useState([]);

  useEffect(() => {
    setLoader(true);
    getSubjectList(props.match.params.id)
      .then(snapshot => {
        let subjects = [];
        snapshot.forEach(snap => {
          subjects.push(snap.val());
        });
        setSubjectList(subjects)
        setLoader(false);
      })
  }, [props.match.param])
  return (
    <Spin spinning={loader} >
      <div className="Subjects">
        {
          subjectList.map(item => (
            <Card hoverable>
              <Meta avatar={<Avatar src={IMAGES[item.id]} />} title={item.name} description={item.desc} />
            </Card>)
          )
        }
      </div>
    </Spin >
  )
}

export default withRouter(Subjects)
