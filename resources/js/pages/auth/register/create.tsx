import React from 'react';
import { useForm } from '@inertiajs/react';

import AuthLayout from '@/layouts/auth-layout';
import { store } from '@/actions/App/Http/Controllers/RegisterController';
import { create } from '@/actions/App/Http/Controllers/LoginController';
import AuthFooter from '@/components/auth/auth-footer';
import AuthInput from '@/components/auth/auth-input';

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

                <AuthInput
                    id="name"
                    label="Name"
                    type="name"
                    autoComplete="name"
                    value={form.data.name}
                    error={form.errors.name}
                    onChange={(value) => form.setData('name', value)}
                />

                <AuthInput
                    id="email"
                    label="Email"
                    type="email"
                    autoComplete="email"
                    value={form.data.email}
                    error={form.errors.email}
                    onChange={(value) => form.setData('email', value)}
                />

                <AuthInput
                    id="password"
                    label="Password"
                    type="password"
                    autoComplete="new-password"
                    value={form.data.password}
                    error={form.errors.password}
                    onChange={(value) => form.setData('password', value)}
                />

                <AuthInput
                    id="password-confirmation"
                    label="Confirm Password"
                    type="password"
                    value={form.data.password_confirmation}
                    error={form.errors.password_confirmation}
                    onChange={(value) =>
                        form.setData('password_confirmation', value)
                    }
                />

                <button
                    type="submit"
                    className="authBtn"
                    disabled={form.processing}
                >
                    {form.processing ? 'Creating Account...' : 'Create Account'}
                </button>
            </form>

            <AuthFooter
                question="Have an account?"
                linkText="Log in"
                href={create().url}
            />
        </AuthLayout>
    );
}
