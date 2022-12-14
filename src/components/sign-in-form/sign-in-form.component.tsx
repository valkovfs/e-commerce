import { useState, FormEvent, ChangeEvent } from 'react';
import { useDispatch } from 'react-redux';
import { AuthError, AuthErrorCodes } from 'firebase/auth';
import FormInput from '../form-input/form-input.component';
import Button, { BUTTON_TYPES_CLASSES } from '../button/button.component';

import {
  signInAuthUserWithEmailAndPassword,
  sighInWithGooglePopup
} from '../../utils/firebase.utils';

import { googleSignInStart, emailSignInStart } from '../../store/user/user.action';

import { ButtonsContainer, SignInContainer } from './sign-in-form.styles';

const defaultFormFields = {
  email: '',
  password: '',
}

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { email, password } = formFields
  const dispatch = useDispatch();

  const resetFormFields = () => {
    setFormFields(defaultFormFields)
  };

  const signInWithGoogle = async () => {
    dispatch(googleSignInStart())
  }


  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      dispatch(emailSignInStart(email, password))
      resetFormFields()
    } catch (error) {
     if ((error as AuthError).code === AuthErrorCodes.INVALID_PASSWORD) {
       alert('Wrong password')
       console.log(error)
     }
    }
  }

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setFormFields({ ...formFields, [name]: value });
  }

  return (
    <SignInContainer>
      <h2> Already have an account?</h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          name="email"
          value={email}/>
        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          name="password"
          value={password}
        />
        <ButtonsContainer>
          <Button type="submit">Sign In</Button>
          <Button
            type="button"
            buttonType={BUTTON_TYPES_CLASSES.google}
            onClick={signInWithGoogle}
          >Google sign in</Button>
        </ButtonsContainer>
      </form>
    </SignInContainer>
  )
}

export default SignInForm;