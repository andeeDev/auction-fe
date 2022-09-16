import React from 'react';

export default function ErrorComponent() {
    return <div className={'flex h-screen items-center justify-center'}>
        <div className={'text-lg font-medium'}>
            Some error occurred during fetching, try again later!
        </div>
    </div>;
}
