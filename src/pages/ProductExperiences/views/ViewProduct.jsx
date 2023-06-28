import React, { useEffect, useState } from 'react';
import { Card, Carousel, Modal, Tabs, Tab } from 'react-bootstrap';

import { Loading } from '../../../components/common';
import { productService } from '../../../services';
import content from '../content';
import { getCurrencyString } from '../../../utils';

const ViewProduct = ({ product, handleChangeViewMode, ...rest }) => {
  const [productDetails, setProductDetails] = useState({ product: product });

  useEffect(() => {
    if (product) {
      console.log(product);
      productService
        .getProductDetail(product.id)
        .then(data => {
          const information = { ...data };
          information.product['specifications'] = data.product.specifications
            ? JSON.parse(data.product.specifications)
            : [];
          information.product['descriptionDetail'] = data.product
            .descriptionDetail
            ? JSON.parse(data.product.descriptionDetail)
            : [];
          setProductDetails(information);
        })
        .catch(err => console.log(err));
    }
  }, [product]);

  return (
    <Modal show onHide={handleChangeViewMode} className="modal-xl">
      {productDetails.imageList ? (
        <>
          <Modal.Header closeButton>
            <Modal.Title>{productDetails.product.id}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div className="d-flex justify-content-center my-2">
              <Carousel className="w-75 border" variant="dark">
                {productDetails.imageList.map(image => {
                  return (
                    <Carousel.Item key={image.id}>
                      <img
                        className="rounded mx-auto d-block"
                        alt={image.id}
                        src={image.url}
                      />
                      <Carousel.Caption>
                        <h5 className="text-danger">{image.type}</h5>
                      </Carousel.Caption>
                    </Carousel.Item>
                  );
                })}
              </Carousel>
            </div>
            <div className="mx-3 mt-2">
              {/* BASIC INFORMATION */}
              <h5 className="text-primary">{productDetails.product.name}</h5>
              <p>
                {content.view.product.brand + ': ' + productDetails.brandName}
              </p>
              <p>
                {content.view.product.category +
                  ': ' +
                  productDetails.categoryName}
              </p>
              <p className="fw-bold">
                {content.view.product.listedPrice +
                  ': ' +
                  getCurrencyString(
                    productDetails.product.listedPrice,
                    'vi-VN',
                    'VND'
                  )}
              </p>
              <p className="fw-bold text-success">
                {content.view.product.currentPrice +
                  ': ' +
                  getCurrencyString(
                    productDetails.discountPrice,
                    'vi-VN',
                    'VND'
                  )}
              </p>
              {/* Labels */}
              <Card>
                <Card.Header className="text-uppercase">
                  {content.view.product.label}
                </Card.Header>
                <Card.Body className="d-flex flex-row gap-2">
                  {productDetails.labelList.map((label, idx) => (
                    <div
                      className="border rounded py-2 px-2"
                      title={label.title}
                      key={idx}
                    >
                      <span
                        dangerouslySetInnerHTML={{ __html: label.icon }}
                      ></span>
                      <span className="ms-2">{label.name}</span>
                    </div>
                  ))}
                </Card.Body>
              </Card>
              {/* Specifications */}
              {productDetails.product.specifications && (
                <table className="table my-3">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col" className="text-uppercase">
                        {content.view.product.attribute}
                      </th>
                      <th scope="col" className="text-uppercase">
                        {content.view.product.value}
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {productDetails.product.specifications.map((item, idx) => {
                      return (
                        <tr key={idx + 1}>
                          <th scope="row">{idx}</th>
                          <td>{item.attribute}</td>
                          <td>{item.value}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              )}
              {/* Decription detail */}
              <Tabs className="my-3">
                {productDetails.product.descriptionDetail.map(item => {
                  return (
                    <Tab eventKey={item.id} title={item.title} key={item.id}>
                      <div
                        dangerouslySetInnerHTML={{ __html: item.content }}
                      ></div>
                    </Tab>
                  );
                })}
              </Tabs>
            </div>
          </Modal.Body>
        </>
      ) : (
        <Loading />
      )}
    </Modal>
  );
};

export default ViewProduct;
