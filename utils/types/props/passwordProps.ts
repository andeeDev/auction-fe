import { ChangeEvent, ReactNode } from 'react';
import { IPasswordData } from '../types';

export interface GenericPasswordComponentProps {
    styles: string;
    labelStyles: string;
    formData: IPasswordData;
    handleInputData: (input: string) => (e: ChangeEvent<HTMLInputElement>) => void;
}

export interface SendCodeStepProps extends GenericPasswordComponentProps {
    onSuccess: () => void;
}

export interface ExportTokenProps extends GenericPasswordComponentProps {
    setToken: (value: string) => void;
    onSuccess: () => void;
    children: ReactNode;
}

export interface ResetPasswordStepProps extends GenericPasswordComponentProps {
    children: ReactNode;
}