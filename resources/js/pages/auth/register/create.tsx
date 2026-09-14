import { useForm } from '@inertiajs/react';

import AuthLayout from '@/layouts/auth-layout';
import { store } from '@/actions/App/Http/Controllers/RegisterController';
import React from 'react';

export default function Register() {
    const form = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const handleSubtmit = (e: React.SubmitEvent) => {
        e.preventDefault();

        form.post(store().url);
    };

    return (
        <AuthLayout>
            <form
                className="flex flex-col gap-[1.8rem]"
                onSubmit={handleSubtmit}
            >
                <div className="mb-2">
                    <h1 className="mb-2 text-[2.6rem] font-bold text-black">
                        Register
                    </h1>
                    <p className="text-[1.5rem] text-medium-grey">
                        Create a new account to get started
                    </p>
                </div>

                <div className="formControl">
                    <label htmlFor="name" className="authLabel">
                        User Name
                    </label>

                    <div className="inputWrapper">
                        <input
                            className="formInput"
                            id="name"
                            type="text"
                            autoComplete="name"
                            value={form.data.name}
                            onChange={(e) =>
                                form.setData('name', e.target.value)
                            }
                        />

                        {form.errors.name && (
                            <p className="errorText">{form.errors.name}</p>
                        )}
                    </div>
                </div>

                <div className="formControl">
                    <label htmlFor="email" className="authLabel">
                        Email
                    </label>

                    <div className="inputWrapper">
                        <input
                            className="formInput"
                            id="email"
                            type="email"
                            autoComplete="email"
                            value={form.data.email}
                            onChange={(e) =>
                                form.setData('email', e.target.value)
                            }
                        />
                        {form.errors.email && (
                            <p className="errorText">{form.errors.email}</p>
                        )}
                    </div>
                </div>

                <div className="formControl">
                    <label htmlFor="password" className="authLabel">
                        Password
                    </label>

                    <div className="inputWrapper">
                        <input
                            className="formInput"
                            id="password"
                            type="password"
                            autoComplete="new-password"
                            value={form.data.password}
                            onChange={(e) =>
                                form.setData('password', e.target.value)
                            }
                        />
                        {form.errors.password && (
                            <p className="errorText">{form.errors.password}</p>
                        )}
                    </div>
                </div>

                <div className="formControl">
                    <label
                        htmlFor="password-confirmation"
                        className="authLabel"
                    >
                        Confirm Password
                    </label>

                    <div className="inputWrapper">
                        <input
                            className="formInput"
                            id="password-confirmation"
                            type="password"
                            value={form.data.password_confirmation}
                            onChange={(e) =>
                                form.setData(
                                    'password_confirmation',
                                    e.target.value,
                                )
                            }
                        />
                        {form.errors.password_confirmation && (
                            <p className="errorText">
                                {form.errors.password_confirmation}
                            </p>
                        )}
                    </div>
                </div>

                <button
                    type="submit"
                    className="mt-2 btn btnPrimary text-[1.5rem] sm:mt-6"
                    disabled={form.processing}
                >
                    {form.processing ? 'Creating Account...' : 'Create Account'}
                </button>
            </form>

            <button
                type="button"
                className="mt-6 w-full btn btnSecondary text-[1.5rem] sm:mt-8"
            >
                Quick Demo
            </button>

            <p className="mt-8 text-center text-[1.5rem] text-medium-grey">
                Have an account?{' '}
                <button
                    className="hover:color-purple-hover focus:color-purple-hover cursor-pointer border-none bg-transparent font-bold text-main-purple transition-all hover:underline focus:underline focus:outline-none"
                    type="button"
                >
                    Log in
                </button>
            </p>
        </AuthLayout>
    );
}
