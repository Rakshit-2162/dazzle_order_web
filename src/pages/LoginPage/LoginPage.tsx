import Navbar from '../../components/common/Navbar'
import { useNavigate } from 'react-router-dom'

function LoginPage() {
    const navigate = useNavigate();

  return (
    <>
        <Navbar buttons={[
            {label: 'Sign Up', onClick: () => navigate('/signup'), type: 'primary'}
        ]}/>
        Login Page
    </>
    
  )
}

export default LoginPage
