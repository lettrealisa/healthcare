import { Grid } from "@mui/material";
import useAuth from "../hooks/useAuth"

const SignUp = () => {
    const { signUp } = useAuth()
    return (
        <>
        <Grid container spacing={2} style={{ background: 'hotpink'}}>
            <Grid item xs={12} md={6}>
                <div>Item</div>
            </Grid>
        </Grid>
        <div>
            <h1>Регистрация</h1>
            <form>
                <input type="text"></input>
                <input type="text"></input>
                <button onClick={() => signUp("john@gmail.com", "john1234")}>Регистрация</button>
            </form>
        </div></>);
}

export default SignUp