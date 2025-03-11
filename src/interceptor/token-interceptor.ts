import { HttpInterceptorFn } from '@angular/common/http';
export const TokenInterceptor: HttpInterceptorFn = (req, next) => {
    const token = sessionStorage.getItem('authToken');
    if (token) {
        const clonedReq = req.clone({
            setHeaders: {
                Authorization: `Bearer ${token}`
            }
        });
        return next(clonedReq);
    }
    return next(req);
};

