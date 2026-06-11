import React, { useContext, useState } from 'react'
import styles from './Dashboard.module.css'
import CreditScoreIcon from '@mui/icons-material/CreditScore';
import Skeleton from '@mui/material/Skeleton';
import withAuthHOC from '../../utils/HOC/withAuthHOC';
import axios from '../../utils/axios'
import { AuthContext } from '../../utils/AuthContext';

const Dashboard = () => {
    const [uploadFiletext, setUploadFileText] = useState("Upload yor resume");
    const [loading, setloading] = useState(false);
    const [resumeFile, setResumeFile] = useState(null);
    const [jobDesc, setJobDesc] = useState("");
    const [result, setResult] = useState(null);

    const { userInfo } = useContext(AuthContext);



    const handleOnChangeFile = (e) => {
        console.log("hello", e.target.files[0]);
        setResumeFile(e.target.files[0]);
        setUploadFileText(e.target.files[0].name);
    }

    const handleUpload = async () => {
        setResult(null);
        if (!resumeFile || !jobDesc) {
            alert("Please fill Job Description & Upload Resume")
            return;
        }

        const formData = new FormData();
        formData.append('resume', resumeFile);
        formData.append('job_desc', jobDesc);
        formData.append('user', userInfo._id);
        setloading(true);

        try {
            const result = await axios.post('/api/resume/addResume', formData);
            // Ai data means feedback and score
            console.log(result);
            setResult(result.data.data);
        } catch (err) {
            console.log(err);
        } finally {
            setloading(false);
        }
        // try {
        //     const res = await axios.post('/api/resume/analyze', formData);
        //     console.log(res.data);
        // } catch (error) {
        //     console.log(error);

        // }

    }
    return (
        <div className={styles.Dashboard}>
            <div className={styles.DashboardLeft}>
                <div className={styles.DashboardHeader}>
                    <div className={styles.DashboardHeaderTitle}>Smart Resume Screening</div>
                    <div className={styles.DashboardHeaderLargeTitle}>Resume Match Score</div>
                </div>

                <div className={styles.alertInfo}>
                    <div>⚠️ Important Instruction:</div>
                    <div className={styles.dashboardInstruction}>
                        <div>📋 Please ensure that the resume and job description fields are filled out before submitting.</div>
                        <div>📑 Only PDF format (.pdf) resumes are accepted.</div>
                    </div>
                </div>

                <div className={styles.DashboardUploadResume}>
                    <div className={styles.DashboardResumeBlock}>
                        {uploadFiletext}
                    </div>
                    <div className={styles.DashboardInputField}>
                        <label htmlFor="inputField" className={styles.analyzeAIBtn}>Upload Resume</label>
                        <input type="file" id='inputField' accept='.pdf' onChange={handleOnChangeFile} />
                    </div>
                </div>

                <div className={styles.jobDesc}>
                    <textarea value={jobDesc} onChange={(e) => { setJobDesc(e.target.value) }} className={styles.textArea} placeholder='Paste Your Job Description' rows={10} cols={50} />
                    <div className={styles.AnalyzeBtn} onClick={handleUpload} >Analyze</div>
                </div>
            </div>

            <div className={styles.DashboardRight}>
                <div className={styles.DashboardRightTopCard}>
                    <div>Analyze With AI</div>
                    <img className={styles.profileImg} src={userInfo?.photoUrl} />
                    <h2>{userInfo?.name}</h2>
                </div>
                {result && <div className={styles.DashboardRightTopCard}>
                    <div>Result</div>
                    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 20 }}>
                        <h1>{result?.score} %</h1>
                        <CreditScoreIcon sx={{ fontSize: 22 }} />
                    </div>
                    <div className={styles.feedback}>
                        <h2>Feedback</h2>
                        <p>{result?.feedback}
                        </p>
                    </div>
                </div>}
                {loading && <Skeleton
                    variant="rectangular"
                    width={266}
                    height={200}
                    sx={{ borderRadius: "20px" }}
                />}
            </div>

        </div>
    )
}

export default withAuthHOC(Dashboard);