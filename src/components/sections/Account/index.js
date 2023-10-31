import React from 'react'
import styles from './Account.module.scss'
const Account = () => {
  return (
    <div className={styles.accountcontainer}>
      <div className={styles.header}>YOUR ACCOUNT</div>
       <div className={styles.boxcontainer}>
           <div className={styles.accountbox}>
            Your Order
           </div>
           <div className={styles.accountbox}>
            Login & Security
           </div>
           <div className={styles.accountbox}>
            Prime
           </div>
           <div className={styles.accountbox}>
            Your Address
           </div>
           <div className={styles.accountbox}>
            Payment Option
           </div>
           <div className={styles.accountbox}>
            Amazon Pay Balance
           </div>
           <div className={styles.accountbox}>
            box
           </div>
       </div>

       <div className={styles.boxaccountcontainer}>
           <div className={styles.boxaccount}>
            box
           </div>
           <div className={styles.boxaccount}>
            box
           </div>
           <div className={styles.boxaccount}>
            box
           </div>
           <div className={styles.boxaccount}>
            box
           </div>
           <div className={styles.boxaccount}>
            box
           </div>
           <div className={styles.boxaccount}>
            box
           </div>
           <div className={styles.boxaccount}>
            box
           </div>
       </div>

    </div>
  )
}

export default Account
