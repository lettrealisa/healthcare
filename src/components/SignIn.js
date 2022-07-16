import useAuth from "../hooks/useAuth"

const SignIn = () => {
    const { signIn } = useAuth()
    return <div><h1>Вход</h1><button onClick={() => signIn("john@gmail.com", "john1234")}>Вход</button></div>
}

export default SignIn