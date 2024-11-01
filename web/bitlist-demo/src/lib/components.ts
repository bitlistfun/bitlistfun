import { toast } from 'sonner';

export function SuccessToast(message: string) {
    return toast.success(message, {
        position: 'top-center',
        style: {
            fontSize: '24px',
        },
        duration: 1000,
    })
}
export function ErrorToast(message: string) {
    return toast.error(message, {
        position: 'top-center'
    })
}