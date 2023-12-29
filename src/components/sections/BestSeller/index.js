"use client";
import React from "react";
import styles from "./BestSeller.module.scss";
import { useSession } from "next-auth/react";

const BestSeller = () => {
  return (
    <div className={styles.component}>
      {[
        "https://www.bigbasket.com/media/customPage/b01eee88-e6bc-410e-993c-dedd012cf04b/91e53046-98e0-4c5b-ae53-7d073e5210e1/3c5df782-1789-4bea-8403-9fd766652b34/t1_hp_aff_m_paytm_360_251023.jpg?tr=w-1920,q=80",
        "https://www.bigbasket.com/media/customPage/b01eee88-e6bc-410e-993c-dedd012cf04b/91e53046-98e0-4c5b-ae53-7d073e5210e1/3c5df782-1789-4bea-8403-9fd766652b34/t1_hp_aff_m_cred_360_251023.jpg?tr=w-1920,q=80",
        "https://www.bigbasket.com/media/customPage/b01eee88-e6bc-410e-993c-dedd012cf04b/91e53046-98e0-4c5b-ae53-7d073e5210e1/3c5df782-1789-4bea-8403-9fd766652b34/t1_hp_aff_m_mobikwik-10_360_251023.jpg?tr=w-1920,q=80",
        "https://www.bigbasket.com/media/customPage/b01eee88-e6bc-410e-993c-dedd012cf04b/91e53046-98e0-4c5b-ae53-7d073e5210e1/3c5df782-1789-4bea-8403-9fd766652b34/t1_hp_aff_m_sbi_360_251023.jpg?tr=w-1920,q=80",
      ].map((e, i) => (
        <div className={styles.sellers} key={i}>
          <img src={e} />
        </div>
      ))}
    </div>
  );
};

export default BestSeller;
