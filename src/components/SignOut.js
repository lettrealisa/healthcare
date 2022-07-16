import useAuth from "../hooks/useAuth"

const SignOut = () => {
    const { signOut } = useAuth()
    return <div><h1>Выход</h1><button onClick={() => signOut()}>Выход</button></div>
}

export default SignOut