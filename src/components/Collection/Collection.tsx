import React from 'react'
import { Link } from 'react-router'
import { CollectionProps } from '@/types'
import beerIcon from '../../assets/beerIcon.jpg'

import styles from './Collection.module.css'

export function Collection({ beers }: CollectionProps): React.ReactElement {
  return (
    <div className={styles.container}>
      {beers.map((beer) => (
        <div className={styles.card} key={beer.id}>
          <Link to={`/beers/${beer.id}`}>
            <img
              className={styles.cardImage}
              src={beer.image}
              alt={beer.name}
              onError={(e) => {
                ;(e.target as HTMLImageElement).src = beerIcon
              }}
            />
            <div className={styles.cardContent}>
              <h3 className={styles.cardTitle}>{beer.name}</h3>
              <div>
                <p className={styles.cardText}>
                  <strong>Price:</strong> {beer.price}
                </p>
                <p className={styles.cardText}>
                  <strong>Rating:</strong>
                  {' ⭐'.repeat(Math.round(beer.rating?.average))}
                </p>
              </div>
            </div>
          </Link>
        </div>
      ))}
    </div>
  )
}
