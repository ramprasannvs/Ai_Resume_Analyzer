import React from 'react'
import styles from './History.module.css'
import Skeleton from '@mui/material/Skeleton';
import withAuthHOC from '../../utils/HOC/withAuthHOC';
import { useState, useEffect } from 'react';
import axios from '../../utils/axios';
import { useContext } from 'react';
import { AuthContext } from '../../utils/AuthContext';

const History = () => {
    const [data, setData] = useState([]);
    const [loader, setLoader] = useState(false);
    const { userInfo } = useContext(AuthContext);

    useEffect(() => {

        const fetchUserData = async () => {
            try {
                setLoader(true);
                const results = await axios.get(`/api/resume/get/${userInfo._id}`);
                console.log("hello", results);
                setData(results.data.resumes);
            } catch (err) {
                alert("Something Went Wrong");
                console.log(err);
            } finally {
                setLoader(false);
            }
        }

        fetchUserData();
    }, [])

    return (
        <div className={styles.History}>
            <div className={styles.HistoryCardBlock}>

                {
                    loader && <Skeleton
                        variant="rectangular"
                        width={266}
                        height={200}
                        sx={{ borderRadius: "20px" }}
                    />
                }

                {
                    data.map((item, index) => {
                        return (
                            <div key={index} className={styles.HistoryCard}>
                                <div className={styles.cardPercentage}>{item.score}%</div>
                                {/* <h2>Frontend Developer</h2> */}
                                <p>Resume Name : {item.resume_name}</p>
                                <p>{item.feedback}</p>
                                <p>Dated : {item.createdAt.slice(0, 10)}</p>
                            </div>

                        )
                    })
                }

            </div>
        </div>
    )
}

export default withAuthHOC(History);