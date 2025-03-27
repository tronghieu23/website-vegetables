import React, { useState, useEffect, useRef } from 'react';
import { useParams } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Button,
  Divider,
  TextField,
  IconButton,
  LinearProgress,
} from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import AppBarComponent from '../../../../../Components/AppBar/AppBar';
import Footer from '../../../../../Components/Footer/Footer';
import { fetchOneProductsAPI, addToCartAPI } from '../../../../../apis';
import BestSellerProducts from './BestSellerProducts';

const ProductDetail = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [inputWidth, setInputWidth] = useState(50); // Default width for TextField
  const inputRef = useRef();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await fetchOneProductsAPI(productId);
        setProduct(data);
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [productId]);

  useEffect(() => {
    if (inputRef.current) {
      const inputLength = String(quantity).length;
      setInputWidth(Math.max(70, inputLength * 15)); // Chiều rộng tối thiểu là 70px
    }
  }, [quantity]);

  const addToCartHandler = async () => {
    try {
      await addToCartAPI(productId, quantity, localStorage.getItem('id'));
      alert('Đã thêm vào giỏ hàng');
    } catch (error) {
      console.error('Error adding to cart:', error);
      alert('Có lỗi xảy ra khi thêm vào giỏ hàng');
    }
  };

  if (!product) {
    return <Typography>Loading...</Typography>;
  }

  const calculateDiscountProgress = () => {
    const now = new Date();
    const discountEnd = new Date(product.discountExpiration);

    const discountStart = product.discountStartDate
      ? new Date(product.discountStartDate)
      : new Date(discountEnd.getTime() - 7 * 24 * 60 * 60 * 1000);

    if (now >= discountEnd) {
      return 0;
    }

    if (now < discountStart) {
      return 100;
    }

    const totalDuration = discountEnd - discountStart;
    const remainingDuration = discountEnd - now;

    const progressPercentage = (remainingDuration / totalDuration) * 100;
    return progressPercentage > 0 ? progressPercentage : 0;
  };

  const isExpired = (expiryDate) => {
    const now = new Date();
    const expiry = new Date(expiryDate);
    return now > expiry;
  };

  const discountExpired = product.discountExpiration && isExpired(product.discountExpiration);

  const displayPrice = discountExpired
    ? product.price
    : Math.round(product.price * (1 - product.discount / 100));

  return (
    <>
      <AppBarComponent />
      <Container sx={{ marginTop: 2 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardMedia
                component="img"
                alt={product.name}
                image={product.image}
                title={product.name}
                sx={{ objectFit: 'contain', height: '100%', width: '100%' }}
              />
            </Card>
            <Grid container spacing={1} sx={{ mt: 1 }}>
              {product.additionalImages?.map((img, index) => (
                <Grid item xs={3} key={index}>
                  <Card>
                    <CardMedia
                      component="img"
                      alt={`additional-${index}`}
                      image={img}
                      title={`additional-${index}`}
                      sx={{ objectFit: 'contain', height: '100%', width: '100%' }}
                    />
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Grid>
          <Grid item xs={12} md={6}>
            <CardContent>
              <Typography variant="h4" component="h1" sx={{ fontSize: '28px', fontWeight: 'bold' }}>
                {product.name}
              </Typography>
              <Typography variant="h6" sx={{ fontSize: '20px', color: '#f00' }}>
                {product.discount > 0 && !discountExpired ? (
                  <>
                    <span style={{ marginRight: '10px' }}>
                      {displayPrice.toLocaleString()}đ
                    </span>
                    <span style={{ textDecoration: 'line-through', color: '#999' }}>
                      {product.price.toLocaleString()}đ
                    </span>
                  </>
                ) : (
                  `${product.price.toLocaleString()}đ`
                )}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  marginTop: 2,
                  color: product.quantity > 0 ? '#7f7f7f' : '#f00',
                  fontWeight: 'bold',
                }}
              >
                {product.quantity > 0
                  ? `Còn lại: ${product.quantity} sản phẩm`
                  : 'Hết hàng'}
              </Typography>
              <Divider sx={{ marginY: 2 }} />
              {!discountExpired && product.discountExpiration && (
                <>
                  <Typography sx={{ marginY: 2, color: 'green' }}>
                    Còn lại {calculateDiscountProgress().toFixed(0)}% thời gian khuyến mãi
                  </Typography>
                  <LinearProgress
                    variant="determinate"
                    value={calculateDiscountProgress()}
                    sx={{
                      height: '10px',
                      borderRadius: '5px',
                      marginY: 2,
                      backgroundColor: '#e0e0e0',
                      '& .MuiLinearProgress-bar': {
                        backgroundColor: calculateDiscountProgress() > 50 ? '#4caf50' : '#ff4c4c',
                      },
                    }}
                  />
                </>
              )}
               <Box
              sx={{
                backgroundColor: '#f9f9f9',
                padding: 2,
                borderRadius: 2,
                boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                marginTop: 2,
              }}
            >
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 'bold',
                  fontSize: '18px',
                  color: '#008b4b',
                  display: 'flex',
                  alignItems: 'center',
                }}
              >
              
                Nhà cung cấp sản phẩm
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  marginTop: 1,
                  fontSize: '16px',
                  color: '#555',
                }}
              >
                Tên: <span style={{ fontWeight: 'bold', color: '#333' }}>{product.supplier.name}</span>
              </Typography>
              {product.supplier.address && (
                <Typography
                  variant="body2"
                  sx={{
                    marginTop: 0.5,
                    color: '#777',
                  }}
                >
                  Địa chỉ: {product.supplier.address}
                </Typography>
              )}
             
            </Box>

             
              <Divider sx={{ marginY: 2 }} />
              <Typography variant="body1" sx={{ marginBottom: 2 }}>
                {product.description}
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', marginBottom: 2 }}>
                <IconButton onClick={() => setQuantity(quantity > 1 ? quantity - 1 : 1)}>
                  <Remove />
                </IconButton>
                <TextField
                    value={quantity}
                    onChange={(e) => {
                      // Chỉ cho phép nhập số nguyên dương
                      const inputValue = e.target.value;

                      // Kiểm tra nếu giá trị nhập vào là số nguyên dương
                      if (/^\d+$/.test(inputValue)) {
                        setQuantity(Math.max(1, Number(inputValue)));
                      }
                    }}
                    inputRef={inputRef}
                    sx={{
                      minWidth: '70px', // Đặt chiều rộng tối thiểu
                      width: `${inputWidth}px`, // Chiều rộng thay đổi theo nội dung
                      mx: 1,
                      '& input': {
                        textAlign: 'center',
                      },
                    }}
                  />

                <IconButton
                  onClick={() =>
                    setQuantity((prevQuantity) => prevQuantity + 1)
                  }
                >
                  <Add />
                </IconButton>
              </Box>
              <Button
                variant="contained"
                sx={{ backgroundColor: '#008b4b', color: '#fff', marginRight: 1 }}
                onClick={addToCartHandler}
              >
                Thêm vào giỏ
              </Button>
            </CardContent>
          </Grid>
        </Grid>
        <BestSellerProducts />
      </Container>
      <Footer />
    </>
  );
};

export default ProductDetail;
