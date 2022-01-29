import * as React from 'react';
import {useState,useContext} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import './signup.css';
import Alert from '@mui/material/Alert';
import { makeStyles } from '@mui/styles';
import Insta from '../assets/insta.png';
import TextField from '@mui/material/TextField';
import {Link, useNavigate} from  'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
import { database,storage } from '../firebase';
export default function Signup() {
    const useStyles = makeStyles({
        text1: {
            color: '#474c47e6',
            textAlign: 'center'
        },
        card2:{
            height:'5vh',
            marginTop:'2%'
        }
    })
    const classes = useStyles();
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [name,setName] = useState('');
    const [file,setFile] = useState(null);
    const [error,setError] = useState('');
    const [loading,setLoading] = useState(false);
    const history = useNavigate();
    const {signup} = useContext(AuthContext);
    const handleClick = async() => {
        if(file==null){
            setError("Please upload profile image first");
            setTimeout(()=>{
                setError('')
            },2000)
            return;
        }

        try{
            setError('');
            setLoading(true);
            let userObj = await signup(email,password);
            let uid = userObj.user.uid;
            console.log(uid);
            const uploadTask = storage.ref(`/users/${uid}/ProfileImage`).put(file);
            uploadTask.on('state_changed',fn1,fn2,fn3);
            function fn1(snapshot){
                let progress = (snapshot.bytesTransferred / snapshot.totalBytes)*100;
                console.log(`Upload is ${progress} done.`)
            }
            function fn2(error){
                setError(error);
                setTimeout(()=>{
                    setError('')
                },2000);
                setLoading(false)
                return;
            }
            function fn3(){
                uploadTask.snapshot.ref.getDownloadURL().then((url)=>{
                    console.log(url);
                    database.users.doc(uid).set({
                        email:email,
                        userId:uid,
                        fullname:name,
                        profileUrl:url,
                        createdAt:database.getTimeStamp()
                    })
                })
                setLoading(false);
                history('/')
            }
        }
        catch(err)
        {
            setError(err);
            setTimeout(()=>{
                setError('')
            },2000)
        }

    }
    return (
        <div className="signupwrap" style={{height:"100vh",width:"100%"}}>
            <div className="signup-card">
                <Card style={{backgroundColor: '#f6f6f6',borderTopLeftRadius:"40px",borderBottomRightRadius:"40px"}}>
                    <div className="main-container">
                        <div className="insta-picture">
                            <img src={Insta} alt="" />
                        </div>
                        <CardContent>
                            <Typography className={classes.text1} gutterBottom variant="h5" component="div">
                                Connect with your friends
                            </Typography>
                            {error!=="" && <Alert severity="error">{error}</Alert>}
                            <div className="input">
                                <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true} className={classes.input} size="small" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                            </div>
                            <div className="input">
                                <TextField
                                    id="outlined-password-input"
                                    label="Password"
                                    type="password"
                                    size="small"
                                    fullWidth={true}
                                    value={password} onChange={(e)=>setPassword(e.target.value)}
                                />
                            </div>
                            <div className="input" style={{ marginBottom: "10px" }}>
                                <TextField id="outlined-basic" label="Full Name" variant="outlined" fullWidth={true} className={classes.input} size="small" value={name} onChange={(e)=>setName(e.target.value)}/>
                            </div>

                            <Button variant="contained" fullWidth={true} size="small" style={{ backgroundColor: "rgb(88 93 88 / 70%)" }} component="label">Upload Your Image  <input type="file" accept="image/*" hidden onChange={(e)=>setFile(e.target.files[0])}/></Button>
                            <Button size="small" color="primary" style={{marginTop: "15px"}}fullWidth={true} variant="contained" disabled={loading} onClick={handleClick}>
                                Sign up
                            </Button>
                            <div className="login-option" style={{ marginTop: "10px",textAlign: "center",fontSize: "18px" }}>
                                Already Have An Account? <Link to="/login" style={{textDecoration:'none'}}>Login</Link>
                            </div>
                        </CardContent>
                    </div>
                </Card>
               
            </div>
        </div>
    );
}

