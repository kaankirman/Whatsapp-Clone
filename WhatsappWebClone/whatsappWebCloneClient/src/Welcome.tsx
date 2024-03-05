import { useState } from 'react';
import { styles } from './assets/welcomeStyles';
import backgroundGif from './assets/media/WelcomeBg.mp4';

const Welcome = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [signUpClick, setSignUpClick] = useState(false);
    const [passwordCheck, setPasswordCheck] = useState('');
    const serverUrl = import.meta.env.VITE_BASE_URL;

    const handleLogin = async () => {
        setSignUpClick(false);
        if (email != "" && password != "") {
            const response = await fetch(`${serverUrl}/login`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });
            const data = await response.json();
            window.location.reload();
        }
    };

    const handleSignUp = async () => {
        setSignUpClick(true);
        if (email != "" && password == passwordCheck && password !== "" && password !== null && signUpClick == true) {
            /* send signup info to database */
            const response = await fetch(`${serverUrl}/signup`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    email: email,
                    password: password,
                }),
            });
            const data = await response.json();
            window.location.reload();
        }
    };

    return (
        <div style={{ ...styles.content }}>
          <video src={backgroundGif} autoPlay muted loop style={styles.backgroundVideo} />
            <div style={styles.cardDiv}>
                <h1 style={{ ...styles.logo }} onClick={() => window.location.reload()}>Get2Connect</h1>
                <div style={{ ...styles.textField }}>
                    <input style={styles.textInput} placeholder="e-mail"
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div style={styles.textField}>
                    <input style={styles.textInput} placeholder="password"
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                {signUpClick &&
                    <div style={styles.textField}>
                        <input style={styles.textInput} placeholder="re-enter password"
                            type="password"
                            value={passwordCheck}
                            onChange={(e) => setPasswordCheck(e.target.value)}
                        />
                    </div>}
                <div style={{ ...styles.buttonField }}>
                    {!signUpClick ? (<button style={styles.button} onClick={handleLogin}>Login</button>) : null}
                    {signUpClick ? (<button style={styles.button} onClick={handleSignUp}>Sign Up</button>) : null}
                    {!signUpClick ? (<div style={{ alignSelf: "center" }}><p style={styles.signUpParagraph}>
                        Don't have an account?{''}
                        <button style={styles.signUpButton} onClick={handleSignUp}>
                            Sign up
                        </button>
                    </p></div>) : null}
                </div>
            </div>
        </div>
    );
};

export default Welcome;

