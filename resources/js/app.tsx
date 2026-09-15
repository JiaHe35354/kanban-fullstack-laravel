import '../css/app.css';

import { createInertiaApp } from '@inertiajs/react';
import { resolvePageComponent } from 'laravel-vite-plugin/inertia-helpers';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { ThemeProvider } from './contexts/theme-context';

const appName = import.meta.env.VITE_APP_NAME || 'Kanban App';

createInertiaApp({
    title: (title) => (title ? `${title} - ${appName}` : appName),
    resolve: (name) =>
        resolvePageComponent(
            `./pages/${name}.tsx`,
            import.meta.glob('./pages/**/*.tsx'),
        ),
    setup({ el, App, props }) {
        if (import.meta.env.SSR) {
            return <App {...props} />;
        }

        if (el) {
            if (el.hasChildNodes()) {
                hydrateRoot(el, <App {...props} />);
            } else {
                createRoot(el).render(
                    <ThemeProvider>
                        <App {...props} />
                    </ThemeProvider>,
                );
            }
        }
    },
    progress: {
        color: '#4B5563',
    },
});
