import React from 'react';
import './Card.scss';

function Card(props) {
  const { title, desc, image } = props;
  return (
    <div class="card">
      <div class="face face1">
        <div class="content">
          <img src={image} />
          <h3>{title}</h3>
        </div>
      </div>
      <div class="face face2">
        <div class="content">
          <p>{desc}</p>
          <a href="#">Read More</a>
        </div>
      </div>
    </div>
  )
}

export default Card
