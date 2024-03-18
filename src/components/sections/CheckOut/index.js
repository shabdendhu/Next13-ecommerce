"use client";
import { apiGet, apiPost, apiPut } from "@/helpers/api";
import { openOtpModal } from "@/redux/auth/auth";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { useSession } from "next-auth/react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PageWrapper from "../PageWrapper";
import styles from "./Checkout.module.scss";
import PayNowButton from "@/components/sections//PayNowButton";
import { useSnackbar } from "@/hooks/useSnakBar";

const initialAddress = {
  name: "",
  locality: "",
  mobile: "",
  pincode: "",
  city: "",
  landmark: "",
  address: "",
  alternateMobileNumber: "",
  locationType: "",
};
function calculateTotal(items) {
  let totalPrice = 0;
  let totalDiscount = 0;

  // Calculate total price and discount for each item
  items.forEach((item) => {
    const price = item.product.price * item.quantity;
    const discount = (price * item.product.discount) / 100;

    totalPrice += price;
    totalDiscount += discount;
  });

  // Calculate total after discount
  const totalAfterDiscount = totalPrice - totalDiscount;

  return {
    totalPrice: totalPrice,
    totalDiscount: totalDiscount,
    totalAfterDiscount: totalAfterDiscount,
  };
}

const CheckoutComponent = () => {
  const [step, setStep] = useState(1);
  const [addresses, setAddresses] = useState([]);
  const [userDetails, setUserDetails] = useState({ mobile: "" });
  const [address, setAddress] = useState(initialAddress);
  const { openSnackbar } = useSnackbar();
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const basketItems = useSelector((state) => state.basket);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [openAddressForm, setOpenAddressForm] = useState(false);
  const [orderDetails, setorderDetails] = useState({});
  const [showVarifyMobileCard, setShowVarifyMobileCard] = useState(false);
  const [basket, setBasket] = useState([]);
  const priceingDetails = calculateTotal(basket);
  const onChangeAddress = (e) =>
    setAddress({ ...address, [e.target.name]: e.target.value });
  const handleChangeAccount = () => {
    try {
      dispatch(openOtpModal());
    } catch (error) {
      console.error(error);
    }
  };
  const handleSaveAddress = () => {
    try {
      apiPost(
        "/api/address",
        {
          userId: session?.user?.id,
          addressData: address,
        },
        openSnackbar
      ).then((e) => {
        if (e.success) {
          getUserDetailsById();
          setOpenAddressForm(false);
        }
      });
    } catch (error) {
      console.error(error);
    }
  };
  const handleClickOpenAddressForm = () => {
    setOpenAddressForm(!openAddressForm);
  };
  const nextStep = () => {
    setStep(step + 1);
  };
  const backStep = () => {
    setStep(step - 1);
  };
  const handleClickConfirmOrder = () => {
    nextStep();
  };

  const getUserDetailsById = () => {
    apiGet("/api/user/" + session?.user?.id, {}, openSnackbar).then((res) => {
      if (res.success) {
        if (!res?.data?.mobile?.length) setShowVarifyMobileCard(true);
        setUserDetails(res.data);
        setAddresses(res?.data?.profile?.addresses);
      }
    });
  };
  const updateUserMobileNumber = () => {
    // Regular expression to validate mobile number
    const mobileRegex = /^(\+91)?[6-9]\d{9}$/;

    // Check if mobile number is valid
    if (!mobileRegex.test(userDetails.mobile))
      return alert("Please provide a valid 10-digit mobile number");

    // If mobile number is valid, make API call
    apiPut(
      "/api/user/" + session?.user?.id,
      {
        mobile: userDetails.mobile,
      },
      openSnackbar
    ).then((res) => {
      if (res.success) {
        setShowVarifyMobileCard(false);
        getUserDetailsById();
      }
    });
  };
  const confirmOrder = async () => {
    try {
      apiPost(
        "/api/order",
        {
          user: session?.user?.id,
          productIds: searchParams.get("checkoutItems").split(","),
        },
        openSnackbar
      ).then((e) => {
        if (e.success) nextStep();
        setorderDetails(e.data);
      });
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    if (session) getUserDetailsById();
  }, [session]);
  const handelClickAddressSelected = () => {
    if (!selectedAddress) return alert("Please select an address");
    nextStep();
  };
  useEffect(() => {
    setBasket(
      basketItems.items.filter((i) =>
        searchParams.get("checkoutItems").split(",").includes(i.product._id)
      )
    );
    // console.log(
    //   basketItems.items.filter((i) =>
    //     searchParams.get("checkoutItems").split(",").includes(i.product._id)
    //   )
    // );
  }, [searchParams.get("checkoutItems"), basketItems]);
  return (
    <PageWrapper>
      <div className={styles.component}>
        <Accordion expanded={step == 1}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            style={{
              backgroundColor: "whitesmoke",
              borderRadius: "5px",
            }}
          >
            <Typography
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              Profile Details
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            style={{ display: "flex", gap: "10px", flexDirection: "column" }}
          >
            <div
              style={{ display: "flex", gap: "5px", flexDirection: "column" }}
            >
              <div>Name: {userDetails?.profile?.name}</div>
              <div>Email: {userDetails.email}</div>

              {showVarifyMobileCard ? (
                <Card
                  style={{
                    padding: "10px",
                    backgroundColor: "whitesmoke",
                    width: "fit-content",
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <div>Verify Mobile: </div>
                  <TextField
                    id="outlined-multiline-flexible"
                    label="10-Digit Mobile Number"
                    multiline
                    sx={{ minWidth: "300px", marginTop: "10px" }}
                    maxRows={4}
                    size="small"
                    type="number"
                    name="mobile"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">+91 </InputAdornment>
                      ),
                    }}
                    value={userDetails.mobile}
                    onChange={(event) =>
                      setUserDetails({
                        ...userDetails,
                        mobile: event.target.value,
                      })
                    }
                  />
                  <Button
                    onClick={updateUserMobileNumber}
                    style={{
                      backgroundColor: "blue",
                      color: "white",
                      marginTop: "10px",
                    }}
                  >
                    Save Mobile Number
                  </Button>
                </Card>
              ) : (
                <div>Mobile:+91 {userDetails.mobile}</div>
              )}
            </div>
            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                width: "100%",
                gap: "10px",
              }}
            >
              <Button
                onClick={handleChangeAccount}
                style={{ backgroundColor: "blue", color: "white" }}
              >
                Change
              </Button>
              <Button
                disabled={!userDetails?.mobile}
                onClick={nextStep}
                style={{
                  backgroundColor: !userDetails?.mobile ? "gray" : "blue",
                  color: "white",
                }}
              >
                Confirm
              </Button>
            </div>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={step == 2}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            style={{
              backgroundColor: "whitesmoke",
              borderRadius: "5px",
            }}
          >
            {step == 2 ? (
              <IconButton onClick={backStep}>
                <ArrowBackIcon />
              </IconButton>
            ) : (
              <></>
            )}
            <Typography
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              Delivery Address
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}
          >
            {addresses.length ? (
              <div className={styles.addressList}>
                {addresses.map((e) => (
                  <div key={e._id} className={styles.address}>
                    <Radio
                      checked={selectedAddress?._id == e._id}
                      onChange={(event) => setSelectedAddress(e)}
                    />

                    <div className={styles.addressDetails}>
                      <div className={styles.addressLineone}>
                        {e.name}
                        <Chip label={e.locationType} />
                        <b>{e.mobile}</b>
                      </div>
                      <div>
                        {e.landmark},{e.locality},{e.city},{e.pincode}
                      </div>
                    </div>
                  </div>
                ))}
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginTop: "20px",
                  }}
                >
                  <Button
                    onClick={handleClickOpenAddressForm}
                    className={styles.addNewAddressButton}
                  >
                    Add Other Address
                  </Button>
                  <Button
                    onClick={handelClickAddressSelected}
                    className={styles.addNewAddressButton}
                  >
                    Save And Continiue
                  </Button>
                </div>
              </div>
            ) : (
              <></>
            )}
            {openAddressForm || !addresses.length ? (
              <>
                <div className={styles.addressForm}>
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Name"
                    multiline
                    sx={{ minWidth: "300px" }}
                    maxRows={4}
                    size="small"
                    type="number"
                    name="name"
                    value={address.name}
                    onChange={onChangeAddress}
                  />
                  <TextField
                    id="outlined-multiline-flexible"
                    label="10-Digit Mobile Number"
                    multiline
                    sx={{ minWidth: "300px" }}
                    maxRows={4}
                    size="small"
                    type="number"
                    name="mobile"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">+91 </InputAdornment>
                      ),
                    }}
                    onChange={onChangeAddress}
                  />
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Pincode"
                    multiline
                    sx={{ minWidth: "300px" }}
                    maxRows={4}
                    size="small"
                    type="number"
                    name="pincode"
                    onChange={onChangeAddress}
                  />
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Locality"
                    multiline
                    sx={{ minWidth: "300px" }}
                    maxRows={4}
                    size="small"
                    name="locality"
                    onChange={onChangeAddress}
                  />
                  <TextField
                    id="outlined-multiline-flexible"
                    label="City"
                    multiline
                    sx={{ minWidth: "300px" }}
                    maxRows={4}
                    size="small"
                    name="city"
                    onChange={onChangeAddress}
                  />
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Landmark"
                    multiline
                    sx={{ minWidth: "300px" }}
                    maxRows={4}
                    size="small"
                    name="landmark"
                    onChange={onChangeAddress}
                  />
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Address (Area and Street)"
                    multiline
                    fullWidth
                    sx={{ minWidth: "300px" }}
                    maxRows={4}
                    size="small"
                    name="address"
                    onChange={onChangeAddress}
                  />
                  {/* <Autocomplete
                    disablePortal
                    size="small"
                    id="combo-box-demo"
                    options={[
                      { label: "The Shawshank Redemption", year: 1994 },
                      { label: "The Godfather", year: 1972 },
                      { label: "The Godfather: Part II", year: 1974 },
                      { label: "The Dark Knight", year: 2008 },
                      { label: "12 Angry Men", year: 1957 },
                    ]}
                    onChange={(e) => console.log(e.target.value)}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} label="Movie" />
                    )}
                  /> */}
                  <TextField
                    id="outlined-multiline-flexible"
                    label="Alternate Mobile Number"
                    multiline
                    sx={{ minWidth: "300px" }}
                    maxRows={4}
                    size="small"
                    type="number"
                    name="alternateMobileNumber"
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">+91 </InputAdornment>
                      ),
                    }}
                    onChange={onChangeAddress}
                  />
                  <RadioGroup
                    aria-labelledby="demo-controlled-radio-buttons-group"
                    name="controlled-radio-buttons-group"
                    row
                    // value={value}
                    // onChange={handleChange}
                    // value={address.locationType}
                    onChange={onChangeAddress}
                  >
                    <FormControlLabel
                      value="work"
                      control={<Radio />}
                      label="Work"
                      name="locationType"
                    />
                    <FormControlLabel
                      value="home"
                      control={<Radio />}
                      label="Home"
                      name="locationType"
                    />
                  </RadioGroup>
                </div>
                <Button
                  style={{
                    backgroundColor: "blue",
                    color: "white",
                    alignSelf: "flex-end",
                  }}
                  onClick={handleSaveAddress}
                >
                  Save Address
                </Button>
              </>
            ) : (
              <></>
            )}
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={step == 3}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            style={{
              backgroundColor: "whitesmoke",
              borderRadius: "5px",
            }}
          >
            {step == 3 ? (
              <IconButton onClick={backStep}>
                <ArrowBackIcon />
              </IconButton>
            ) : (
              <></>
            )}
            <Typography
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              Order Summery
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            style={{ display: "flex", gap: "10px", flexDirection: "column" }}
          >
            <div className={styles.productDetails}>
              {basket.map((e) => (
                <div key={e._id}>
                  <div className={styles.productCard}>
                    <div className={styles.imageContainer}>
                      <Image
                        alt="product image"
                        height={150}
                        width={150}
                        src={e.product.images[0]}
                      />
                      <Button
                        style={{
                          backgroundColor: "#000000",
                          color: "white",
                          width: "fit-content",
                          borderRadius: "30px",
                          margin: "auto",
                        }}
                        disabled
                        size="small"
                      >
                        {e.quantity}
                      </Button>
                    </div>
                    <div className={styles.productSummery}>
                      <div className={styles.productName}>{e.product.name}</div>

                      {e.product.attributes.map((attr) => (
                        <div className={styles.attributes} key={attr._id}>
                          {attr.name}:{attr.value}
                        </div>
                      ))}
                      <div>
                        <del>{e.product.price}</del>{" "}
                        {e.product.price * (1 - e.product.discount / 100)} ₹ /kg
                      </div>
                      <div className={styles.discount}>
                        {e.product.discount}% Off
                      </div>
                    </div>
                    {/* <div>Delivery Date & Price</div> */}
                  </div>
                  <Divider />
                </div>
              ))}
            </div>
            <Button className={styles.nextButton} onClick={confirmOrder}>
              Confirm Order
            </Button>
          </AccordionDetails>
        </Accordion>
        <Accordion expanded={step == 4}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
            style={{
              backgroundColor: "whitesmoke",
              borderRadius: "5px",
            }}
          >
            {step == 4 ? (
              <IconButton onClick={backStep}>
                <ArrowBackIcon />
              </IconButton>
            ) : (
              <></>
            )}
            <Typography
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              Payment Summery
            </Typography>
          </AccordionSummary>
          <AccordionDetails
            style={{ display: "flex", gap: "10px", flexDirection: "column" }}
          >
            <div className={styles.paymentDetails}>
              <b>Total Price:</b> {orderDetails.totalAmount}₹
            </div>

            <PayNowButton
              text={"Pay Now"}
              order={orderDetails}
              className={styles.nextButton}
            />
          </AccordionDetails>
        </Accordion>
      </div>
    </PageWrapper>
  );
};

export default CheckoutComponent;
