import React from 'react';
import { connect } from 'react-redux';
import { useNavigate } from 'react-router'
import { initialiazeUsername as setUsername } from '../../actions/message-actions';
import './styles/style.css'
let num = 1

const Login = ({setUsername}) => {

    const navigate = useNavigate()

    return (
        <form className='username' onSubmit={(e) => {
          e.preventDefault();
          setUsername(`${Math.floor(Math.random() * 9)} - jim`)
          navigate('/chat')

        }}>
        <input type='text' placeholder="username" />
        <button type='submit'>Submit</button>
      </form>
      )
}



const mapDispatchToProps = (dispatch, route) => {
  return {
    setUsername: (username) => dispatch(setUsername(username, route))
  }

}


export default connect( null, mapDispatchToProps )( Login );
