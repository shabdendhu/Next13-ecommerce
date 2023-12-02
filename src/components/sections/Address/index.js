"use client";
import React, { useState } from "react";
import styles from "./Address.module.scss";
import AccountCircleRoundedIcon from "@mui/icons-material/AccountCircleRounded";
import InventoryIcon from "@mui/icons-material/Inventory";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccountBalanceWalletIcon from "@mui/icons-material/AccountBalanceWallet";
import FolderSharedIcon from "@mui/icons-material/FolderShared";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import { useRouter } from "next/navigation";

const Address = () => {
  const top100Films = [
    { label: "The Shawshank Redemption", year: 1994 },
    { label: "The Godfather", year: 1972 },
    { label: "The Godfather: Part II", year: 1974 },
    { label: "The Dark Knight", year: 2008 },
    { label: "12 Angry Men", year: 1957 },
    { label: "Schindler's List", year: 1993 },
    { label: "Pulp Fiction", year: 1994 },
    {
      label: "The Lord of the Rings: The Return of the King",
      year: 2003,
    },
    { label: "The Good, the Bad and the Ugly", year: 1966 },
    { label: "Fight Club", year: 1999 },
    {
      label: "The Lord of the Rings: The Fellowship of the Ring",
      year: 2001,
    },
    {
      label: "Star Wars: Episode V - The Empire Strikes Back",
      year: 1980,
    },
    { label: "Forrest Gump", year: 1994 },
    { label: "Inception", year: 2010 },
    {
      label: "The Lord of the Rings: The Two Towers",
      year: 2002,
    },
    { label: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { label: "Goodfellas", year: 1990 },
    { label: "The Matrix", year: 1999 },
    { label: "Seven Samurai", year: 1954 },
    {
      label: "Star Wars: Episode IV - A New Hope",
      year: 1977,
    },
    { label: "City of God", year: 2002 },
    { label: "Se7en", year: 1995 },
    { label: "The Silence of the Lambs", year: 1991 },
    { label: "It's a Wonderful Life", year: 1946 },
    { label: "Life Is Beautiful", year: 1997 },
    { label: "The Usual Suspects", year: 1995 },
    { label: "Léon: The Professional", year: 1994 },
    { label: "Spirited Away", year: 2001 },
    { label: "Saving Private Ryan", year: 1998 },
    { label: "Once Upon a Time in the West", year: 1968 },
    { label: "American History X", year: 1998 },
    { label: "Interstellar", year: 2014 },
    { label: "Casablanca", year: 1942 },
    { label: "City Lights", year: 1931 },
    { label: "Psycho", year: 1960 },
    { label: "The Green Mile", year: 1999 },
    { label: "The Intouchables", year: 2011 },
    { label: "Modern Times", year: 1936 },
    { label: "Raiders of the Lost Ark", year: 1981 },
    { label: "Rear Window", year: 1954 },
    { label: "The Pianist", year: 2002 },
    { label: "The Departed", year: 2006 },
    { label: "Terminator 2: Judgment Day", year: 1991 },
    { label: "Back to the Future", year: 1985 },
    { label: "Whiplash", year: 2014 },
    { label: "Gladiator", year: 2000 },
    { label: "Memento", year: 2000 },
    { label: "The Prestige", year: 2006 },
    { label: "The Lion King", year: 1994 },
    { label: "Apocalypse Now", year: 1979 },
    { label: "Alien", year: 1979 },
    { label: "Sunset Boulevard", year: 1950 },
    {
      label:
        "Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb",
      year: 1964,
    },
    { label: "The Great Dictator", year: 1940 },
    { label: "Cinema Paradiso", year: 1988 },
    { label: "The Lives of Others", year: 2006 },
    { label: "Grave of the Fireflies", year: 1988 },
    { label: "Paths of Glory", year: 1957 },
    { label: "Django Unchained", year: 2012 },
    { label: "The Shining", year: 1980 },
    { label: "WALL·E", year: 2008 },
    { label: "American Beauty", year: 1999 },
    { label: "The Dark Knight Rises", year: 2012 },
    { label: "Princess Mononoke", year: 1997 },
    { label: "Aliens", year: 1986 },
    { label: "Oldboy", year: 2003 },
    { label: "Once Upon a Time in America", year: 1984 },
    { label: "Witness for the Prosecution", year: 1957 },
    { label: "Das Boot", year: 1981 },
    { label: "Citizen Kane", year: 1941 },
    { label: "North by Northwest", year: 1959 },
    { label: "Vertigo", year: 1958 },
    {
      label: "Star Wars: Episode VI - Return of the Jedi",
      year: 1983,
    },
    { label: "Reservoir Dogs", year: 1992 },
    { label: "Braveheart", year: 1995 },
    { label: "M", year: 1931 },
    { label: "Requiem for a Dream", year: 2000 },
    { label: "Amélie", year: 2001 },
    { label: "A Clockwork Orange", year: 1971 },
    { label: "Like Stars on Earth", year: 2007 },
    { label: "Taxi Driver", year: 1976 },
    { label: "Lawrence of Arabia", year: 1962 },
    { label: "Double Indemnity", year: 1944 },
    {
      label: "Eternal Sunshine of the Spotless Mind",
      year: 2004,
    },
    { label: "Amadeus", year: 1984 },
    { label: "To Kill a Mockingbird", year: 1962 },
    { label: "Toy Story 3", year: 2010 },
    { label: "Logan", year: 2017 },
    { label: "Full Metal Jacket", year: 1987 },
    { label: "Dangal", year: 2016 },
    { label: "The Sting", year: 1973 },
    { label: "2001: A Space Odyssey", year: 1968 },
    { label: "Singin' in the Rain", year: 1952 },
    { label: "Toy Story", year: 1995 },
    { label: "Bicycle Thieves", year: 1948 },
    { label: "The Kid", year: 1921 },
    { label: "Inglourious Basterds", year: 2009 },
    { label: "Snatch", year: 2000 },
    { label: "3 Idiots", year: 2009 },
    { label: "Monty Python and the Holy Grail", year: 1975 },
  ];
  const [name, setName] = React.useState("");
  const [showAddAddress, setShowAddAddress] = useState(false);
  const router = useRouter();
  const handleRedirect = () => {
    router.push("/profile");
  };
  const handleNavigate = () => {
    router.push("/address");
  };
  const handleOrder = () => {
    router.push("/basket");
  };
  const handlecard = () => {
    router.push("/savedcard");
  };
  const handleUPI = () => {
    router.push("/savedupi");
  };
  const handleRatingreviews = () => {
    router.push("./my-rating-reviews");
  };
  const handleWishlist = () => {
    router.push("./mywishlist");
  };
  return (
    <div className={styles.profilebgcontainer}>
      <div className={styles.profilecontainer}>
        <div className={styles.leftcontainer}>
          <div className={styles.heading}>
            <AccountCircleRoundedIcon className={styles.accountIcon} />
            <span className={styles.headingText}>
              <p>Hello</p>
              <b style={{ fontSize: "25px" }}>swoyamprava</b>
            </span>
          </div>
          <div className={styles.leftSubContainer}>
            <div className={styles.smallSubContainers}>
              <InventoryIcon className={styles.icons} />
              <div
                style={{
                  fontSize: "20px",
                  flex: 1,
                  // border: "1px solid red",
                  fontWeight: 600,
                  color: "#878787",
                  cursor: "pointer",
                }}
                onClick={handleOrder}
              >
                MY ORDERS
              </div>
            </div>

            <div className={styles.smallSubContainers}>
              <AccountCircleIcon className={styles.icons} />
              <div
                style={{
                  fontSize: "20px",
                  flex: 1,
                  // border: "1px solid red",
                  fontWeight: 600,
                  color: "#878787",
                }}
              >
                ACCOUNT
              </div>
            </div>

            <div>
              <p
                style={{ padding: "10px", cursor: "pointer" }}
                onClick={handleRedirect}
              >
                Profile Informations
              </p>
              <p
                style={{ padding: "10px", cursor: "pointer" }}
                onClick={handleNavigate}
              >
                Manage Address
              </p>
            </div>

            <div className={styles.smallSubContainers}>
              <AccountBalanceWalletIcon className={styles.icons} />
              <div
                style={{
                  fontSize: "20px",
                  flex: 1,
                  // border: "1px solid red",
                  fontWeight: 600,
                  color: "#878787",
                }}
              >
                PAYMENT METHOD
              </div>
            </div>

            <div>
              <p
                style={{ padding: "10px", cursor: "pointer" }}
                onClick={handlecard}
              >
                Saved card
              </p>
              <p
                style={{ padding: "10px", cursor: "pointer" }}
                onClick={handleUPI}
              >
                Saved UPI
              </p>
            </div>

            <div className={styles.smallSubContainers}>
              <FolderSharedIcon className={styles.icons} />
              <div
                style={{
                  fontSize: "20px",
                  flex: 1,
                  // border: "1px solid red",
                  fontWeight: 600,
                  color: "#878787",
                }}
              >
                MY STUFF
              </div>
            </div>

            <div
              style={{
                fontSize: "15px",
              }}
            >
              <p
                style={{ padding: "10px", cursor: "pointer" }}
                onClick={handleRatingreviews}
              >
                My Ratings & My Reviews
              </p>
              <p
                style={{ padding: "10px", cursor: "pointer" }}
                onClick={handleWishlist}
              >
                My Wishlist
              </p>
            </div>

            <div className={styles.smallSubContainers}>
              <LogoutRoundedIcon className={styles.icons} />
              <div
                style={{
                  fontSize: "20px",
                  flex: 1,
                  // border: "1px solid red",
                  fontWeight: 600,
                  color: "#878787",
                }}
              >
                LAGOUT
              </div>
            </div>
          </div>
        </div>

        <div className={styles.rightbgcontainer}>
          <div className={styles.rightcontainer}>
            {showAddAddress ? (
              <>
                <div style={{ marginBottom: "10px", padding: "10px 6px" }}>
                  <b style={{ color: "green", fontSize: "20px" }}>
                    ADD A NEW ADDRESS
                  </b>
                </div>
                <div>
                  <Button
                    style={{
                      backgroundColor: "blue",
                      color: "white",
                      width: "40%",
                      padding: "11px 0px",
                      marginLeft: "7px",
                    }}
                  >
                    <MyLocationIcon />
                    Use My Location
                  </Button>
                </div>
                <div>
                  <Box
                    component="form"
                    sx={{
                      "& > :not(style)": { m: 1, width: "25ch" },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField
                      id="outlined-controlled"
                      label="Name"
                      value={name}
                      onChange={(event) => {
                        setName(event.target.value);
                      }}
                    />
                    <TextField
                      id="outlined-controlled"
                      label="10-digit Mobile Number"
                      value={name}
                      onChange={(event) => {
                        setName(event.target.value);
                      }}
                    />
                  </Box>
                </div>
                <div>
                  <Box
                    component="form"
                    sx={{
                      "& > :not(style)": { m: 1, width: "25ch" },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField
                      id="outlined-controlled"
                      label="Pin Code"
                      value={name}
                      onChange={(event) => {
                        setName(event.target.value);
                      }}
                    />
                    <TextField
                      id="outlined-controlled"
                      label="Locality"
                      value={name}
                      onChange={(event) => {
                        setName(event.target.value);
                      }}
                    />
                  </Box>
                </div>
                <div>
                  <TextField
                    id="outlined-multiline-static"
                    label="Address (Area & Street)"
                    multiline
                    rows={3}
                    // defaultValue="Default Value"
                    style={{ width: "100%", padding: "0px 7px" }}
                  />
                </div>
                <div style={{ display: "flex" }}>
                  <TextField
                    id="outlined-controlled"
                    label="Area/Town/Distic"
                    value={name}
                    onChange={(event) => {
                      setName(event.target.value);
                    }}
                    style={{ marginRight: "10px" }}
                  />
                  <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={top100Films}
                    sx={{ width: 300 }}
                    renderInput={(params) => (
                      <TextField {...params} label="State" />
                    )}
                  />
                </div>
                <div>
                  <Box
                    component="form"
                    sx={{
                      "& > :not(style)": { m: 1, width: "25ch" },
                    }}
                    noValidate
                    autoComplete="off"
                  >
                    <TextField
                      id="outlined-controlled"
                      label="Landmark(optional)"
                      value={name}
                      onChange={(event) => {
                        setName(event.target.value);
                      }}
                    />
                    <TextField
                      id="outlined-controlled"
                      label="Alternative Phone(optional)"
                      value={name}
                      onChange={(event) => {
                        setName(event.target.value);
                      }}
                    />
                  </Box>
                </div>
                <div>
                  <FormControl>
                    <FormLabel id="demo-row-radio-buttons-group-label">
                      Address Type
                    </FormLabel>
                    <RadioGroup
                      row
                      aria-labelledby="demo-row-radio-buttons-group-label"
                      name="row-radio-buttons-group"
                    >
                      <FormControlLabel
                        value="female"
                        control={<Radio />}
                        label="Home"
                      />
                      <FormControlLabel
                        value="male"
                        control={<Radio />}
                        label="Work"
                      />
                    </RadioGroup>
                  </FormControl>
                </div>
                <div>
                  <Stack spacing={4} direction="row">
                    <Button
                      variant="contained"
                      style={{ backgroundColor: "blue", width: "25%" }}
                    >
                      Saved
                    </Button>
                    <Button variant="outlined">Canceled</Button>
                  </Stack>
                </div>
              </>
            ) : (
              <>
                <div>
                  <div className={styles.heading}>
                    <h1>MANAGE ADDRESS</h1>
                  </div>
                  <div className={styles.buttonContainer}>
                    <Button onClick={() => setShowAddAddress(true)}>
                      <span style={{ fontSize: "27px" }}>+</span>
                      add address
                    </Button>
                  </div>
                  <div className={styles.customerContainer}>
                    <p>Home</p>
                    <div className={styles.customerAddress}>
                      <h2>swoyamprava Tripathy</h2>
                      <h2>9090720389</h2>
                    </div>
                    <div>
                      <h3>nearsubernamukhitemple,bhadrak-756181</h3>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Address;
