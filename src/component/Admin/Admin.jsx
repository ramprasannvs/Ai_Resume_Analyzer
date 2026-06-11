import React from 'react'
import styles from './Admin.module.css'
import Skeleton from '@mui/material/Skeleton';
import withAuthHOC from '../../utils/HOC/withAuthHOC';
import { useState } from 'react';
import { useEffect, useContext } from 'react';
import axios from '../../utils/axios';

const Admin = () => {
    const [data, setData] = useState([]);
    const [loader, setLoader] = useState(false);

    useEffect(() => {

        const fetchAllData = async () => {
            try {
                setLoader(true);
                const results = await axios.get('/api/resume/get');
                // console.log("hello", results);
                setData(results.data.resumes);
            } catch (err) {
                alert("Something Went Wrong");
                console.log(err);
            } finally {
                setLoader(false);
            }
        }

        fetchAllData();
    }, [])


    return (
        <div className={styles.Admin}>
            <div className={styles.AdminBlock}>

                {loader && <><Skeleton
                    variant="rectangular"
                    width={266}
                    height={200}
                    sx={{ borderRadius: "20px" }}
                />
                    <Skeleton
                        variant="rectangular"
                        width={266}
                        height={200}
                        sx={{ borderRadius: "20px" }}
                    /></>}


                {
                    data.map((item, index) => {
                        return (
                            <div key={index} className={styles.AdminCard}>
                                <h2>{item?.user?.name}</h2>
                                <p style={{ color: "blue" }}>{item?.user?.email}</p>
                                <h3>Score : {item.score}%</h3>
                                <p>{item.feedback}</p>
                            </div>

                        )

                    })
                }


            </div>
        </div >
    )
}

export default withAuthHOC(Admin);