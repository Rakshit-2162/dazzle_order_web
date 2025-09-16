import Navbar from '../../components/common/Navbar'
import { useNavigate } from 'react-router-dom'

function SignUpPage() {
    const navigate = useNavigate();

  return (
    <>
      <Navbar buttons={[
        {label: 'Login', onClick: () => navigate('/login'), type: 'primary'}
      ]}/>
      Sign Up Page
    </>
  )
}

export default SignUpPage
