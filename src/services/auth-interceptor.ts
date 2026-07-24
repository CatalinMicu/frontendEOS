import { HttpInterceptorFn } from '@angular/common/http';
import { LocalStorageUtils } from '../utils/local-storage-utils';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.includes('/login') || req.url.includes('/register')) {
    return next(req);
  }

  if (!LocalStorageUtils.getItem(LocalStorageUtils.tokenKey)) {
    return next(req);
  }

  return next(
    req.clone({
      setHeaders: {
        Authorization: `Bearer ${LocalStorageUtils.getItem(LocalStorageUtils.tokenKey)}`,
      },
    }),
  );
};
