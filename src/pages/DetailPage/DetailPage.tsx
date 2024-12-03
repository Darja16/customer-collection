import React, { useState, ChangeEvent } from 'react'
import { useNavigate, useParams } from 'react-router'
import { useBeerCollectionContext } from '@/store/beer-collection-provider'
import { Feedback } from '@/types'
import beerIcon from '../../assets/beerIcon.jpg'

import styles from './DetailPage.module.css'

export function DetailPage(): React.ReactElement {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { beerCollection, feedback, addFeedback } = useBeerCollectionContext()

  const beer = beerCollection.find((b) => b.id.toString() === id)

  const [userComment, setUserComment] = useState('')

  const handleAddFeedback = () => {
    if (!userComment) return

    // TODO: OCEKUJE NIZ
    const newFeedback: Feedback = {
      comment: userComment,
    }

    addFeedback(id!, newFeedback)

    setUserComment('')
  }

  if (!beer) {
    return (
      <div className={styles.container}>
        <div className={styles.paper}>
          <p className={styles.heading}>Beer not found!</p>
          <button
            className={`${styles.button} ${styles.secondaryButton}`}
            onClick={() => navigate('/')}
          >
            Back to Main Page
          </button>
        </div>
      </div>
    )
  }

  const beerFeedback = feedback[id!] || []

  return (
    <div className={styles.container}>
      <div className={styles.paper}>
        <img
          src={beer.image}
          alt={beer.name}
          className={styles.image}
          onError={(e) => {
            ;(e.target as HTMLImageElement).src = beerIcon
          }}
        />
        <h1 className={styles.heading}>{beer.name}</h1>
        <p className={styles.bodyText}>
          <strong>Price:</strong> {beer.price}
        </p>
        <p className={styles.bodyText}>
          <strong>Rating:</strong>{' '}
          {beer.rating?.average ? beer.rating.average.toFixed(2) : 'N/A'}
          {' ⭐'.repeat(Math.round(beer.rating.average))}
        </p>

        {/* Add User Feedback */}
        <div className={styles.commentSection}>
          <h2 className={styles.sectionHeading}>Add Your Comment</h2>
          <textarea
            rows={2}
            placeholder="Your Feedback"
            value={userComment}
            onChange={(e: ChangeEvent<HTMLTextAreaElement>) =>
              setUserComment(e.target.value)
            }
          />
          <button className={styles.button} onClick={handleAddFeedback}>
            Submit Feedback
          </button>
        </div>

        <div>
          <h2 className={styles.sectionHeading}>User Feedback</h2>
          {beerFeedback.length === 0 ? (
            <p className={styles.feedbackEmpty}>
              No feedback yet. Be the first to comment!
            </p>
          ) : (
            beerFeedback.map((fb, index) => (
              <div key={index} className={styles.feedbackItem}>
                <p className={styles.bodyText}>
                  <strong>Comment: </strong>
                  {fb.comment}
                </p>
              </div>
            ))
          )}
        </div>

        <button
          className={`${styles.button} ${styles.secondaryButton}`}
          onClick={() => navigate('/')}
        >
          Back to Main Page
        </button>
      </div>
    </div>
  )
}
