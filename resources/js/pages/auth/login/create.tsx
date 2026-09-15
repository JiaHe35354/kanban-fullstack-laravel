import React from 'react';
import { useForm } from '@inertiajs/react';

import AuthLayout from '@/layouts/auth-layout';
import { store } from '@/actions/App/Http/Controllers/LoginController';
import { create } from '@/actions/App/Http/Controllers/RegisterController';
import { demo } from '@/actions/App/Http/Controllers/LoginController';
import AuthFooter from '@/components/auth/auth-footer';
import AuthInput from '@/components/auth/auth-input';

export default function Login() {
    const form = useForm({
        email: '',
        password: '',
    });

    const demoForm = useForm();

    const handleDemoLogin = () => {
        demoForm.post(demo().url);
    };

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
                        Log In
                    </h1>
                    <p className="text-[1.5rem] text-medium-grey">
                        Sign in to your account
                    </p>
                </div>

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
                    autoComplete="current-password"
                    value={form.data.password}
                    error={form.errors.password}
                    onChange={(value) => form.setData('password', value)}
                />

                <button
                    type="submit"
                    className="mt-2 btn btnPrimary text-[1.5rem] sm:mt-6"
                    disabled={form.processing}
                >
                    {form.processing ? 'Logging in...' : 'Log In'}
                </button>
            </form>

            <button
                type="button"
                className="mt-6 w-full btn bg-main-purple-10 text-[1.5rem] text-main-purple hover:bg-main-purple-25 disabled:cursor-not-allowed sm:mt-8"
                onClick={handleDemoLogin}
                disabled={demoForm.processing}
            >
                {demoForm.processing ? 'Loading Demo...' : 'Quick Demo'}
            </button>

            <AuthFooter
                question="Don't have an account?"
                linkText="Sign up"
                href={create().url}
            />
        </AuthLayout>
    );
}
