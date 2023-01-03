import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { removeUser } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'
import { Navbar, Nav, Button } from 'react-bootstrap'

const Navigation = () => {
  const user = useSelector((state) => state.user)
  const dispatch = useDispatch()

  const logout = () => {
    dispatch(removeUser())
  }

  const style = {
    background: 'lightgrey',
  }

  const navbarCustom = {
    backgroundColor: 'pink',
  }

  const styleButton = {
    marginLeft: 10,
  }

  return (
    <Navbar style={navbarCustom}>
      <Nav.Link to="/"> blogs </Nav.Link>
      <Nav.Link href="/users"> users </Nav.Link>
      {user.name} logged in
      <Button style={styleButton} onClick={logout}>
        logout
      </Button>
    </Navbar>
  )
}

export default Navigation
