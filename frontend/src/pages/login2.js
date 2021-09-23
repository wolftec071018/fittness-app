import React from 'react';
import { Link, useHistory } from 'react-router-dom';
// local
import AuthService from "../services/auth.service";

function Login() {

    const history = useHistory();

    function handleFormSubmit(ev) {
        ev.preventDefault();

        let email = ev.target.elements.email?.value;
        let password = ev.target.elements.password?.value;

        // easier and on success the token
        // gets stored in the local storage for later use
        return AuthService.login(email, password).then(
            res => {
                if (res.role === 'trainer') {
                    history.push('/TrainerDashboard');
                    window.location.reload();
                }
                else {
                    history.push('/AthleteDashboard');
                    window.location.reload();
                }
            },
            err => {
                console.log(err.message)
                window.alert(err.message);
            }
        );
    }

    // 'https://res.cloudinary.com/dzrmczt5b/image/upload/v1620668346/frontend/gym_lncktp.jpg'
    return (
        <div className='h-screen flex' style={{ backgroundImage: `url(./gym2.jpg)` }}>
            <div className='w-full max-w-md m-auto bg-white rounded-lg border border-primaryBorder shadow-default py-10 px-16'>
                <h1 className='text-2xl font-medium text-primary mt-4 mb-12 text-center'>
                    Log in to your account
                </h1>
                <hr/>

                <form onSubmit={handleFormSubmit}>
                    <div>
                        <label htmlFor='email'>Email</label>
                        <input
                            type='email'
                            className={`w-full p-2 border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                            id='email'
                            placeholder='Your Email'
                        />
                    </div>
                    <div>
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            className={`w-full p-2  border rounded-md outline-none text-sm transition duration-150 ease-in-out mb-4`}
                            id='password'
                            placeholder='Your Password'
                        />
                    </div>

                    <div className='flex justify-center items-center mt-6'>
                        <button
                            className={`bg-primary btn-lg text-white py-2 px-4 text-sm rounded border border-green focus:outline-none focus:border-green-dark`}
                        >
                            Login
                        </button>
                    </div>
                    <div className='mt-3'>
                        <small>Or register here <Link to='/SignUp'>Sign up</Link></small>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;