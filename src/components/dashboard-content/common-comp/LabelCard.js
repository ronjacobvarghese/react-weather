import { Fragment } from 'react';
import styles from './LabelCard.module.css';

function LabelCard({className, title, climate, temp}) {
  return(
    <Fragment>
      <li className = {styles['label-card-container']}>
        <header>{title? title:"--"}</header>
        <section className = {className}>
          {climate? climate:"--"}
          <div/>
          <p>{temp?temp:"--"}</p>
        </section>
      </li>
    </Fragment>
  )
}

export default LabelCard;