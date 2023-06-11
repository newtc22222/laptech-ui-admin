export { default as authService } from './auth/auth.service';

export { default as bannerService } from './banner.service';
// product platform
export { default as brandService } from './products/brand.service';
export { default as categoryService } from './products/category.service';
export {
  discountService,
  productDiscountService
} from './products/discount.service';
export { default as productImageService } from './products/image.service';
export { default as importProductService } from './products/importProduct.service';
export { labelService, productLabelService } from './products/label.service';
export {
  productService,
  productAccessoriesService
} from './products/product.service';

export { default as invoiceService } from './invoice.service';
export { roleService, userRoleService } from './role.service';
export { default as uploadService } from './upload.service';
export { default as userService } from './user.service';

// statistic
export { dashboardStatisticService } from './statistic';
