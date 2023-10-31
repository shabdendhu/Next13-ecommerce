import React from 'react'
import styles from './Account.module.scss';
import LockIcon from '@mui/icons-material/Lock';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import WalletIcon from '@mui/icons-material/Wallet';
import PaymentIcon from '@mui/icons-material/Payment';
import SupportAgentIcon from '@mui/icons-material/SupportAgent';
import ShoppingBasketRoundedIcon from '@mui/icons-material/ShoppingBasketRounded';
const Account = () => {
  return (
    <div className={styles.accountcontainer}>
      <div className={styles.header}>YOUR ACCOUNT</div>
       <div className={styles.boxcontainer}>
           <div className={styles.accountbox}>
            <ShoppingBasketRoundedIcon style={{marginRight:'5px',color:'green',fontSize:'35px'}}/>
            <span>
            <b>Your Order</b>
            <p style={{color:'#8d8585'}}>Track,Return or buy things again</p>
            </span>
           </div>
           <div className={styles.accountbox}>
            <LockIcon style={{marginRight:'5px',color:'green',fontSize:'35px'}}/>
            <span>
            <b>Login & Security</b>
            <p style={{color:'#8d8585'}}>Edit login,moblienumber,mail</p>
            </span>
           
           </div>
           <div className={styles.accountbox}>
            
            Prime
           </div>
           <div className={styles.accountbox}>
            <LocationOnIcon style={{marginRight:'5px',color:'green',fontSize:'35px'}}/>
            <span>
            <b>Your Address</b>
            <p style={{color:'#8d8585'}}>Edit your address</p>
            </span>
           </div>
           <div className={styles.accountbox}>
            <PaymentIcon style={{marginRight:'5px',color:'green',fontSize:'35px'}}/>
            <span>
                <b>Payment Option</b>
                <p style={{color:'#8d8585'}}>Edit or add payment methods</p>
            </span>
           </div>
           <div className={styles.accountbox}>
            <WalletIcon style={{marginRight:'5px',color:'green',fontSize:'35px'}}/>
           <span>
            <b> Amazon Pay Balance</b>
            <p style={{color:'#8d8585'}}>Add money to your balance</p>
           </span>
           </div>
           <div className={styles.accountbox}>
            <SupportAgentIcon style={{marginRight:'5px',color:'green',fontSize:'35px'}}/>
            <span>
            <b>Contact US</b>   
            </span>
           </div>
           <div className={styles.accountbox}>
            Amazon Business
           </div>
       </div>

    </div>
  )
}

export default Account
