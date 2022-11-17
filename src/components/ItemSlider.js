import { Fragment } from 'react';

import styles from './ItemSlider.module.css';
import Card from './footer-content/Card';

function ItemSlider({items}){
  return (
      <div className ={ styles['slider-container']}>
        <Card/>
        <Card/>
        <Card/>
      </div>
  )
}

export default ItemSlider;