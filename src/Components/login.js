import * as React from 'react';
import { useContext,useState } from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import './login.css';
import { makeStyles } from '@mui/styles';
import Insta from '../assets/insta.png';
import TextField from '@mui/material/TextField';
import {Link,useNavigate} from  'react-router-dom';
import { AuthContext } from '../Context/AuthContext';
// import AddPhotoAlternateRoundedIcon from '@mui/icons-material/AddPhotoAlternateRounded';
export default function Login() {
    const store = useContext(AuthContext);
    console.log(store);
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
    const [error,setError] = useState('');
    const [loading,setLoading] = useState(false);
    const history = useNavigate();
    const {login} = useContext(AuthContext);

    const handleClick = async() => {
        try{
            setError('');
            setLoading(true)
            let res = await login(email,password);
            setLoading(false);
            history('/')
        }catch(err){
            setError(error);
            setTimeout(()=>{
                setError('')
            },2000);
            setLoading(false);
        }
    }
    return (
        <div className="loginwrap" style={{ height: '100vh',width: '100%' }}>
            <div className="login-card">
                <Card style={{backgroundColor: '#f6f6f6',borderTopLeftRadius:"40px",borderBottomRightRadius:"40px",height:"70%"}}>
                    <div className="main-container">
                        <div className="insta-picture">
                            <img src={Insta} alt="" />
                        </div>
                        <CardContent>
                            <div className="input">
                                <TextField id="outlined-basic" label="Email" variant="outlined" fullWidth={true} className={classes.input} size="small" value={email} onChange={(e)=>setEmail(e.target.value)}/>
                            </div>
                            <div className="input" style={{ marginBottom: "10px" }}>
                                <TextField
                                    id="outlined-password-input"
                                    label="Password"
                                    type="password"
                                    size="small"
                                    fullWidth={true}
                                    value={password} onChange={(e)=>setPassword(e.target.value)}
                                />
                            </div>
                            <Button size="small" color="primary" style={{marginTop: "15px"}}fullWidth={true} variant="contained" onClick={handleClick} disabled={loading}>
                                Login
                            </Button>
                            <div className="login-option" style={{ marginTop: "10px",textAlign: "center",fontSize: "18px" }}>
                                Don't Have An Account? <Link to="/signup" style={{textDecoration:'none'}}>Signup</Link>
                            </div>
                        </CardContent>
                    </div>
                </Card>   
            </div>
        </div>
    );
}
