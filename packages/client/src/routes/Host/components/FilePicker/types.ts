export interface FilePickerProps {
    onChange: (value: string) => void;
    value?: string;
    error?: boolean;
}
