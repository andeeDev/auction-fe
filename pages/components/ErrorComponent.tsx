import React from 'react';

export default function ErrorComponent() {
    return <div className={'flex justify-center items-center h-screen'}>
        <div className={'text-lg font-medium'}>
            Some error occurred during fetching, try again later!
        </div>
    </div>;
}
