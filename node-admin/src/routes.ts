import express, { Router } from 'express';
import {
  AuthenticatedUser,
  Login,
  Logout,
  Register,
  UpdateInfo,
  UpdatePassword,
} from './controller/auth.controller';
import {
  CreateUser,
  DeleteUser,
  GetUser,
  UpdateUser,
  Users,
} from './controller/user.controller';

import { Permissions } from './controller/permission.controller';
import { AuthMiddleware } from './middleware/auth.middleware';
import {
  CreateRole,
  GetRole,
  Roles,
  UpdateRole,
  DeleteRole,
} from './controller/role.controller';
import {
  Products,
  CreateProduct,
  GetProduct,
  DeleteProduct,
  UpdateProduct,
} from './controller/product.controller';
import { Upload } from './controller/image.controller';
import { Chart, Export, Orders } from './controller/order.controller';
import { PermissionMiddleware } from './middleware/permission.middleware';

export const routes = (router: Router) => {
  router.post('/api/register', Register);
  router.post('/api/login', Login);
  router.get('/api/user', AuthMiddleware, AuthenticatedUser);
  router.post('/api/logout', AuthMiddleware, Logout);
  router.put('/api/users/info', AuthMiddleware, UpdateInfo);
  router.put('/api/users/password', AuthMiddleware, UpdatePassword);

  /*********************************************************************/
  //USERS
  router.get(
    '/api/users',
    AuthMiddleware,
    PermissionMiddleware('users'),
    Users
  );
  router.post(
    '/api/users',
    AuthMiddleware,
    PermissionMiddleware('users'),
    CreateUser
  );
  router.get(
    '/api/users/:id',
    AuthMiddleware,
    PermissionMiddleware('users'),
    GetUser
  );
  router.put(
    '/api/users/:id',
    AuthMiddleware,
    PermissionMiddleware('users'),
    UpdateUser
  );
  router.delete(
    '/api/users/:id',
    AuthMiddleware,
    PermissionMiddleware('users'),
    DeleteUser
  );

  /*********************************************************************/
  //PERMISSIONS
  router.get('/api/permissions', AuthMiddleware, Permissions);

  router.get(
    '/api/roles',
    AuthMiddleware,
    PermissionMiddleware('roles'),
    Roles
  );
  router.post(
    '/api/roles',
    AuthMiddleware,
    PermissionMiddleware('roles'),
    CreateRole
  );
  router.get(
    '/api/roles/:id',
    AuthMiddleware,
    PermissionMiddleware('roles'),
    GetRole
  );
  router.put(
    '/api/roles/:id',
    AuthMiddleware,
    PermissionMiddleware('roles'),
    UpdateRole
  );
  router.delete(
    '/api/roles/:id',
    AuthMiddleware,
    PermissionMiddleware('roles'),
    DeleteRole
  );

  /*********************************************************************/
  //PRODUCTS
  router.get(
    '/api/products',
    AuthMiddleware,
    PermissionMiddleware('products'),
    Products
  );
  router.post(
    '/api/products',
    AuthMiddleware,
    PermissionMiddleware('products'),
    CreateProduct
  );
  router.get(
    '/api/products/:id',
    AuthMiddleware,
    PermissionMiddleware('products'),
    GetProduct
  );
  router.put(
    '/api/products/:id',
    AuthMiddleware,
    PermissionMiddleware('products'),
    UpdateProduct
  );
  router.delete(
    '/api/products/:id',
    AuthMiddleware,
    PermissionMiddleware('products'),
    DeleteProduct
  );

  /*********************************************************************/
  //UPLOADS
  router.post('/api/upload', AuthMiddleware, Upload);
  router.use('/api/uploads', express.static('./uploads'));

  /*********************************************************************/
  //ORDERS/EXPORT/CHART
  router.get('/api/orders', AuthMiddleware, Orders);
  router.post('/api/export', AuthMiddleware, Export);
  router.get('/api/chart', AuthMiddleware, Chart);
};
